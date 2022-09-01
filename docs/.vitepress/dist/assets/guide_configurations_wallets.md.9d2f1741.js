import{_ as s,o as n,c as a,d as l}from"./app.106af06f.js";const y=JSON.parse('{"title":"Configurations ~ Wallets","description":"","frontmatter":{"title":"Configurations ~ Wallets","layout":"doc"},"headers":[{"level":2,"title":"Configure a wallet","slug":"configure-a-wallet","link":"#configure-a-wallet","children":[]},{"level":2,"title":"Pre-filled wallets","slug":"pre-filled-wallets","link":"#pre-filled-wallets","children":[]}],"relativePath":"guide/configurations/wallets.md"}'),e={name:"guide/configurations/wallets.md"},p=l(`<h1 id="wallets-config" tabindex="-1">Wallets config <a class="header-anchor" href="#wallets-config" aria-hidden="true">#</a></h1><p>The wallets supported by your DApp can be configured into the <code>wallets</code> key of the <a href="/guide/configurations/intuition.html"><code>tulipe.config.js</code> file</a>. The <code>wallets</code> key must be filled with an array of objects where each object represents a supported wallet. It looks like that :</p><div class="language-js line-numbers-mode"><button class="copy"></button><span class="lang">js</span><pre><code><span class="line"><span style="color:#FF7B72;">export</span><span style="color:#C9D1D9;"> </span><span style="color:#FF7B72;">const</span><span style="color:#C9D1D9;"> </span><span style="color:#79C0FF;">tulipeConfig</span><span style="color:#C9D1D9;"> </span><span style="color:#FF7B72;">=</span><span style="color:#C9D1D9;"> {</span></span>
<span class="line"><span style="color:#C9D1D9;">  wallets: [</span></span>
<span class="line"><span style="color:#C9D1D9;">    {</span></span>
<span class="line"><span style="color:#C9D1D9;">      </span><span style="color:#8B949E;">// Wallet A configs...</span></span>
<span class="line"><span style="color:#C9D1D9;">    },</span></span>
<span class="line"><span style="color:#C9D1D9;">    {</span></span>
<span class="line"><span style="color:#C9D1D9;">      </span><span style="color:#8B949E;">// Wallet B configs...</span></span>
<span class="line"><span style="color:#C9D1D9;">    },</span></span>
<span class="line"><span style="color:#C9D1D9;">    </span><span style="color:#8B949E;">// ...</span></span>
<span class="line"><span style="color:#C9D1D9;">  ]</span></span>
<span class="line"><span style="color:#C9D1D9;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h2 id="configure-a-wallet" tabindex="-1">Configure a wallet <a class="header-anchor" href="#configure-a-wallet" aria-hidden="true">#</a></h2><p>If the wallet you want your DApp supports is contained in the <a href="/guide/configurations/wallets.html#pre-filled-wallets">pre-filled wallets</a> list (see below), the only requirement to make it available is to fill its <code>walletId</code> to explicitely tells to Tulipe that you want to support it :</p><div class="language-js line-numbers-mode"><button class="copy"></button><span class="lang">js</span><pre><code><span class="line"><span style="color:#FF7B72;">export</span><span style="color:#C9D1D9;"> </span><span style="color:#FF7B72;">const</span><span style="color:#C9D1D9;"> </span><span style="color:#79C0FF;">tulipeConfig</span><span style="color:#C9D1D9;"> </span><span style="color:#FF7B72;">=</span><span style="color:#C9D1D9;"> {</span></span>
<span class="line"><span style="color:#C9D1D9;">  wallets: [</span></span>
<span class="line"><span style="color:#C9D1D9;">    </span><span style="color:#8B949E;">// Supports Ethereum Mainnet</span></span>
<span class="line"><span style="color:#C9D1D9;">    {</span></span>
<span class="line"><span style="color:#C9D1D9;">      walletId: </span><span style="color:#A5D6FF;">&quot;metamask&quot;</span><span style="color:#C9D1D9;">,</span></span>
<span class="line"><span style="color:#C9D1D9;">    },</span></span>
<span class="line"><span style="color:#C9D1D9;">  ]</span></span>
<span class="line"><span style="color:#C9D1D9;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>As Metamask in the list of pre-filled wallets we only have to indicates its ID (<code>metamask</code>).</p><p>However if you want to customize a pre-filled wallet here is the detailed list of available wallet&#39;s properties :</p><ul><li><strong><code>walletId</code></strong> : the ID of that represents the wallet. <ul><li>type: <code>String</code></li><li>required: <strong>true</strong></li><li>role: it indicates to Tulipe the wallet represented in that object <br><br></li></ul></li><li><strong><code>displayName</code></strong> : the display name of the wallet. <ul><li>type: <code>String</code></li><li>required: <strong>false</strong> (defaults to <code>name</code>&#39;s value)</li><li>indication : should not end with <code>wallet</code> as it will be automatically appended when rendered, eg. should be <code>Metamask</code> and not <code>Metamask wallet</code></li><li>role: used in Tulipe&#39; components to represents the wallet. <br><br></li></ul></li><li><strong><code>icon</code></strong> : the URL of the wallet&#39;s icon / logo <ul><li>type: <code>String</code></li><li>required: <strong>false</strong> (defaults to <code>TODO</code>) <br><br></li></ul></li></ul><p>Here is an example of wallets configuration :</p><div class="language-js line-numbers-mode"><button class="copy"></button><span class="lang">js</span><pre><code><span class="line"><span style="color:#C9D1D9;">wallets </span><span style="color:#FF7B72;">=</span><span style="color:#C9D1D9;"> [</span></span>
<span class="line"><span style="color:#C9D1D9;">  </span><span style="color:#8B949E;">// Support Metamask</span></span>
<span class="line"><span style="color:#C9D1D9;">  {</span></span>
<span class="line"><span style="color:#C9D1D9;">    walletId: </span><span style="color:#A5D6FF;">&quot;metamask&quot;</span><span style="color:#C9D1D9;">,</span></span>
<span class="line"><span style="color:#C9D1D9;">  },</span></span>
<span class="line"><span style="color:#C9D1D9;">  </span><span style="color:#8B949E;">// Support Binance Chain wallet</span></span>
<span class="line"><span style="color:#C9D1D9;">  {</span></span>
<span class="line"><span style="color:#C9D1D9;">    walletId: </span><span style="color:#A5D6FF;">&quot;binanceChain&quot;</span><span style="color:#C9D1D9;">,</span></span>
<span class="line"><span style="color:#C9D1D9;">    </span><span style="color:#8B949E;">// ---- override default displayName</span></span>
<span class="line"><span style="color:#C9D1D9;">    displayName: </span><span style="color:#A5D6FF;">&quot;BSC&quot;</span></span>
<span class="line"><span style="color:#C9D1D9;">  },</span></span>
<span class="line"><span style="color:#C9D1D9;">  </span><span style="color:#8B949E;">// Support Coinbase wallet</span></span>
<span class="line"><span style="color:#C9D1D9;">  {</span></span>
<span class="line"><span style="color:#C9D1D9;">    walletId: </span><span style="color:#A5D6FF;">&quot;coinbase&quot;</span><span style="color:#C9D1D9;">,</span></span>
<span class="line"><span style="color:#C9D1D9;">    </span><span style="color:#8B949E;">// ---- override default icon URL</span></span>
<span class="line"><span style="color:#C9D1D9;">    icon: </span><span style="color:#A5D6FF;">&quot;https://mydomain.com/my-custom-icon.svg&quot;</span><span style="color:#C9D1D9;">,</span></span>
<span class="line"><span style="color:#C9D1D9;">  }</span></span>
<span class="line"><span style="color:#C9D1D9;">]</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><h2 id="pre-filled-wallets" tabindex="-1">Pre-filled wallets <a class="header-anchor" href="#pre-filled-wallets" aria-hidden="true">#</a></h2><p>Tulipe comes with 5+ pre-filled wallets configurations.</p><p>That means that in order to use in your DApp the networks in the below list, you only need to fill their <code>walletId</code>.</p><p>Here is the list of the currently pre-filled networks.</p><table><thead><tr><th>wallet ID</th><th>display name</th></tr></thead><tbody><tr><td>metamask</td><td>Metamask</td></tr><tr><td>binanceChain</td><td>Binance Chain</td></tr><tr><td>coinbase</td><td>Coinbase</td></tr></tbody></table><p>You can find the detailed wallets&#39; defaults configurations <a href="https://github.com/LilaRest/tulipe/blob/main/src/composables/config/tulipe.config-default.js" target="_blank" rel="noreferrer">here</a>.</p>`,17),t=[p];function o(r,i,c,d,u,b){return n(),a("div",null,t)}const m=s(e,[["render",o]]);export{y as __pageData,m as default};
