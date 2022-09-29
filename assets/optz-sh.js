const enableOptimization = document.currentScript.getAttribute('enableOptimization') || "false";
if (enableOptimization === "true") {
    var _doLazyScripts, doNavigatorPlatform, doSrc, doStyle, doDataSrc, doUrls, doAnalytics, doS, doX, doI, doJ, doFlag, _doLazyIframe;

    function doJSOptimizationInit() {
        doFlag && (doFlag = 0, doLoadAllJs())
    }
    
    function doLazyLoadScripts() {
        doJ != _doLazyScripts.length && ("lazyload2" == _doLazyScripts[doJ].getAttribute("type") ? (_doLazyScripts[doJ].setAttribute("type", "lazyloaded"), void 0 !== _doLazyScripts[j].dataset.src ? ((doS = document.createElement("script")).src = _doLazyScripts[j].dataset.src, document.body.appendChild(doS), doS.onload = function () {
            doJ++, doLazyLoadScripts()
        }) : ((doS = document.createElement("script")).innerHTML = _doLazyScripts[doJ].innerHTML, document.body.appendChild(doS), doJ++, doLazyLoadScripts())) : (doJ++, doLazyLoadScripts()))
    }

    function doLazyLoadDeferScripts() {
        let _lazySrcScripts = document.querySelectorAll('script[data-lazy-src]');
        if(_lazySrcScripts.length > 0){
            let jsFragment = new DocumentFragment();
            for (let index = 0; index < _lazySrcScripts.length; index++) {
                let _lazySrcScript = _lazySrcScripts[index];
                if(_lazySrcScript.dataset.lazySrc != null){
                    (doS = document.createElement("script")).src = _lazySrcScript.dataset.lazySrc, 
                    doS.defer = true,
                    jsFragment.appendChild(doS);
                    _lazySrcScript.remove();
                }
            }
            document.body.appendChild(jsFragment);
        }
    }

    function doLazyLoadCss(t) {
        (doS = document.createElement("link")).rel = "stylesheet", doS.href = t, doS.media='all',document.getElementsByTagName("head")[0].appendChild(doS)
    }

    function doLazyLoadJS(t, isAsync = false) {
        (doS = document.createElement("script")).src = t, 
        isAsync == true && (
            (doS = document.createElement("script")).async = isAsync
        );
        document.body.appendChild(doS)
    }

    function doLazyLoadDeferJS(t) {
        (doS = document.createElement("script")).src = t, 
        doS.defer = true,
        document.body.appendChild(doS);
    }

    function doLazyLoadIframe() {
        _doLazyIframe.forEach(function (t) {
            null != t.dataset.src && (t.src = t.dataset.src)
        })
    }

    document.addEventListener("DOMContentLoaded", function () {
        windowWidth = screen.width, 
        _doLazyIframe = document.querySelectorAll("iframe"), 
        _doLazyScripts = document.getElementsByTagName("script"), 
        doNavigatorPlatform = navigator.platform, 
        doI = 0, 
        doJ = 0, 
        doFlag = 1, 
        window.addEventListener("scroll", function () {
            doJSOptimizationInit()
        }), window.addEventListener("mousemove", function () {
            doJSOptimizationInit()
        }), window.addEventListener("touchstart", function () {
            doJSOptimizationInit()
        }), "Linux x86_64" != doNavigatorPlatform && doJSOptimizationInit();
        
    });
    var doT = document.getElementsByTagName("script");
    
    for (let i = 0; i < doT.length; i++) null !== doT[i].getAttribute("data-src") && (doT[i].setAttribute("src", doT[i].getAttribute("data-src")), delete doT[i].dataset.src);
    var doE = document.getElementsByTagName("link");
    for (let i = 0; i < doE.length; i++) null !== doE[i].getAttribute("data-href") && (doE[i].setAttribute("href", doE[i].getAttribute("data-href")), delete doE[i].dataset.href);

    var config = { // If the image gets within 50px in the Y axis, start the download. 
        rootMargin: '50px 0px',
        threshold: 0.1
    };
    function showImage(entries, observer) {
        for (var i = 0; i < entries.length; i++) {
            var io = entries[i];
            if (io.isIntersecting && io.intersectionRatio > 0) {
                var image = io.target,
                    src = image.getAttribute("data-src") || image.getAttribute("data-img-src"),
                    srcSet = image.getAttribute("data-srcset");
                if (srcSet) {
                    image.setAttribute("srcset", srcSet);
                }
                if (src) {
                    image.setAttribute("src", src);
                } 
                // Stop watching and load the image 
                observer.unobserve(io.target); 
            } 
        } 
    } 
    var doImages = document.querySelectorAll("img[data-img-src]");
    let imgObserver = new IntersectionObserver(showImage, { 
        // If the image gets within 50px in the Y axis, start the download. 
        rootMargin: '50px 0px', 
        threshold: 0.1 
    });
    for (let i = 0; i < doImages.length; i++) null !== doImages[i].getAttribute("data-img-src") && (imgObserver.observe(doImages[i]));
    
    

    function doLoadAllJs() {
        document.body.click();
        // define all lazy load css here
        if(_lazyStylesSheets.length > 0) {
            for (let index = 0; index < _lazyStylesSheets.length; index++) {
                const _lazyStylesSheet = _lazyStylesSheets[index];
                doLazyLoadCss(_lazyStylesSheet);
            }
        }
        if (window.location.href.indexOf("designeroptics-com.myshopify.com") > -1 || window.location.href.indexOf("/cart") > -1 || window.location.href.indexOf("/checkout") > -1) {
            console.log("No-Optimization");
        } else {
            console.log("Optimized");
            // define all lazy load js
            j = 0;
            _doLazyScripts = document.getElementsByTagName("script");
            doLazyLoadScripts();
            doLazyLoadDeferScripts();
            doLazyLoadDeferJS("https://d275fvz7g8rvo.cloudfront.net/designeroptics-com.myshopify.com/online_store_script.js?shop=designeroptics-com.myshopify.com");
            doLazyLoadDeferJS('https://wishlisthero-assets.revampco.com/store-front/bundle2.js?shop=designeroptics-com.myshopify.com');
            doLazyLoadDeferJS('https://config.gorgias.chat/gorgias-chat-bundle-loader.js?applicationId=154');
            
        }
        
    }

    setTimeout(() => {
        document.querySelector("#my-overlay") && document.querySelector("#my-overlay").remove();
    }, 1000);

} else {
    document.querySelector("#my-overlay") && (
        document.querySelector("#my-overlay").style.background = "white url(https://cdn.shopify.com/s/files/1/1780/9427/t/67/assets/ajax-loader.gif?v=4135686330247201572) no-repeat fixed center"
     );
}
