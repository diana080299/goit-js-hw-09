const t={startBtn:document.querySelector("button[data-start]"),stopBtn:document.querySelector("button[data-stop]"),body:document.querySelector("body")};t.startBtn.addEventListener("click",(function(){e=setInterval(n,1e3),t.startBtn.setAttribute("disabled",!0)})),t.stopBtn.addEventListener("click",(function(n){clearInterval(e),t.startBtn.removeAttribute("disabled")}));let e=null;function n(){t.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}
//# sourceMappingURL=01-color-switcher.ba2a01a9.js.map
