import { dapp } from "./stores/index.js"
import { ethers } from "ethers";
import { vuethersDefaultConfig } from "./vuethers.config-default.js"
import { markRaw } from "vue";
import { setupDevtoolsPlugin } from '@vue/devtools-api'

function capitalizeWords (sentence) {
  const words = sentence.split(" ")
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substring(1)
  }
  return words.join(" ");
}

function isObject (item) {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

function merge (target, ...sources) {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, {
          [key]: {}
        });
        merge(target[key], source[key]);
      } else {
        Object.assign(target, {
          [key]: source[key]
        });
      }
    }
  }

  return merge(target, ...sources);
}

async function initDAppStatus() {

  dapp.status.add("wallet", [
    "DISCONNECTED",
    "REQUESTED",
    "REFUSED",
    "ERROR",
    "CONNECTED"
  ]),

  dapp.status.add("network", [
    "OK",
    "WRONG",
    "ERROR",
  ]),

  // Set a timeout to the wallet status that falls to DISCONNECTED after a certain amount of time.
  dapp.status.wallet.watch(["REFUSED", "ERROR"], () => {
    setTimeout(() => {
      dapp.status.wallet.set("DISCONNECTED");
    }, 5000)
  })
}

async function initDAppProvider() {
  dapp.provider = markRaw(new ethers.providers.Web3Provider(window.ethereum, "any"));

  // Reload the app on network change. (SECURITY, see : https://docs.ethers.io/v5/concepts/best-practices/#best-practices--network-changes)
  dapp.provider.on("network", (newNetwork, oldNetwork) => {
    if (oldNetwork && oldNetwork !== newNetwork) {
      window.location.reload(); 
    } 
  });

  dapp.provider.on("error", () => {
    console.log("Provider error !")
    dapp.status.network.set("ERROR");
  })

  dapp.provider.on("block", async function (blockNumber) {
    console.log("new block");
    console.log(blockNumber);
    const block = await dapp.provider.getBlockWithTransactions(blockNumber);
    for (const transaction of block.transactions) {
      if (Object.keys(dapp._chainWatchers).includes(transaction.to)) {
        console.log("call update of = " + transaction.to);
        await dapp._chainWatchers[transaction.to].update();
      }
      // if (signer.getAddress === transaction.from) {
      //   signer.sync(blockNumber); // blockNumber is used to prevent syncing multiple times of the data has already been synced at this block. Maybe it could be managed internally by sync without having to  pass it manually
      // }
    }
    console.log(block);
  })
}

async function initDappSigner () {

  // Get current network and signer.
  dapp.signer = markRaw(dapp.provider.getSigner());
}

export async function initVuethers (app, vuethersCustomConfig) {

  console.log(app)
  // Makes the dapp stores available globally in the project.
  app.config.globalProperties.dapp = dapp;
  
  // Initialize DApp status.
  await initDAppStatus();

  // Initialize DApp's provider.
  await initDAppProvider();

  // Initialize DApp's signer.
  await initDappSigner();


  // Retrieve current networks informations from RPC.
  const currentNetwork = await dapp.provider.getNetwork()

  // Read vuethers.config.js if one is provided.
  if (vuethersCustomConfig) {

    // Merge default and custom config to override default configs by the custom ones
    const vuethersConfig = merge({...vuethersDefaultConfig}, {...vuethersCustomConfig})
    vuethersConfig.networks = []
    for (let network of vuethersCustomConfig.networks) {
      if (network.chainId) {
        const defaultNetwork = vuethersDefaultConfig.networks.find(o => o.chainId === network.chainId)
        network = merge({ ...defaultNetwork }, { ...network });

        // Fill the displayName with the name if not given
        if (!network.displayName) {
          network.displayName = network.name;
        }
        vuethersConfig.networks.push(network);
      }
    }

    // Set the dapp defaults values.
    dapp.defaults = vuethersConfig.defaults

    // Initalize networks.
    if (vuethersConfig.networks) {
      dapp.networks = {
        available: vuethersConfig.networks.filter(o => o.chainId !== currentNetwork.chainId),
        current: vuethersConfig.networks.find(o => o.chainId === currentNetwork.chainId),
        known: vuethersDefaultConfig.networks
      }

      // Initalize current network 
      if (dapp.networks.current && dapp.networks.current.contracts) {

        // Initialize all the contracts for the current network.
        for (const [name, contract] of Object.entries(dapp.networks.current.contracts)) {
          dapp.contracts.add(name, contract.address, contract.abi)
        }
      }
      else {
        const networkFromKnown = dapp.networks.known.find(o => o.chainId === currentNetwork.chainId);
        if (networkFromKnown) {
          dapp.networks.current = networkFromKnown;
        }
        else {
          dapp.networks.current = currentNetwork;
          dapp.networks.current.displayName = capitalizeWords(dapp.networks.current.name)
        }
        dapp.status.network.set("WRONG")
      }
    }
  }
  dapp.safe = true;
}

export * from "./components/index.js"
export * from "./stores/index.js"
export * from "./composables/index.js"
