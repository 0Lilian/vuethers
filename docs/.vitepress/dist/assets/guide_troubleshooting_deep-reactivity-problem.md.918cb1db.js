import{_ as e,o as s,c as a,d as t}from"./app.106af06f.js";const b=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[{"level":2,"title":"Deep reactivity problem","slug":"deep-reactivity-problem","link":"#deep-reactivity-problem","children":[{"level":3,"title":"Resilient reactive getters and setters","slug":"resilient-reactive-getters-and-setters","link":"#resilient-reactive-getters-and-setters","children":[]}]}],"relativePath":"guide/troubleshooting/deep-reactivity-problem.md"}'),n={name:"guide/troubleshooting/deep-reactivity-problem.md"},o=t(`<h2 id="deep-reactivity-problem" tabindex="-1">Deep reactivity problem <a class="header-anchor" href="#deep-reactivity-problem" aria-hidden="true">#</a></h2><p>By default reactive objects are deeply reactive in Vue which means that any sub-objects, array, or values are made reactive when their parent is wrapped in <code>ref()</code> or <code>reactive()</code>. This behavior is sometimes wanted to track changes in an entire object but sometimes we just want to track if the root object changes and it&#39;s so unecessary to track the entire&#39;s object changes. In addition, in case the object we made deeply reactive already contains some reactive children, those ones are unwrapped (they can be accessed without <code>.value</code>). This behavior is not insignificant as it can breaks the logic of sub objects : Their methods are using <code>.value</code> to access the values of their properties, but once they are unwrapped all those methods will be broken because <code>.value</code> should not anymore be used to access properties&#39; values.</p><p>To solve that problem and to allows tracking only the root object, Vue introduced the concept of &quot;Shallow Refs&quot;.</p><p>Tulipe object have been made as resilient as possible but in some case if they are made deeply reactive, some unexpected behaviors could occur. That&#39;s why you should never made a Tulipe object deeply reactive even if you know what you do. Instead use shallow refs :</p><div class="language-js line-numbers-mode"><button class="copy"></button><span class="lang">js</span><pre><code><span class="line"><span style="color:#8B949E;">// Normal Vue</span></span>
<span class="line"><span style="color:#FF7B72;">import</span><span style="color:#C9D1D9;"> { ref, shallowRef } </span><span style="color:#FF7B72;">from</span><span style="color:#C9D1D9;"> </span><span style="color:#A5D6FF;">&quot;vue&quot;</span><span style="color:#C9D1D9;">;</span></span>
<span class="line"><span style="color:#FF7B72;">const</span><span style="color:#C9D1D9;"> </span><span style="color:#79C0FF;">tx</span><span style="color:#C9D1D9;"> </span><span style="color:#FF7B72;">=</span><span style="color:#C9D1D9;"> </span><span style="color:#D2A8FF;">ref</span><span style="color:#C9D1D9;">(</span><span style="color:#D2A8FF;">EthersTransactionProxy</span><span style="color:#C9D1D9;">())            </span><span style="color:#8B949E;">// MUST BE AVOIDED</span></span>
<span class="line"><span style="color:#FF7B72;">const</span><span style="color:#C9D1D9;"> </span><span style="color:#79C0FF;">tx</span><span style="color:#C9D1D9;"> </span><span style="color:#FF7B72;">=</span><span style="color:#C9D1D9;"> </span><span style="color:#D2A8FF;">shallowRef</span><span style="color:#C9D1D9;">(</span><span style="color:#D2A8FF;">EthersTransactionProxy</span><span style="color:#C9D1D9;">())     </span><span style="color:#8B949E;">// Recommended practice</span></span>
<span class="line"></span>
<span class="line"><span style="color:#8B949E;">// With Reactivity Transform</span></span>
<span class="line"><span style="color:#FF7B72;">const</span><span style="color:#C9D1D9;"> </span><span style="color:#79C0FF;">tx</span><span style="color:#C9D1D9;"> </span><span style="color:#FF7B72;">=</span><span style="color:#C9D1D9;"> </span><span style="color:#D2A8FF;">$ref</span><span style="color:#C9D1D9;">(</span><span style="color:#D2A8FF;">EthersTransactionProxy</span><span style="color:#C9D1D9;">())            </span><span style="color:#8B949E;">// MUST BE AVOIDED</span></span>
<span class="line"><span style="color:#FF7B72;">const</span><span style="color:#C9D1D9;"> </span><span style="color:#79C0FF;">tx</span><span style="color:#C9D1D9;"> </span><span style="color:#FF7B72;">=</span><span style="color:#C9D1D9;"> </span><span style="color:#D2A8FF;">$shallowRef</span><span style="color:#C9D1D9;">(</span><span style="color:#D2A8FF;">EthersTransactionProxy</span><span style="color:#C9D1D9;">())     </span><span style="color:#8B949E;">// Recommended practice</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h3 id="resilient-reactive-getters-and-setters" tabindex="-1">Resilient reactive getters and setters <a class="header-anchor" href="#resilient-reactive-getters-and-setters" aria-hidden="true">#</a></h3><p>If you plan to work with deeply reactive Tulipe objects, this ones provides you with two methods that allows to get or set the value of a possibily nested reactive object :</p><ul><li><code>rGet(&lt;possiblyNestedReactiveObject&gt;)</code></li><li><code>rSet(&lt;possiblyNestedReactiveObject&gt;, &lt;newValue&gt;)</code> These methods are pretty simple, they use the <code>isRef()</code> method provided by Vue to determine if the <code>&lt;possiblyNestedReactiveObject&gt;</code> is a Ref or not (if not it means that is has been unwrapped) and so to determine if it must be set or get using <code>.value</code> or not.</li></ul><p>The <code>r</code> before <code>Get</code> and <code>Set</code> stands for <code>resilient/reactive Get/Set</code>.</p><p>All the Tulipe objects are internally using those methods to makes it as resilient as possible.</p>`,10),l=[o];function r(p,c,i,d,y,h){return s(),a("div",null,l)}const m=e(n,[["render",r]]);export{b as __pageData,m as default};
