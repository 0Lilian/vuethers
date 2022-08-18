var J = Object.defineProperty;
var X = (s, e, t) => e in s ? J(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t;
var W = (s, e, t) => (X(s, typeof e != "symbol" ? e + "" : e, t), t);
import { ref as C, watch as N, markRaw as $, openBlock as c, createElementBlock as u, unref as m, toDisplayString as f, createCommentVNode as R, Fragment as _, createElementVNode as l, renderList as g, withDirectives as D, vModelDynamic as z, vModelText as H, vModelSelect as ee, createTextVNode as q, pushScopeId as te, popScopeId as ne, computed as V, onUnmounted as se } from "vue";
import { ethers as S } from "ethers";
class ae {
  add(e, t) {
    if (Object.keys(n.status).includes(e))
      throw `You cannot add a new status called '${e}', this name is either reserved by Vuethers or already existing.`;
    n.status[e] = new oe(e, t);
  }
}
class oe {
  constructor(e, t) {
    if (this._name = e, this.states = [], !Array.isArray(t))
      throw `The 'states' parameter of a Status instance '${e}' must an array of strings. Got: ${t}`;
    for (const a of t)
      this.states.push(this._formatState(a));
    this._state = C(this.states[0]);
  }
  _formatState(e) {
    return e.toString().toUpperCase();
  }
  _isStateValid(e) {
    return !!this.states.includes(this._formatState(e));
  }
  _areStatesValid(e) {
    for (const t of e)
      if (!this._isStateValid(t))
        return !1;
    return !0;
  }
  get() {
    return this._state.value;
  }
  getRef() {
    return this.state;
  }
  set(e) {
    if (console.log(`status ${this._name} set to ${e}`), e = this._formatState(e), !this._isStateValid(e))
      throw `The state given to the set() method of Status instance '${this._name}' must a value in ${this.states}. Got: ${e}`;
    this._state.value = e;
  }
  is(e) {
    if (!this._isStateValid(e))
      throw `The state given to the is() method of Status instance '${this._name}' must a value in ${this.states}. Got: ${e}`;
    return this.get() == this._formatState(e);
  }
  isIn(e) {
    if (!this._areStatesValid(e))
      throw `The states given to the isIn() method of Status instance '${this._name}' must be an array with values in ${this.states}. Got: ${e}`;
    for (const t of e)
      if (this.is(t))
        return !0;
    return !1;
  }
  watch(e, t) {
    let a = `The states given to the watch() method of Status instance '${this._name}' must be a string or an array with values in ${this.states}. Got: ${e}`;
    if (Array.isArray(e)) {
      if (!this._areStatesValid(e))
        throw a;
      N(this._state, () => {
        e.includes(this._state) && t(this.get());
      });
    } else {
      if (!this._isStateValid(e))
        throw a;
      N(this._state, () => {
        e === this._state && t(this.get());
      });
    }
  }
  watchAny(e) {
    this.watch(this.states, e);
  }
}
class re extends Object {
  constructor(e, t) {
    return super(), super.constructor(), this._statelessSource = e, this._statefulSource = t, new Proxy(this, {
      get: function(a, o, d) {
        if (Object.keys(a._statefulSource.value).includes(o))
          return a._statefulSource.value[o];
        if (Object.keys(a._statelessSource).includes(o))
          return a._statelessSource[o];
      },
      set: function(a, o, d) {
        if (Object.keys(a._statefulSource.value).includes(o))
          return a._statefulSource.value[o] = d, !0;
        if (Object.keys(a._statelessSource).includes(o))
          return a._statelessSource[o] = d, !0;
        throw `MixedStore object doesn't have any property called '${o}'. New properties cannot be set / removed directly on a MixedStore object, please use add() and remove() methods of the store.`;
      }
    });
  }
  add(e, t, a) {
    if (e === "stateful")
      this._statefulSource.value[t] = a;
    else if (e === "stateless")
      this._statelessSource[t] = a;
    else
      throw `The the 'source' argument MixedStore.add() method must be 'stateful' or 'stateless'. Got: ${e}`;
  }
  remove(e, t) {
    if (e === "stateful")
      delete this._statefulSource.value[t];
    else if (e === "stateless")
      delete this._statelessSource[t];
    else
      throw `The the 'source' argument MixedStore.remove() method must be 'stateful' or 'stateless'. Got: ${e}`;
  }
}
class L extends S.Contract {
  constructor(t, a, o, d) {
    super(a, o, d);
    W(this, "watch", Ze.bind(null, this));
    W(this, "watchRef", Je.bind(null, this));
    return this.name = t, $(this);
  }
}
class le {
  constructor() {
    this._contracts = [];
  }
  add(e, t, a) {
    if (Object.keys(this).includes(e))
      throw `You cannot add a new contract called '${e}', this name is either reserved by Vuethers or already existing.`;
    if (O.value)
      this[e] = new L(e, t, a, n.signer);
    else if (E.value)
      this[e] = new L(e, t, a, n.provider);
    else
      throw "A contract is trying to be added from dapp.contract.add() but neither provider nor signer are available.";
    this._contracts.push(e);
  }
  remove(e) {
    Object.keys(this).includes(e) && (delete this[e], this._contracts = this._contracts.filter((t) => t !== e));
  }
  getAll() {
    const e = {};
    for (const t of this._contracts)
      e[t] = this[t];
    return e;
  }
}
const ie = {
  config: {},
  defaults: {},
  networks: {},
  status: new ae(),
  _chainWatchers: {}
}, ce = C({
  safe: !1,
  provider: null,
  signer: null,
  contracts: new le()
}), n = new re(ie, ce), j = {
  networks: [
    {
      name: "Ethereum Mainnet",
      displayName: "Ethereum",
      chainId: 1,
      type: "mainnet",
      icon: "https://storageapi.fleek.co/f3e0e6d9-57d8-48b7-b4ef-b7bbde26978c-bucket/vuethers/networks/ethereum.svg",
      currency: {
        name: "Ether",
        symbol: "ETH",
        decimals: 18
      },
      contracts: null,
      explorer: {
        name: "Etherscan",
        url: "https://etherscan.io/",
        standard: "EIP3091"
      },
      defaultRPC: "https://mainnet.infura.io/v3/"
    },
    {
      name: "Ropsten",
      displayName: "Ropsten (Ethereum Testnet)",
      chainId: 3,
      type: "testnet",
      icon: null,
      currency: {
        name: "Ropsten Ether",
        symbol: "ETH",
        decimals: 18
      },
      contracts: null,
      explorer: {
        name: "Etherscan",
        url: "https://ropsten.etherscan.io/",
        standard: "EIP3091"
      },
      defaultRPC: "https://ropsten.infura.io/v3/"
    },
    {
      name: "Rinkeby",
      displayName: "Rinkeby (Ethereum Testnet)",
      chainId: 4,
      type: "testnet",
      icon: null,
      currency: {
        name: "Rinkeby Ether",
        symbol: "ETH",
        decimals: 18
      },
      contracts: null,
      explorer: {
        name: "Etherscan",
        url: "https://rinkeby.etherscan.io/",
        standard: "EIP3091"
      },
      defaultRPC: "https://rinkeby.infura.io/v3/"
    },
    {
      name: "G\xF6rli",
      displayName: "G\xF6rli (Ethereum Testnet)",
      chainId: 5,
      type: "testnet",
      icon: null,
      currency: {
        name: "G\xF6rli Ether",
        symbol: "ETH",
        decimals: 18
      },
      contracts: null,
      explorer: {
        name: "Etherscan",
        url: "https://goerli.etherscan.io/",
        standard: "EIP3091"
      },
      defaultRPC: "https://goerli.infura.io/v3/"
    },
    {
      name: "Optimism",
      chainId: 10,
      type: "mainnet",
      icon: "https://storageapi.fleek.co/f3e0e6d9-57d8-48b7-b4ef-b7bbde26978c-bucket/vuethers/networks/optimism.svg",
      currency: {
        name: "Ether",
        symbol: "ETH",
        decimals: 18
      },
      contracts: null,
      explorer: {
        name: "Etherscan",
        url: "https://optimistic.etherscan.io/",
        standard: "EIP3091"
      },
      defaultRPC: "https://mainnet.optimism.io/"
    },
    {
      name: "Cronos Mainnet Beta",
      displayName: "Cronos",
      chainId: 25,
      type: "mainnet",
      icon: "https://storageapi.fleek.co/f3e0e6d9-57d8-48b7-b4ef-b7bbde26978c-bucket/vuethers/networks/cronos.svg",
      currency: {
        name: "Cronos",
        symbol: "CRO",
        decimals: 18
      },
      contracts: null,
      explorer: {
        name: "Cronos Explorer",
        url: "https://cronos.org/explorer",
        standard: "EIP3091"
      },
      defaultRPC: "https://evm.cronos.org"
    },
    {
      name: "Telos EVM Mainnet",
      displayName: "Telos",
      chainId: 40,
      type: "mainnet",
      icon: null,
      currency: {
        name: "Telos",
        symbol: "TLOS",
        decimals: 18
      },
      contracts: null,
      explorer: {
        name: "Teloscan",
        url: "https://teloscan.io/",
        standard: "EIP3091"
      },
      defaultRPC: "https://mainnet.telos.net/evm"
    },
    {
      name: "Binance Smart Chain Mainnet",
      displayName: "BSC",
      chainId: 56,
      type: "mainnet",
      icon: "https://storageapi.fleek.co/f3e0e6d9-57d8-48b7-b4ef-b7bbde26978c-bucket/vuethers/networks/bsc.svg",
      currency: {
        name: "Binance Chain Native Token",
        symbol: "BNB",
        decimals: 18
      },
      contracts: null,
      explorer: {
        name: "Bscscan",
        url: "https://bscscan.com/",
        standard: "EIP3091"
      },
      defaultRPC: "https://bsc-dataseed1.binance.org/"
    },
    {
      name: "Gnosis Chain",
      displayName: "Gnosis",
      chainId: 100,
      type: "mainnet",
      icon: "https://storageapi.fleek.co/f3e0e6d9-57d8-48b7-b4ef-b7bbde26978c-bucket/vuethers/networks/gnosis.svg",
      currency: {
        name: "xDAI",
        symbol: "xDAI",
        decimals: 18
      },
      contracts: null,
      explorer: {
        name: "Blockscout",
        url: "https://blockscout.com/xdai/mainnet/",
        standard: "EIP3091"
      },
      defaultRPC: "https://rpc.gnosischain.com"
    },
    {
      name: "Fuse Mainnet",
      displayName: "Fuse",
      chainId: 122,
      type: "mainnet",
      icon: "https://storageapi.fleek.co/f3e0e6d9-57d8-48b7-b4ef-b7bbde26978c-bucket/vuethers/networks/fuse.svg",
      currency: {
        name: "Fuse",
        symbol: "FUSE",
        decimals: 18
      },
      contracts: null,
      explorer: {
        name: "Fuse Explorer",
        url: "https://explorer.fuse.io/",
        standard: "EIP3091"
      },
      defaultRPC: "https://rpc.fuse.io"
    },
    {
      name: "Huobi ECO Chain Mainnet",
      displayName: "HECO",
      chainId: 128,
      type: "mainnet",
      icon: "https://storageapi.fleek.co/f3e0e6d9-57d8-48b7-b4ef-b7bbde26978c-bucket/vuethers/networks/heco.svg",
      currency: {
        name: "Huobi ECO Chain Native Token",
        symbol: "HT",
        decimals: 18
      },
      contracts: null,
      explorer: {
        name: "Hecoinfo",
        url: "https://hecoinfo.com",
        standard: "EIP3091"
      },
      defaultRPC: "https://http-mainnet.hecochain.com"
    },
    {
      name: "Polygon Mainnet",
      displayName: "Polygon",
      chainId: 137,
      type: "mainnet",
      icon: "https://storageapi.fleek.co/f3e0e6d9-57d8-48b7-b4ef-b7bbde26978c-bucket/vuethers/networks/polygon.svg",
      currency: {
        name: "MATIC",
        symbol: "MATIC",
        decimals: 18
      },
      contracts: null,
      explorer: {
        name: "Polygonscan",
        url: "https://polygonscan.com/",
        standard: "EIP3091"
      },
      defaultRPC: "https://polygon-rpc.com/"
    },
    {
      name: "Fantom Opera",
      displayName: "Fantom",
      chainId: 250,
      type: "mainnet",
      icon: "https://storageapi.fleek.co/f3e0e6d9-57d8-48b7-b4ef-b7bbde26978c-bucket/vuethers/networks/fantom.svg",
      currency: {
        name: "Fantom",
        symbol: "FTM",
        decimals: 18
      },
      contracts: null,
      explorer: {
        name: "Ftmscan",
        url: "https://ftmscan.com/",
        standard: "EIP3091"
      },
      defaultRPC: "https://rpc.ftm.tools"
    },
    {
      name: "Metis Andromeda Mainnet",
      displayName: "Metis",
      chainId: 1088,
      type: "mainnet",
      icon: "https://storageapi.fleek.co/f3e0e6d9-57d8-48b7-b4ef-b7bbde26978c-bucket/vuethers/networks/metis.svg",
      currency: {
        name: "Metis",
        symbol: "METIS",
        decimals: 18
      },
      contracts: null,
      explorer: {
        name: "Metis Explorer",
        url: "https://andromeda-explorer.metis.io",
        standard: "EIP3091"
      },
      defaultRPC: "https://andromeda.metis.io/?owner=1088"
    },
    {
      name: "Moonbeam",
      chainId: 1284,
      type: "mainnet",
      icon: "https://storageapi.fleek.co/f3e0e6d9-57d8-48b7-b4ef-b7bbde26978c-bucket/vuethers/networks/moonbeam.svg",
      currency: {
        name: "Glimmer",
        symbol: "GLMR",
        decimals: 18
      },
      contracts: null,
      explorer: {
        name: "Moonscan",
        url: "https://moonbeam.moonscan.io",
        standard: "EIP3091"
      },
      defaultRPC: "https://rpc.api.moonbeam.network"
    },
    {
      name: "Moonriver",
      chainId: 1285,
      type: "mainnet",
      icon: "https://storageapi.fleek.co/f3e0e6d9-57d8-48b7-b4ef-b7bbde26978c-bucket/vuethers/networks/moonriver.svg",
      currency: {
        name: "Moonriver",
        symbol: "MOVR",
        decimals: 18
      },
      contracts: null,
      explorer: {
        name: "Moonscan",
        url: "https://moonriver.moonscan.io/",
        standard: "EIP3091"
      },
      defaultRPC: "https://rpc.api.moonriver.moonbeam.network"
    },
    {
      name: "Klaytn Mainnet Cypress",
      displayName: "Klaytn",
      chainId: 8217,
      type: "mainnet",
      icon: "https://storageapi.fleek.co/f3e0e6d9-57d8-48b7-b4ef-b7bbde26978c-bucket/vuethers/networks/klaytn.svg",
      currency: {
        name: "KLAY",
        symbol: "KLAY",
        decimals: 18
      },
      contracts: null,
      explorer: {
        name: "Klaytnscope",
        url: "https://scope.klaytn.com",
        standard: "EIP3091"
      },
      defaultRPC: "https://public-node-api.klaytnapi.com/v1/cypress"
    },
    {
      name: "Hardhat",
      displayName: "Hardhat",
      chainId: 31337,
      type: "testnet",
      icon: null,
      currency: {
        name: "GoChain Coin",
        symbol: "GO",
        decimals: 18
      },
      contracts: null,
      explorer: null,
      defaultRPC: "http://127.0.0.1:8545/"
    },
    {
      name: "Arbitrum One",
      displayName: "Arbitrum",
      chainId: 42161,
      type: "mainnet",
      icon: "https://storageapi.fleek.co/f3e0e6d9-57d8-48b7-b4ef-b7bbde26978c-bucket/vuethers/networks/arbitrum.svg",
      currency: {
        name: "Ether",
        symbol: "ETH",
        decimals: 18
      },
      contracts: null,
      explorer: {
        name: "Arbiscan",
        url: "https://arbiscan.io/",
        standard: "EIP3091"
      },
      defaultRPC: "https://arbitrum-mainnet.infura.io/v3/"
    },
    {
      name: "Celo Mainnet",
      displayName: "Celo",
      chainId: 42220,
      type: "mainnet",
      icon: "https://storageapi.fleek.co/f3e0e6d9-57d8-48b7-b4ef-b7bbde26978c-bucket/vuethers/networks/celo.svg",
      currency: {
        name: "CELO",
        symbol: "CELO",
        decimals: 18
      },
      contracts: null,
      explorer: {
        name: "Celo Explorer",
        url: "https://explorer.celo.org/",
        standard: "EIP3091"
      },
      defaultRPC: "https://forno.celo.org"
    },
    {
      name: "Emerald Paratime Mainnet",
      displayName: "Emerald",
      chainId: 42262,
      type: "mainnet",
      icon: "https://storageapi.fleek.co/f3e0e6d9-57d8-48b7-b4ef-b7bbde26978c-bucket/vuethers/networks/emerald.svg",
      currency: {
        name: "Emerald Rose",
        symbol: "ROSE",
        decimals: 18
      },
      contracts: null,
      explorer: {
        name: "Emerald Explorer",
        url: "https://explorer.emerald.oasis.dev/",
        standard: "EIP3091"
      },
      defaultRPC: "https://emerald.oasis.dev"
    },
    {
      name: "Avalanche C-Chain",
      displayName: "Avalanche",
      chainId: 43114,
      type: "mainnet",
      icon: "https://storageapi.fleek.co/f3e0e6d9-57d8-48b7-b4ef-b7bbde26978c-bucket/vuethers/networks/avalanche.svg",
      currency: {
        name: "Avalanche",
        symbol: "AVAX",
        decimals: 18
      },
      contracts: null,
      explorer: {
        name: "Snowtrace",
        url: "https://snowtrace.io/",
        standard: "EIP3091"
      },
      defaultRPC: "https://api.avax.network/ext/bc/C/rpc"
    },
    {
      name: "Aurora Mainnet",
      displayName: "Aurora",
      chainId: 1313161554,
      type: "mainnet",
      icon: "https://storageapi.fleek.co/f3e0e6d9-57d8-48b7-b4ef-b7bbde26978c-bucket/vuethers/networks/aurora.svg",
      currency: {
        name: "Ether",
        symbol: "ETH",
        decimals: 18
      },
      contracts: null,
      explorer: {
        name: "Aurorascan",
        url: "https://aurorascan.dev",
        standard: "EIP3091"
      },
      defaultRPC: "https://mainnet.aurora.dev"
    },
    {
      name: "Harmony Mainnet Shard 0",
      displayName: "Harmony",
      chainId: 16666e5,
      type: "mainnet",
      icon: "https://storageapi.fleek.co/f3e0e6d9-57d8-48b7-b4ef-b7bbde26978c-bucket/vuethers/networks/harmony.svg",
      currency: {
        name: "ONE",
        symbol: "ONE",
        decimals: 18
      },
      contracts: null,
      explorer: {
        name: "Harmony Block Explorer",
        url: "https://explorer.harmony.one",
        standard: "EIP3091"
      },
      defaultRPC: "https://api.harmony.one"
    }
  ],
  defaults: {
    networks: {
      icon: "https://storageapi.fleek.co/f3e0e6d9-57d8-48b7-b4ef-b7bbde26978c-bucket/vuethers/networks/unknown.svg"
    }
  }
};
async function ue() {
  const s = await n.provider.getNetwork().then((e) => e.chainId);
  return n.config.networks.find((e) => e.chainId === s);
}
async function de(s = null) {
  if (s) {
    console.log("AAA");
    const e = M({ ...j }, { ...s });
    e.networks = [];
    for (let t of s.networks)
      if (t.chainId) {
        const a = j.networks.find((o) => o.chainId === t.chainId);
        t = M({ ...a }, { ...t }), t.displayName || (t.displayName = t.name), e.networks.push(t);
      }
    e.networks.getCurrent = ue, n.config = e;
  }
}
async function he() {
  n.status.add("network", [
    "DISCONNECTED",
    "WRONG",
    "UNKNOWN",
    "ERROR",
    "CONNECTED"
  ]), n.status.add("wallet", [
    "DISCONNECTED",
    "REQUESTED",
    "REFUSED",
    "ERROR",
    "NOPROVIDER",
    "CONNECTED"
  ]), n.status.add("contracts", [
    "WAITING",
    "ERROR",
    "NOPROVIDER",
    "INITIALIZED"
  ]), n.status.wallet.watch(["REFUSED", "ERROR", "NOPROVIDER"], () => {
    setTimeout(() => {
      n.status.wallet.set("DISCONNECTED");
    }, 5e3);
  });
}
async function pe() {
  const s = $(new S.providers.Web3Provider(window.ethereum, "any"));
  if (s) {
    const e = await s.getNetwork().then((a) => a.chainId);
    let t = n.config.networks.find((a) => a.chainId === e);
    t ? (n.provider = s, n.status.network.set("CONNECTED")) : (t = j.networks.find((a) => a.chainId === e), t ? (n.provider = $(new S.providers.JsonRpcProvider(knownNetwork.defaultRPC)), n.status.network.set("WRONG")) : (n.provider = s, n.status.network.set("UNKNOWN"))), s.on("network", (a, o) => {
      o && o !== a && window.location.reload();
    }), s.on("error", () => {
      console.log("Provider error !"), n.status.network.set("ERROR");
    }), t && (n.provider.pollingInterval = t.pollingInterval);
  } else {
    const e = n.config.networks.find((t) => t.default === !0);
    network ? n.provider = $(new S.providers.JsonRpcProvider(e.defaultRPC)) : n.status.network.set("DISCONNECTED");
  }
}
async function me() {
  n.status.network.is("DISCONNECTED") || await B(!0);
}
async function fe() {
  G(async function() {
    const s = await n.config.networks.getCurrent();
    if (s) {
      for (const [e, t] of Object.entries(s.contracts))
        n.contracts.add(e, t.address, t.abi);
      N([O, E], (e, t) => {
        if (console.log("Refresh contracts !"), e !== t)
          for (const a of n.contracts._contracts) {
            const o = n.contracts[a].name, d = n.contracts[a].address, b = n.contracts[a].abi;
            n.contracts.remove(a);
            try {
              n.contracts.add(o, d, b);
            } catch {
              n.status.contracts.set("NOPROVIDER");
              break;
            }
          }
      }), n.status.contracts.set("INITIALIZED");
    } else
      n.status.contracts.set("NOPROVIDER");
  });
}
async function be() {
  n.status.network.is("DISCONNECTED") || n.provider.on("block", async function(s) {
    const e = await n.provider.getBlockWithTransactions(s);
    for (const t of e.transactions)
      Object.keys(n._chainWatchers).includes(t.to) && await n._chainWatchers[t.to].update(), n.status.wallet.is("CONNECTED") && (await n.signer.getAddress(), t.from);
  });
}
const ye = { class: "ConnectWalletButton" }, ve = {
  key: 1,
  disabled: ""
}, we = {
  key: 2,
  disabled: ""
}, ke = {
  key: 3,
  disabled: ""
}, _e = {
  key: 4,
  disabled: ""
}, tt = {
  __name: "ConnectWalletButton",
  setup(s) {
    return (e, t) => (c(), u("div", ye, [
      m(n).status.wallet.is("DISCONNECTED") ? (c(), u("button", {
        key: 0,
        onClick: t[0] || (t[0] = (...a) => m(B) && m(B)(...a))
      }, "Connect Wallet")) : m(n).status.wallet.is("REQUESTED") ? (c(), u("button", ve, "Connection requested...")) : m(n).status.wallet.is("REFUSED") ? (c(), u("button", we, "Connection refused!")) : m(n).status.wallet.is("ERROR") ? (c(), u("button", ke, "Connection error!")) : m(n).status.network.is("WRONG") ? (c(), u("button", _e, "Wrong network! (" + f(m(n).networks.current.displayName) + ")", 1)) : m(n).status.wallet.is("CONNECTED") ? (c(), u("button", {
        key: 5,
        onClick: t[1] || (t[1] = (...a) => m(K) && m(K)(...a))
      }, "Disconnect")) : R("", !0)
    ]));
  }
}, Ee = /* @__PURE__ */ q("Functions : "), ge = ["onClick"], Ce = /* @__PURE__ */ l("br", null, null, -1), Ne = { key: 0 }, Ie = /* @__PURE__ */ l("small", null, "Inputs :", -1), Re = ["onUpdate:modelValue", "type", "placeholder"], Se = { key: 0 }, Oe = ["onUpdate:modelValue"], xe = ["onUpdate:modelValue"], Pe = ["value"], Te = { key: 1 }, De = /* @__PURE__ */ l("small", null, "Outputs :", -1), $e = ["onUpdate:modelValue", "placeholder"], Ae = { key: 2 }, Me = /* @__PURE__ */ q(" Events : "), Ve = /* @__PURE__ */ l("p", null, "Logs:", -1), nt = {
  __name: "ContractInteractor",
  props: {
    contractName: {
      type: String,
      required: !0
    }
  },
  setup(s) {
    const e = s;
    async function t(r, i, h = {}) {
      let k, p, y = null;
      return i ? Array.isArray(i) ? y = r(...i, h) : y = r(i, h) : y = r(h), await y.then((I) => k = I).catch((I) => p = I), { data: k, error: p };
    }
    async function a(r) {
      const i = [];
      for (const y of v.value[r].inputs)
        i.push(y.value);
      const h = {};
      v.value[r].payable && v.value[r].tx.value.value !== "" && (console.log(v.value[r].tx.value.value), h.value = S.utils.parseUnits(v.value[r].tx.value.value, v.value[r].tx.value.unit));
      const { data: k, error: p } = await t(w.value.functions[r], i, h);
      if (p)
        v.value[r].error = p.reason;
      else
        for (let y = 0; y < k.length; y++)
          v.value[r].outputs[y].value = k[y];
    }
    async function o(r) {
      P.value[r.event].count += 1;
      let i = `Block ${r.blockNumber} -> {`;
      for (const h of P.value[r.event].inputs)
        i += `${h.name}:${r.args[h.name]}, `;
      i = i.substring(0, i.length - 2) + "}", P.value[r.event].logs.push(i);
    }
    function d(r) {
      return r.includes("int") ? "number" : "text";
    }
    function b(r) {
      return `${r.name && r.name !== "null" ? r.name : "unnamed"} (${r.type})`;
    }
    function x(r) {
      const i = [];
      return i.push(r.mutability), r.payable && i.push("payable"), i.join(", ");
    }
    const w = C({});
    let F = C("");
    const Z = ["wei", "gwei", "ether"], P = C({}), v = C({});
    return Ye(async function() {
      w.value = n.contracts[e.contractName], N(O, () => {
        console.log("REFRESHED CONTRACT IN INTERCATOR"), console.log(w.value), w.value = n.contracts[e.contractName], console.log(w.value);
      }), F.value = await w.value.owner();
      for (const r of Object.values(w.value.interface.functions)) {
        v.value[r.name] = {
          inputs: [],
          outputs: [],
          error: null,
          payable: r.payable,
          mutability: r.stateMutability === "view" || r.stateMutability === "pure" ? "read" : "write",
          tx: {
            value: {
              value: "",
              unit: "wei"
            }
          }
        };
        for (let i = 0; i < r.inputs.length; i++)
          v.value[r.name].inputs[i] = {
            name: r.inputs[i].name,
            type: r.inputs[i].type,
            value: ""
          };
        for (let i = 0; i < r.outputs.length; i++)
          v.value[r.name].outputs[i] = {
            name: r.outputs[i].name,
            type: r.outputs[i].type,
            value: ""
          };
      }
      for (const r of Object.values(w.value.interface.events))
        P.value[r.name] = {
          count: 0,
          logs: [],
          inputs: r.inputs
        }, w.value.on(r, o);
    }), (r, i) => (c(), u(_, null, [
      l("p", null, "Interact with '" + f(s.contractName) + "' contract :", 1),
      l("ul", null, [
        l("li", null, "Address : " + f(w.value.address), 1),
        l("li", null, "Owner : " + f(F.value), 1),
        l("li", null, [
          Ee,
          l("ul", null, [
            (c(!0), u(_, null, g(v.value, (h, k) => (c(), u("li", null, [
              l("button", {
                onClick: (p) => a(k)
              }, f(k), 9, ge),
              l("small", null, "(" + f(x(h)) + ")", 1),
              Ce,
              Object.keys(h.inputs).length > 0 || h.payable ? (c(), u("div", Ne, [
                Ie,
                l("ul", null, [
                  (c(!0), u(_, null, g(h.inputs, (p, y) => (c(), u("li", null, [
                    D(l("input", {
                      "onUpdate:modelValue": (I) => p.value = I,
                      type: d(p.type),
                      placeholder: b(p)
                    }, null, 8, Re), [
                      [z, p.value]
                    ])
                  ]))), 256)),
                  h.payable ? (c(), u("li", Se, [
                    D(l("input", {
                      "onUpdate:modelValue": (p) => h.tx.value.value = p,
                      type: "text",
                      placeholder: "TX value"
                    }, null, 8, Oe), [
                      [H, h.tx.value.value]
                    ]),
                    D(l("select", {
                      "onUpdate:modelValue": (p) => h.tx.value.unit = p
                    }, [
                      (c(), u(_, null, g(Z, (p) => l("option", { value: p }, f(p), 9, Pe)), 64))
                    ], 8, xe), [
                      [ee, h.tx.value.unit]
                    ])
                  ])) : R("", !0)
                ])
              ])) : R("", !0),
              Object.keys(h.outputs).length > 0 ? (c(), u("div", Te, [
                De,
                l("ul", null, [
                  (c(!0), u(_, null, g(h.outputs, (p, y) => (c(), u("li", null, [
                    D(l("input", {
                      "onUpdate:modelValue": (I) => p.value = I,
                      type: "text",
                      placeholder: b(p),
                      disabled: ""
                    }, null, 8, $e), [
                      [H, p.value]
                    ])
                  ]))), 256))
                ])
              ])) : R("", !0),
              h.error ? (c(), u("p", Ae, f(h.error), 1)) : R("", !0)
            ]))), 256))
          ])
        ]),
        l("li", null, [
          Me,
          l("ul", null, [
            (c(!0), u(_, null, g(P.value, (h, k) => (c(), u("li", null, [
              l("h3", null, f(k), 1),
              l("p", null, "Count : " + f(h.count), 1),
              Ve,
              l("ul", null, [
                (c(!0), u(_, null, g(h.logs, (p) => (c(), u("li", null, f(p), 1))), 256))
              ])
            ]))), 256))
          ])
        ])
      ])
    ], 64));
  }
}, We = { class: "SelectNetworkDropdown" }, Ue = {
  key: 0,
  selected: ""
}, je = ["src", "alt"], Be = ["onClick"], Ge = ["src", "alt"], st = {
  __name: "SelectNetworkDropdown",
  setup(s) {
    async function e(o) {
      const d = n.networks.available.find((b) => b.chainId === parseInt(o));
      if (d) {
        o = S.utils.hexlify(parseInt(o)).toString(), o = S.utils.hexValue(o);
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{
              chainId: o
            }]
          });
        } catch (x) {
          x.code === 4902 && await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [{
              chainId: o,
              rpcUrls: [d.defaultRPC],
              chainName: d.name,
              nativeCurrency: {
                name: d.currency.symbol,
                symbol: d.currency.symbol,
                decimals: d.currency.decimals
              },
              blockExplorerUrls: d.explorer && d.explorer.url !== "" ? [d.explorer.url] : null
            }]
          });
        }
        const b = await n.provider.getNetwork();
        n.networks.current.chainId !== b.chainId && window.location.reload();
      }
    }
    function t() {
      a.value = !a.value;
    }
    let a = C(!1);
    return (o, d) => (c(), u("div", We, [
      l("ul", { onClick: t }, [
        m(n).networks.current ? (c(), u("li", Ue, [
          l("img", {
            width: "40",
            src: m(n).networks.current.icon ? m(n).networks.current.icon : m(n).defaults.networks.icon,
            alt: m(n).networks.current.name + " logo"
          }, null, 8, je),
          l("p", null, f(m(n).networks.current.displayName), 1)
        ])) : R("", !0),
        a.value ? (c(!0), u(_, { key: 1 }, g(m(n).networks.available, (b) => (c(), u("li", {
          key: b.chainId,
          onClick: (x) => e(b.chainId)
        }, [
          l("img", {
            width: "40",
            src: b.icon ? b.icon : m(n).defaults.networks.icon,
            alt: b.name + " logo"
          }, null, 8, Ge),
          l("p", null, f(b.displayName), 1)
        ], 8, Be))), 128)) : R("", !0)
      ])
    ]));
  }
};
const Fe = (s, e) => {
  const t = s.__vccOpts || s;
  for (const [a, o] of e)
    t[a] = o;
  return t;
}, Y = (s) => (te("data-v-b827462b"), s = s(), ne(), s), He = /* @__PURE__ */ Y(() => /* @__PURE__ */ l("h3", null, "Safe Runners", -1)), Le = /* @__PURE__ */ Y(() => /* @__PURE__ */ l("h3", null, "Status", -1)), Ke = {
  __name: "DebugBar",
  setup(s) {
    return (e, t) => (c(), u("section", null, [
      l("div", null, [
        He,
        l("ul", null, [
          l("li", null, "DApp safe : " + f(m(T)), 1),
          l("li", null, "Network safe : " + f(m(E)), 1),
          l("li", null, "Wallet safe : " + f(m(O)), 1),
          l("li", null, "Contracts safe : " + f(m(A)), 1)
        ])
      ]),
      l("div", null, [
        Le,
        l("ul", null, [
          (c(!0), u(_, null, g(m(n).status, (a, o) => (c(), u("li", null, f(o) + " : " + f(a.get()), 1))), 256))
        ])
      ])
    ]));
  }
}, at = /* @__PURE__ */ Fe(Ke, [["__scopeId", "data-v-b827462b"]]), T = V(() => n.safe);
function qe(s) {
  if (T.value)
    s();
  else {
    const e = N(T, () => {
      T.value && (s(), e());
    });
  }
}
const E = V(() => T.value && !n.status.network.is("DISCONNECTED"));
function G(s) {
  qe(() => {
    if (E.value)
      s();
    else {
      const e = N(E, () => {
        E.value && (s(), e());
      });
    }
  });
}
const O = V(() => E.value && n.status.wallet.is("CONNECTED"));
function ot(s) {
  G(() => {
    if (O.value)
      s();
    else {
      const e = N(O, () => {
        O.value && (s(), e());
      });
    }
  });
}
const A = V(() => E.value && n.status.contracts.is("INITIALIZED"));
function Ye(s) {
  G(() => {
    if (A.value)
      s();
    else {
      const e = N(A, () => {
        A.value && (s(), e());
      });
    }
  });
}
class Qe {
  constructor(e) {
    this.contract = e, this.sources = {}, this.lastUpdateBlock = 0;
  }
  _buildSourceName(e, t) {
    return `${e}:${t.toString}`;
  }
  async update() {
    const e = await n.provider.getBlockNumber();
    if (this.lastUpdateBlock < e) {
      for (const [t, a] of Object.entries(this.sources)) {
        const o = a.state.value;
        a.state.value = await this.contract[a.name](...a.args);
        for (const d of a.callbacks)
          d(a.state.value, o);
      }
      this.lastUpdateBlock = e;
    }
  }
  add(e, t, a = null) {
    const o = this._buildSourceName(e, t);
    return Object.keys(this.sources).includes(o) || (this.sources[o] = {
      name: e,
      args: t,
      state: C(null),
      callbacks: []
    }, this.contract[e](...t).then((d) => {
      this.sources[o].state.value = d;
    })), a && (this.sources[o].callbacks.includes(a) || this.sources[o].callbacks.push(a)), this.sources[o].state;
  }
  remove(e, t, a) {
    const o = this._buildSourceName(e, t);
    Object.keys(this.sources).includes(o) || (this.sources[o].callbacks = this.sources[o].callbacks.filter((d) => d !== a));
  }
  getRef(e, t) {
    const a = this._buildSourceName(e, t);
    return this.sources[a].state;
  }
}
function Q(s, e, t, a = null) {
  Object.keys(n._chainWatchers).includes(s.address) || (n._chainWatchers[s.address] = new Qe(s)), n._chainWatchers[s.address].add(e, t, a);
}
function Ze(s, e, t, a) {
  return Q(s, e, t, a), se(() => n._chainWatchers[s.address].remove(e, t, a)), n._chainWatchers[s.address].remove.bind(n._chainWatchers[s.address], e, t, a);
}
function Je(s, e, t) {
  return Q(s, e, t, null), n._chainWatchers[s.address].getRef(e, t);
}
async function B(s = !1) {
  if (E) {
    if (n.status.wallet.is("DISCONNECTED"))
      try {
        const e = await n.provider.getSigner();
        await e.getAddress(), n.signer = e, n.status.wallet.set("CONNECTED");
      } catch {
        if (console.log("ERROOOOOOR"), s === !0)
          n.status.wallet.set("DISCONNECTED");
        else
          try {
            n.status.wallet.set("REQUESTED"), await n.provider.send("eth_requestAccounts", []);
            const t = await n.provider.getSigner();
            await t.getAddress(), n.signer = t, n.status.wallet.set("CONNECTED");
          } catch (t) {
            console.log(t), t.code === 4001 ? n.status.wallet.set("REFUSED") : n.status.wallet.set("ERROR");
          }
      }
  } else
    n.status.wallet.set("NOPROVIDER");
}
function K() {
  console.log(n.provider), n.signer = null, n.status.wallet.set("DISCONNECTED");
}
function U(s) {
  return s && typeof s == "object" && !Array.isArray(s);
}
function M(s, ...e) {
  if (!e.length)
    return s;
  const t = e.shift();
  if (U(s) && U(t))
    for (const a in t)
      U(t[a]) ? (s[a] || Object.assign(s, {
        [a]: {}
      }), M(s[a], t[a])) : Object.assign(s, {
        [a]: t[a]
      });
  return M(s, ...e);
}
function rt(s) {
  const e = s.split(" ");
  for (let t = 0; t < e.length; t++)
    e[t] = e[t][0].toUpperCase() + e[t].substring(1);
  return e.join(" ");
}
async function lt(s, e) {
  s.config.globalProperties.dapp = n, await de(e), await he(), await pe(), await me(), await fe(), await be(), n.safe = !0;
}
export {
  tt as ConnectWalletButton,
  L as Contract,
  nt as ContractInteractor,
  le as ContractsList,
  at as DebugBar,
  re as MixedStore,
  st as SelectNetworkDropdown,
  oe as Status,
  ae as StatusList,
  A as areContractsSafe,
  rt as capitalizeWords,
  B as connectWallet,
  n as dapp,
  M as deepMerge,
  K as disconnectWallet,
  lt as initVuethers,
  T as isDAppSafe,
  E as isNetworkSafe,
  U as isObject,
  O as isWalletSafe,
  Ye as onContractsSafe,
  qe as onDAppSafe,
  G as onNetworkSafe,
  ot as onWalletSafe,
  Ze as watchChain,
  Je as watchChainRef
};
