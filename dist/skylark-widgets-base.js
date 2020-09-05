/**
 * skylark-widgets-base - The skylark widget base library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
!function(factory,globals){var define=globals.define,require=globals.require,isAmd="function"==typeof define&&define.amd,isCmd=!isAmd&&"undefined"!=typeof exports;if(!isAmd&&!define){var map={};define=globals.define=function(t,e,i){"function"==typeof i?(map[t]={factory:i,deps:e.map(function(e){return function(t,e){if("."!==t[0])return t;var i=e.split("/"),s=t.split("/");i.pop();for(var n=0;n<s.length;n++)"."!=s[n]&&(".."==s[n]?i.pop():i.push(s[n]));return i.join("/")}(e,t)}),resolved:!1,exports:null},require(t)):map[t]={factory:null,resolved:!0,exports:i}},require=globals.require=function(t){if(!map.hasOwnProperty(t))throw new Error("Module "+t+" has not been defined");var module=map[t];if(!module.resolved){var e=[];module.deps.forEach(function(t){e.push(require(t))}),module.exports=module.factory.apply(globals,e)||null,module.resolved=!0}return module.exports}}if(!define)throw new Error("The module utility (ex: requirejs or skylark-utils) is not loaded!");if(function(define,require){define("skylark-widgets-base/base",["skylark-langx/skylark"],function(t){return t.attach("widgets.base",{mixins:{},panels:{}})}),define("skylark-widgets-base/SkinManager",[],function(){"use strict";var t=[],e=[];return{register:function(i,s){t.push(s),e[s]=i},get:function(i){i||(i=t[0]);return e[i]},getList:function(){return t.slice()}}}),define("skylark-widgets-base/Widget",["skylark-langx-ns","skylark-langx-types","skylark-langx-objects","skylark-langx-events","skylark-langx-numerics/Vector2","skylark-domx-browser","skylark-domx-data","skylark-domx-eventer","skylark-domx-noder","skylark-domx-files","skylark-domx-geom","skylark-domx-velm","skylark-domx-query","skylark-domx-fx","skylark-domx-plugins","skylark-data-collection/HashMap","./base","./SkinManager"],function(skylark,types,objects,events,Vector2,browser,datax,eventer,noder,files,geom,elmx,$,fx,plugins,HashMap,base,SkinManager){var Widget=plugins.Plugin.inherit({klassName:"Widget",_construct:function(t,e,i){t&&!(t instanceof Widget||t.element)&&(i=e,e=t,t=null),types.isHtmlNode(e)?i=this._parse(e,i):(i=e,e=null),types.isString(i)&&(i={tagName:i}),this.overrided(e,i),e?this._velm=this.elmx(this._elm):(this._velm=this._create(),this._elm=this._velm.elm()),Object.defineProperty(this,"state",{value:this.options.state||new HashMap}),this.visible=!0,this.element.style.position="absolute",this.element.style.overflow="hidden",this.size=new Vector2(0,0),this.location=new Vector2(0,0),this._mode=Widget.TOP_LEFT,this._init();var s=this.options.addons;if(s){var n=this.constructor,o=n.addons;for(var r in s)for(var a=0;a<s[r].length;a++){var l=s[r][a];if(types.isString(l)){var h=l,u=o[r][h],d=u.ctor?u.ctor:u;this.addon(d,u.options)}}}t&&this.parent(t)},_parse:function(elm,options){var optionsAttr=datax.data(elm,"options");if(optionsAttr){var options1=eval("({"+optionsAttr+"})");options=objects.mixin(options1,options)}return options||{}},_create:function(){var t=this.options.template;if(t)return this.elmx(t);var e=this.options.tagName;if(e)return this.elmx(noder.createElement(e,{style:{position:"absolute",overflow:"hidden"}}));throw new Error("The template or tagName is not existed in options!")},_init:function(){var t=this;this.widgetClass&&this._velm.addClass(this.widgetClass),this.state.on("changed",function(e,i){t._refresh(i.data)})},_startup:function(){},updateLocation:function(t){void 0!==t&&(this._mode=t),this._mode===Widget.TOP_LEFT||this._mode===Widget.TOP_RIGHT?this._elm.style.top=this.location.y+"px":this._elm.style.bottom=this.location.y+"px",this._mode===Widget.TOP_LEFT||this._mode===Widget.BOTTOM_LEFT?this._elm.style.left=this.location.x+"px":this._elm.style.right=this.location.x+"px"},updateSize:function(){this._elm.style.width=this.size.x+"px",this._elm.style.height=this.size.y+"px"},setVisibility:function(t){this.visible=t,this.updateVisibility()},updateVisibility:function(){this._elm.style.display=this.visible?"block":"none"},_refresh:function(t){},mapping:{events:{},attributs:{},properties:{},styles:{}},addon:function(t,e){var i=t.categoryName,s=t.addonName;this._addons=this.addons||{};var n=this._addons[i]=this._addons[i]||{};return n[s]=new t(this,e),this},addons:function(t,e){this._addons=this.addons||{};var i=this._addons[t]=this._addons[t]||{};if(void 0==e)return objects.clone(i||null);objects.mixin(i,e)},render:function(){return this._elm},getEnclosing:function(t){return null},getEnclosed:function(){return children=new ArrayList,children},getSkin:function(){return SkinManager.get()},show:function(){this._velm.show()},hide:function(){this._velm.hide()},focus:function(){try{this._velm.focus()}catch(t){}return this},blur:function(){return this._velm.blur(),this},enable:function(){return this.state.set("disabled",!1),this},disable:function(){return this.state.set("disabled",!0),this},addClass:function(t){return this._velm.addClass(t),this},removeClass:function(t){return this._velm.removeClass(t),this},aria:function(t,e){const i=this,s=i.getEl(i.ariaTarget);return void 0===e?i._aria[t]:(i._aria[t]=e,i.state.get("rendered")&&s.setAttribute("role"===t?t:"aria-"+t,e),i)},attr:function(t,e){var i=this._velm,s=i.attr(t,e);return s==i?this:s},getAttr:function(t){return this._velm.attr(t)},setAttr:function(t,e){return this._velm.attr(t,e),this},center:function(){this.location.set((this.parent.size.x-this.size.x)/2,(this.parent.size.y-this.size.y)/2)},css:function(t,e){var i=this._velm,s=i.css(t,e);return s==i?this:s},getStyle:function(t){return this._velm.css(t)},setStyle:function(t,e){return this._velm.css(t,e),this},data:function(t,e){var i=this._velm,s=i.data(t,e);return s==i?this:s},getData:function(t){return this._velm.data(t)},setData:function(t,e){return this._velm.data(t,e),this},parent:function(t){if(!t)return this._parent;this._parent=t,this.attach(t._elm||t.element)},getParent:function(){return this._parent},setParent:function(t){return this._parent=t,this.attach(t._elm||t.element),this},prop:function(t,e){var i=this._velm,s=i.prop(t,e);return s==i?this:s},getProp:function(t){return this._velm.prop(t)},setProp:function(t,e){return this._velm.prop(t,e),this},throb:function(t){return fx.throb(this._elm,t)},emit:function(t,e){var i=events.createEvent(t,{data:e});return events.Emitter.prototype.emit.call(this,i,e)},update:function(){this.updateVisibility(),this.visible&&(this.updateSize(),this.updateLocation())},attach:function(t,e){var i=t.element||t;e&&"child"!=e?"before"==e?noder.before(i,this._elm):"after"==e&&noder.after(i,this._elm):noder.append(i,this._elm),this._startup()},detach:function(){this._velm.remove()},preventDragEvents:function(){},element:{get:function(){return this._elm}},position:{get:function(){return this.location}},setAltText:function(t){var e=document.createElement("div");e.style.position="absolute",e.style.display="none",e.style.alignItems="center",e.style.zIndex="10000",e.style.border="3px solid",e.style.borderRadius="5px",e.style.color=Editor.theme.textColor,e.style.backgroundColor=Editor.theme.barColor,e.style.borderColor=Editor.theme.barColor,e.style.height="fit-content",document.body.appendChild(e);var i=document.createTextNode(t);e.appendChild(i);var s=this.destroy;return this.destroy=function(){s.call(this),document.body.contains(e)&&document.body.removeChild(e)},this._elm.style.pointerEvents="auto",this._elm.onmousemove=function(t){e.style.display="flex",e.style.left=t.clientX+8+"px",e.style.top=t.clientY-20+"px"},this._elm.onmouseout=function(){e.style.display="none"},e},setOnClick:function(t){this._elm.onclick=t},removeAllChildren:function(){for(;this._elm.firstChild;)this._elm.removeChild(this._elm.firstChild)},setMode:function(t){this._mode=t,this._elm.style.bottom=null,this._elm.style.right=null,this._elm.style.left=null}});return Widget.prototype.updateInterface=Widget.prototype.update,Widget.prototype.updatePosition=Widget.prototype.updateLocation,Widget.prototype.attachTo=Widget.prototype.attach,Widget.TOP_LEFT=0,Widget.TOP_RIGHT=1,Widget.BOTTOM_LEFT=2,Widget.BOTTOM_RIGHT=3,Widget.inherit=function(t){var e=plugins.Plugin.inherit.apply(this,arguments);function i(t){e.prototype[t]=function(e){return void 0!==e?(this.state.set(t,e),this):this.state.get(t)}}if(t.state)for(var s in t.state)i(s);return t.pluginName&&plugins.register(e,t.pluginName),e},Widget.register=function(t,e){var i=t.prototype,s=e||i.pluginName;function n(e){t.prototype[e]=function(t){return void 0!==t?(this.state.set(e,t),this):this.state.get(e)}}if(i.state)for(var o in i.state)n(o);return s&&plugins.register(t,s),t},base.Widget=Widget}),define("skylark-widgets-base/ImagePane",["./base","./Widget"],function(t,e){"use strict";var i=e.inherit({_construct:function(t){e.call(this,t,"img"),this._elm.style.borderStyle="none",this._elm.style.objectFit="contain"},setImage:function(t){this._elm.src=t}});return t.ImagePane=i}),define("skylark-widgets-base/mixins/TextMixin",["skylark-langx-numerics/Vector2","../Widget"],function(t,e){"use strict";var i={_buildText:function(){this.getSkin();this.span=document.createElement("span"),this.span.style.overflow="hidden",this._elm.appendChild(this.span),this.text=document.createTextNode(""),this.span.appendChild(this.text),this.fitContent=!1,this.allowWordBreak(!1),this.setVerticalAlignment(i.CENTER),this.setAlignment(i.CENTER)},setFont:function(t,e,i){this.span.style.fontFamily=t,void 0!==e&&(this.span.style.fontWeight=e),void 0!==i&&(this.span.style.fontStyle=i)},allowWordBreak:function(t){!0===t?(this.span.style.whiteSpace="normal",this.span.style.wordBreak="break-word"):(this.span.style.whiteSpace="pre",this.span.style.wordBreak="normal")},setText:function(t){this.text.data=t},setTextBorder:function(t,e){this.span.style.textShadow="-"+t+"px 0 "+e+", 0 "+t+"px "+e+", "+t+"px 0 "+e+", 0 -"+t+"px "+e},setTextSize:function(t){this._elm.style.fontSize=t+"px"},setTextColor:function(t){this.span.style.color=t},setOverflow:function(t){t===i.ELLIPSIS?(this.span.style.whiteSpace="nowrap",this.span.style.textOverflow="ellipsis"):(this.span.style.whiteSpace="pre",this.span.style.textOverflow="clip")},setAlignment:function(t){t===i.CENTER?(this._elm.style.justifyContent="center",this._elm.style.textAlign="center"):t===i.LEFT?(this._elm.style.justifyContent="flex-start",this._elm.style.textAlign="left"):t===i.RIGHT&&(this._elm.style.justifyContent="flex-end",this._elm.style.textAlign="right")},setVerticalAlignment:function(t){t===i.CENTER?this._elm.style.alignItems="center":t===i.TOP?this._elm.style.alignItems="flex-start":t===i.BOTTOM&&(this._elm.style.alignItems="flex-end")},measure:function(){return new t(this.span.offsetWidth,this.span.offsetHeight)},setMargin:function(t){this.span.style.margin=t+"px"},updateSize:function(){this.fitContent&&(this.size.x=this.span.clientWidth,this.size.y=this.span.clientHeight),e.prototype.updateSize.call(this)},updateVisibility:function(){this._elm.style.display=this.visible?"flex":"none"},CENTER:0,LEFT:1,RIGHT:2,TOP:3,BOTTOM:4,CLIP:10,ELLIPSIS:11};return i}),define("skylark-widgets-base/TextPane",["./base","./Widget","./mixins/TextMixin"],function(t,e,i){"use strict";var s=e.inherit({_construct:function(t){e.prototype._construct.call(this,t,"div");var i=this.getSkin();this._elm.style.pointerEvents="none",this._elm.style.color=i.textColor,this._elm.style.display="flex",this._buildText()},...i});return s.CENTER=0,s.LEFT=1,s.RIGHT=2,s.TOP=3,s.BOTTOM=4,s.CLIP=10,s.ELLIPSIS=11,t.TextPane=s}),define("skylark-widgets-base/panels/Panel",["../base","../Widget"],function(t,e){"use strict";var i=e.inherit({_construct:function(t){e.prototype._construct.call(this,t,"div"),this._elm.style.overflow="visible"}});return t.panels.Panel=i}),define("skylark-widgets-base/panels/DualContainer",["../base","./Panel"],function(t,e){"use strict";var i=e.inherit({klassName:"DualContainer",_construct:function(t){e.prototype._construct.call(this,t);var s=this.getSkin();this._elm.style.overflow="hidden",this._elm.style.backgroundColor=s.panelColor,this._elmA=null,this._elmB=null,this.resizeTab=document.createElement("div"),this.resizeTab.style.position="absolute",this.resizeTab.style.cursor="e-resize",this.resizeTab.style.backgroundColor=s.resizeTabColor,this._elm.appendChild(this.resizeTab),this.tabPosition=.5,this.tabPositionMax=.95,this.tabPositionMin=.05,this.tabSize=5,this.orientation=i.HORIZONTAL;var n=this;this.connect(window,"mousemove",function(t){n.orientation===i.HORIZONTAL?n.tabPosition+=t.movementX/n.size.x:n.orientation===i.VERTICAL&&(n.tabPosition+=t.movementY/n.size.y),n.tabPosition>n.tabPositionMax?n.tabPosition=n.tabPositionMax:n.tabPosition<n.tabPositionMin&&(n.tabPosition=n.tabPositionMin),n.updateInterface()}),this.connect(window,"mouseup",function(t){n.manager.destroy()})},attach:function(t){null!==this._elmA?null!==this._elmB?console.warn("nunuStudio: Cannot attach more elements."):this.attachB(t):this.attachA(t)},attachA:function(t){this._elmA=t,this._elmA.attachTo(this)},attachB:function(t){this._elmB=t,this._elmB.attachTo(this)},updateSize:function(){if(Widget.prototype.updateSize.call(this),null!==this._elmA&&null!==this._elmB){if(this.orientation===i.HORIZONTAL){var t=this.tabPosition*this.size.x;this._elmA.position.set(0,0),this._elmA.size.set(t,this.size.y),this._elmA.updateInterface(),this._elmB.size.set(this.size.x-t-this.tabSize,this.size.y),this._elmB.position.set(this._elmA.size.x+this.tabSize,0),this._elmB.updateInterface(),this.resizeTab.style.cursor="e-resize",this.resizeTab.style.top="0px",this.resizeTab.style.left=this._elmA.size.x+"px",this.resizeTab.style.width=this.tabSize+"px",this.resizeTab.style.height=this.size.y+"px"}else if(this.orientation===i.VERTICAL){var t=this.tabPosition*this.size.y;this._elmA.position.set(0,0),this._elmA.size.set(this.size.x,t),this._elmA.updateInterface(),this._elmB.size.set(this.size.x,this.size.y-t-this.tabSize),this._elmB.position.set(0,this._elmA.size.y+this.tabSize),this._elmB.updateInterface(),this.resizeTab.style.cursor="n-resize",this.resizeTab.style.top=this._elmA.size.y+"px",this.resizeTab.style.left="0px",this.resizeTab.style.width=this.size.x+"px",this.resizeTab.style.height=this.tabSize+"px"}}else console.log("nunuStudio: Dual container elements are null",this,this._elmA,this._elmB)}});return i.HORIZONTAL=0,i.VERTICAL=1,t.panels.DualContainer=i}),define("skylark-widgets-base/panels/DualPanel",["../base","./Panel"],function(t,e){"use strict";var i=e.inherit({klassName:"DualPanel",_construct:function(t){e.prototype._construct.call(this,t);var s=this.getSkin();this._elm.style.overflow="hidden",this._elm.style.backgroundColor=s.panelColor,this.divA=new e(this),this.divA.element.style.backgroundColor=s.panelColor,this.divB=new e(this),this.divB.element.style.backgroundColor=s.panelColor,this.resizeTab=document.createWidget("div"),this.resizeTab.style.position="absolute",this.resizeTab.style.cursor="e-resize",this.resizeTab.style.backgroundColor=s.resizeTabColor,this._elm.appendChild(this.resizeTab),this.tabPosition=.5,this.tabPositionMax=1,this.tabPositionMin=0,this.tabSize=5,this.orientation=i.HORIZONTAL;var n=this;this.connect(window,"mousemove",function(t){n.orientation===i.HORIZONTAL?n.tabPosition+=t.movementX/n.size.x:n.orientation===i.VERTICAL&&(n.tabPosition+=t.movementY/n.size.y),n.tabPosition>n.tabPositionMax?n.tabPosition=n.tabPositionMax:n.tabPosition<n.tabPositionMin&&(n.tabPosition=n.tabPositionMin),n.updateInterface(),n.onResize()}),this.connect(window,"mouseup",function(t){n.manager.destroy()}),this.onResize=function(){Editor.gui.updateInterface()}},setOnResize:function(t){this.onResize=t},updateSize:function(){if(Widget.prototype.updateSize.call(this),this.orientation===i.HORIZONTAL){var t=this.tabPosition*this.size.x;this.divA.position.set(0,0),this.divA.size.set(t,this.size.y),this.divA.updateInterface(),this.divB.size.set(this.size.x-t-this.tabSize,this.size.y),this.divB.position.set(this.divA.size.x+this.tabSize,0),this.divB.updateInterface(),this.resizeTab.style.cursor="e-resize",this.resizeTab.style.top="0px",this.resizeTab.style.left=this.divA.size.x+"px",this.resizeTab.style.width=this.tabSize+"px",this.resizeTab.style.height=this.size.y+"px"}else if(this.orientation===i.VERTICAL){var t=this.tabPosition*this.size.y;this.divA.position.set(0,0),this.divA.size.set(this.size.x,t),this.divA.updateInterface(),this.divB.size.set(this.size.x,this.size.y-t-this.tabSize),this.divB.position.set(0,this.divA.size.y+this.tabSize),this.divB.updateInterface(),this.resizeTab.style.cursor="n-resize",this.resizeTab.style.top=this.divA.size.y+"px",this.resizeTab.style.left="0px",this.resizeTab.style.width=this.size.x+"px",this.resizeTab.style.height=this.tabSize+"px"}}});return i.HORIZONTAL=0,i.VERTICAL=1,t.panels.DualPanel=i}),define("skylark-widgets-base/DragBuffer",[],function(){"use strict";var t={buffer:[],push:function(e){-1===t.buffer.indexOf(e)&&t.buffer.push(e)},pop:function(e){for(var i=0;i<t.buffer.length;i++)if(t.buffer[i].uuid===e){var s=t.buffer[i];return t.buffer.splice(i,1),s}return null},get:function(e){for(var i=0;i<t.buffer.length;i++)if(t.buffer[i].uuid===e)return t.buffer[i];return null}};return t}),define("skylark-widgets-base/SkinDark",["./SkinManager"],function(t){"use strict";var e=new function(){this.font="Arial",this.barColor="#222222",this.sepColor="#292929",this.panelColor="#333333",this.resizeTabColor="#222222",this.boxColor="#444444",this.textColor="#FFFFFF",this.iconColor="#FFFFFF",this.buttonColor="#222222",this.buttonOverColor="#555555",this.buttonLightColor="#333333",this.audioTrack="#222222",this.audioScrubber="#FFFFFF",this.audioProgress="#555555",document.body.style.fontFamily=this.font,document.body.style.color=this.textColor,document.body.style.fontSize="12px"};return t.register(e,"dark"),e}),define("skylark-widgets-base/main",["./base","./Widget","./ImagePane","./TextPane","./panels/DualContainer","./panels/DualPanel","./DragBuffer","./SkinManager","./SkinDark"],function(t){return t}),define("skylark-widgets-base",["skylark-widgets-base/main"],function(t){return t})}(define,require),!isAmd){var skylarkjs=require("skylark-langx-ns");isCmd?module.exports=skylarkjs:globals.skylarkjs=skylarkjs}}(0,this);
//# sourceMappingURL=sourcemaps/skylark-widgets-base.js.map
