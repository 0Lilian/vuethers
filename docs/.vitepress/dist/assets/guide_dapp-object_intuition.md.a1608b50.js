import{_ as e,o as t,c as a,d as o}from"./app.6a6ad51a.js";const f=JSON.parse(`{"title":"DApp object ~ Intuition","description":"","frontmatter":{"title":"DApp object ~ Intuition","layout":"doc"},"headers":[{"level":2,"title":"Problems","slug":"problems","link":"#problems","children":[{"level":3,"title":"1) A lot of instances","slug":"_1-a-lot-of-instances","link":"#_1-a-lot-of-instances","children":[]},{"level":3,"title":"2) Consistency","slug":"_2-consistency","link":"#_2-consistency","children":[]},{"level":3,"title":"3) Huge amount of datas","slug":"_3-huge-amount-of-datas","link":"#_3-huge-amount-of-datas","children":[]}]},{"level":2,"title":"Tulipe' approach","slug":"tulipe-approach","link":"#tulipe-approach","children":[]}],"relativePath":"guide/dapp-object/intuition.md"}`),n={name:"guide/dapp-object/intuition.md"},i=o('<h1 id="intuition" tabindex="-1">Intuition <a class="header-anchor" href="#intuition" aria-hidden="true">#</a></h1><p>When developing a DApp with tools like <a href="https://ethers.org/" target="_blank" rel="noreferrer">Ethers.js</a>, we are provided with many classes that abstract some blockchain concepts like : <code>Provider</code> (network), <code>Signer</code> (wallet), <code>Contract</code>, <code>Transaction</code>, etc.</p><h2 id="problems" tabindex="-1">Problems <a class="header-anchor" href="#problems" aria-hidden="true">#</a></h2><h3 id="_1-a-lot-of-instances" tabindex="-1">1) A lot of instances <a class="header-anchor" href="#_1-a-lot-of-instances" aria-hidden="true">#</a></h3><p>As seen above, to interact with chains, wallets, etc. we have to create many instances that represents them. Even for simple projects we can quickly end with a lot of unorganized instances.</p><p>Also, when those instances a required at multiple place in the code project, we have to perform a lot of <code>import</code> statement or additional line of codes to retrieve the instances we require.</p><h3 id="_2-consistency" tabindex="-1">2) Consistency <a class="header-anchor" href="#_2-consistency" aria-hidden="true">#</a></h3><p>A most serious problem is that in case instances are not clearly organized, our code is more errors-prone since developers can forget to manage some isolated instances, which may lead to inconsistent behaviors compared to other instances of the same type.</p><p>Also, those instances are hard to manage individually and a DApp code may quickly become complex in case this management is not clearly organized and centralized.</p><h3 id="_3-huge-amount-of-datas" tabindex="-1">3) Huge amount of datas <a class="header-anchor" href="#_3-huge-amount-of-datas" aria-hidden="true">#</a></h3><p>Also, all those instances requires a consequent amount of static datas to be created. Dealing with that number of heterogenous datas can quickly become hard.</p><p>In addition, all those datas have to be imported in the project&#39; code files, this again leads to multiple <code>import</code> statements that makes our DApp&#39;s code even more complex.</p><h2 id="tulipe-approach" tabindex="-1">Tulipe&#39; approach <a class="header-anchor" href="#tulipe-approach" aria-hidden="true">#</a></h2><p>In order to solves the 3 above problems, Tulipe provides the DApp object.</p><p>This object can be imported from anywhere in the project and contains properly organized instances and datas.</p><p>Also, most of the concepts that you&#39;ll see later in that documentation like <a href="/guide/ethers-proxies/intuition.html">Ethers proxies</a>, <a href="/guide/safers/intuition.html">Safers</a>, <a href="/guide/chain-watchers/intuition.html">Chain watcher</a>, etc. are available through the <code>dapp</code> object.</p><p>So now, only one <code>import</code> statement is required to access most of the things you need to build your DApp.</p>',17),s=[i];function r(c,l,d,h,p,u){return t(),a("div",null,s)}const _=e(n,[["render",r]]);export{f as __pageData,_ as default};