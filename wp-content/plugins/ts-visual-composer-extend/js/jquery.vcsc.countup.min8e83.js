!function(t){t.fn.CountItUp=function(e){if("function"!=typeof CountItUp)return void console.error("CountItUp.js is a required dependency of CountItUp-jquery.js.");var n={startVal:0,decimals:0,duration:2};if("number"==typeof e)n.endVal=e;else{if("object"!=typeof e)return void console.error("CountItUp-jquery requires its argument to be either an object or number");t.extend(n,e)}return this.each(function(t,e){var a=new a(e,n.startVal,n.endVal,n.decimals,n.duration,n.options);a.start()}),this}}(jQuery),function(t,e){"function"==typeof define&&define.amd?define(e):"object"==typeof exports?module.exports=e(require,exports,module):t.CountItUp=e()}(this,function(t,e,n){return function(t,e,n,a,r,i){function o(t){t=t.toFixed(l.decimals);var e,n,a,r,i,o;if(e=(t+="").split("."),n=e[0],a=e.length>1?l.options.decimal+e[1]:"",l.options.useGrouping){for(r="",i=0,o=n.length;i<o;++i)0!==i&&i%3==0&&(r=l.options.separator+r),r=n[o-i-1]+r;n=r}return l.options.numerals.length&&(n=n.replace(/[0-9]/g,function(t){return l.options.numerals[+t]}),a=a.replace(/[0-9]/g,function(t){return l.options.numerals[+t]})),l.options.prefix+n+a+l.options.suffix}function u(t,e,n,a){return n*(1-Math.pow(2,-10*t/a))*1024/1023+e}function s(t){return"number"==typeof t&&!isNaN(t)}var l=this;if(l.version=function(){return"1.9.2"},l.options={useEasing:!0,useGrouping:!0,separator:",",decimal:".",easingFn:u,formattingFn:o,prefix:"",suffix:"",numerals:[]},i&&"object"==typeof i)for(var m in l.options)i.hasOwnProperty(m)&&null!==i[m]&&(l.options[m]=i[m]);""===l.options.separator?l.options.useGrouping=!1:l.options.separator=""+l.options.separator;for(var d=0,c=["webkit","moz","ms","o"],f=0;f<c.length&&!window.requestAnimationFrame;++f)window.requestAnimationFrame=window[c[f]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[c[f]+"CancelAnimationFrame"]||window[c[f]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(t,e){var n=(new Date).getTime(),a=Math.max(0,16-(n-d)),r=window.setTimeout(function(){t(n+a)},a);return d=n+a,r}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(t){clearTimeout(t)}),l.initialize=function(){return!!l.initialized||(l.error="",l.d="string"==typeof t?document.getElementById(t):t,l.d?(l.startVal=Number(e),l.endVal=Number(n),s(l.startVal)&&s(l.endVal)?(l.decimals=Math.max(0,a||0),l.dec=Math.pow(10,l.decimals),l.duration=1e3*Number(r)||2e3,l.countDown=l.startVal>l.endVal,l.frameVal=l.startVal,l.initialized=!0,!0):(l.error="[CountItUp] startVal ("+e+") or endVal ("+n+") is not a number",!1)):(l.error="[CountItUp] target is null or undefined",!1))},l.printValue=function(t){var e=l.options.formattingFn(t);"INPUT"===l.d.tagName?this.d.value=e:"text"===l.d.tagName||"tspan"===l.d.tagName?this.d.textContent=e:this.d.innerHTML=e},l.count=function(t){l.startTime||(l.startTime=t),l.timestamp=t;var e=t-l.startTime;l.remaining=l.duration-e,l.options.useEasing?l.countDown?l.frameVal=l.startVal-l.options.easingFn(e,0,l.startVal-l.endVal,l.duration):l.frameVal=l.options.easingFn(e,l.startVal,l.endVal-l.startVal,l.duration):l.countDown?l.frameVal=l.startVal-(l.startVal-l.endVal)*(e/l.duration):l.frameVal=l.startVal+(l.endVal-l.startVal)*(e/l.duration),l.countDown?l.frameVal=l.frameVal<l.endVal?l.endVal:l.frameVal:l.frameVal=l.frameVal>l.endVal?l.endVal:l.frameVal,l.frameVal=Math.round(l.frameVal*l.dec)/l.dec,l.printValue(l.frameVal),e<l.duration?l.rAF=requestAnimationFrame(l.count):l.callback&&l.callback()},l.start=function(t){l.initialize()&&(l.callback=t,l.rAF=requestAnimationFrame(l.count))},l.pauseResume=function(){l.paused?(l.paused=!1,delete l.startTime,l.duration=l.remaining,l.startVal=l.frameVal,requestAnimationFrame(l.count)):(l.paused=!0,cancelAnimationFrame(l.rAF))},l.reset=function(){l.paused=!1,delete l.startTime,l.initialized=!1,l.initialize()&&(cancelAnimationFrame(l.rAF),l.printValue(l.startVal))},l.update=function(t){if(l.initialize()){if(t=Number(t),!s(t))return void(l.error="[CountItUp] update() - new endVal is not a number: "+t);l.error="",t!==l.frameVal&&(cancelAnimationFrame(l.rAF),l.paused=!1,delete l.startTime,l.startVal=l.frameVal,l.endVal=t,l.countDown=l.startVal>l.endVal,l.rAF=requestAnimationFrame(l.count))}},l.initialize()&&l.printValue(l.startVal)}});