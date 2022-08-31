import{_ as e,o as t,c as a,d as o}from"./app.ab7c4970.js";const m=JSON.parse(`{"title":"Safers ~ Intuition","description":"","frontmatter":{"title":"Safers ~ Intuition","layout":"doc"},"headers":[{"level":2,"title":"Problem","slug":"problem","link":"#problem","children":[]},{"level":2,"title":"Vuethers' approach","slug":"vuethers-approach","link":"#vuethers-approach","children":[]}],"relativePath":"guide/safers/intuition.md"}`),n={name:"guide/safers/intuition.md"},i=o('<h1 id="intuition" tabindex="-1">Intuition <a class="header-anchor" href="#intuition" aria-hidden="true">#</a></h1><p>When your DApp loads, many asynchronous initialization stuff are performed by Vuethers in order to setup a safe and complete environment.</p><p>In addition, after the first initialization, the DApp context may constantly changes (eg. user wallet is now connected), and other things will have to be initialized and managed on-the-fly.</p><p>The number of different states your DApp can take is so really huge.</p><h2 id="problem" tabindex="-1">Problem <a class="header-anchor" href="#problem" aria-hidden="true">#</a></h2><p>It can be difficult in such a context to write safe code while many elements of your DApp can be impresivably safe or unsafe depending on this complex context.</p><p>For example, accessing or mutating the <code>dapp</code> object before the DApp initialization is considered unsafe as it can lead to errors and/or unexpected behaviors.</p><p>Another example, using the user&#39;s wallet before this one is connected to the DApp is also considered unsafe for the same reasons.</p><h2 id="vuethers-approach" tabindex="-1">Vuethers&#39; approach <a class="header-anchor" href="#vuethers-approach" aria-hidden="true">#</a></h2><p>To help developers to always write safe code, Vuethers comes with safety tools called <strong>safers</strong>.</p><p>With safers, no matter if your are coding in scripts or in templates, you can easily wrap your code in a safer method/component in order to make this one safe.</p><p>When your code is wrapped it is safe, Vuethers manages everything for you.</p>',12),r=[i];function s(p,c,d,h,l,u){return t(),a("div",null,r)}const _=e(n,[["render",s]]);export{m as __pageData,_ as default};