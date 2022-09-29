const pdpNew = (() => {
    
    // filter product thumbs slider image based on current variant title
    window.NEW_RX_PDP_TEMPLATE.currentSlide = 0;
    const sectionId = window.NEW_RX_PDP_TEMPLATE.sectionId;
    const availabilityAltSelector =  document.getElementById(`availability_alt`) || '';
    const itemStockSelector = document.getElementById(`ProductStock-${sectionId}`) || '';
    const itemSkuSelector = document.querySelector(`#ProductSku-${sectionId} span`) || '';

    const togglePlaceHolders = (isHidden = false) => {
        let rxPlaceHolders = document.querySelectorAll('[data-rx-placeholder]') && Array.prototype.slice.call(document.querySelectorAll('[data-rx-placeholder]')) || [];
        if(rxPlaceHolders.length > 0){
            for (let index = 0; index < rxPlaceHolders.length; index++) {
                let rxPlaceHolder = rxPlaceHolders[index];
                isHidden === true ? (
                    rxPlaceHolder.classList.add("rx-new__hidden")
                ) : (
                    rxPlaceHolder.classList.remove("rx-new__hidden")
                )        
            }
        }
    }
    const toggleRxNewHiddenElement = (isHidden = false) => {
        let rxHiddenElements = document.querySelectorAll('[data-rx-hidden-block]') && Array.prototype.slice.call(document.querySelectorAll('[data-rx-hidden-block]')) || [];
        if(rxHiddenElements.length > 0){
            for (let index = 0; index < rxHiddenElements.length; index++) {
                let rxHiddenElement = rxHiddenElements[index];
                isHidden === true ? (
                    rxHiddenElement.classList.add("rx-new__hidden")
                ) : (
                    rxHiddenElement.classList.remove("rx-new__hidden")
                )        
            }
        }
    }
    const toggleGallerySkleton = (isLoading = false) => {
        let gallerySkleton = document.querySelector("[data-gallery-slider-skeleton]");
        let sliderSkleton = document.querySelector("[data-gallery-slider]");

        isLoading === true ? (
            gallerySkleton.classList.remove("hide"),
            sliderSkleton.classList.add("hide")
        ) : (
            gallerySkleton.classList.add("hide"),
            sliderSkleton.classList.remove("hide")
        )
    }

    const toggleVariantImageSwatchSkleton = (isLoading = false) => {
        let variantSwatchSkleton = document.querySelector("[data-variant-img-swatch-skeleton]");
        let sliderSkleton = document.querySelector("[data-variant-img-swatch-slider]");
        if(variantSwatchSkleton){
            isLoading === true ? (
                variantSwatchSkleton.classList.remove("hide"),
                sliderSkleton.classList.add("rx-new__hidden-visibility")
            ) : (
                variantSwatchSkleton.classList.add("hide"),
                sliderSkleton.classList.remove("rx-new__hidden-visibility")
            )
        }else{
            sliderSkleton && sliderSkleton.classList.remove("rx-new__hidden-visibility")
        }

    }


    const californiaWarningPopup = () => {
        let warningTextLink = document.querySelector("a.prop-65-link") || undefined;
        let warningModal = document.getElementById("prop-65-modal") || undefined;

        warningTextLink && warningModal && warningTextLink.addEventListener("click", () => {
            $(warningModal).fadeIn();
        });
        warningModal && warningModal.querySelector(".close") &&warningModal.querySelector(".close").addEventListener("click", () => {
            $(warningModal).fadeOut();
        })
    }

    const productSwatchSlider = () => {
        document.querySelector(".rx-new__pdp-swatch-footer-text") && document.querySelector(".rx-new__pdp-swatch-footer-text").classList.add("hide");
        let avVariants_size = Number($('#avVariants_size').text());
        if($(window).width()>767){
            if(avVariants_size > 8) {
                $('.rx-new__swatch-holder').slick({
                    rows:2,
                    dots: false,
                    arrows: true,
                    infinite: false,
                    speed: 300,
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    responsive: [
                        {
                            breakpoint: 1024,
                            settings: {
                                slidesToShow: 3,
                                slidesToScroll: 3
                            }
                        }
                    ]
                });
                document.querySelector(".rx-new__pdp-swatch-footer-text") && document.querySelector(".rx-new__pdp-swatch-footer-text").classList.remove("hide"); 
            }
        }else{
            if(avVariants_size > 6) {
                $('.rx-new__swatch-holder').slick({
                    rows:2,
                    dots: false,
                    arrows: true,
                    infinite: false,
                    speed: 300,
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    responsive: [
                        {
                            breakpoint: 1024,
                            settings: {
                                slidesToShow: 3,
                                slidesToScroll: 3
                            }
                        }
                    ]
                });
                document.querySelector(".rx-new__pdp-swatch-footer-text") && document.querySelector(".rx-new__pdp-swatch-footer-text").classList.remove("hide"); 
            }
            // $('.rx-new__swatch-holder').slick({
            //     dots: false,
            //     arrows: true,
            //     infinite: false,
            //     speed: 300,
            //     slidesToShow: 3,
            //     slidesToScroll:1
            // });
            // document.querySelector(".rx-new__pdp-swatch-footer-text") && document.querySelector(".rx-new__pdp-swatch-footer-text").classList.remove("hide");
        }
    }

    const prescriptionEventListener = () => {
        let spanInterval = setInterval(function(){
            if(openModal && typeof openModal === "function"){    
                clearInterval(spanInterval);
                let prescriptionButtons = document.getElementsByClassName("rx-new__prescription-btn") && Array.prototype.slice.call(document.getElementsByClassName("rx-new__prescription-btn")) || [];
                if(prescriptionButtons.length > 0){
                    for (let index = 0; index < prescriptionButtons.length; index++) {
                        const prescriptionButton = prescriptionButtons[index];
                        prescriptionButton.addEventListener("click", () => {
                            event.preventDefault;
                            openModal(event.target);
                        });
                    }
                }
            }
        }, 1000);
        
    }
    

    const zoomImage = () => {
        let mainImages = document.getElementsByClassName("rx__main-img") ? Array.prototype.slice.call(document.getElementsByClassName("rx__main-img")) : [] ;
        if(mainImages.length > 0){
            for (let index = 0; index < mainImages.length; index++) {
                let mainImage = mainImages[index];
                let _zoomImg = mainImage.querySelector(".image-zoom") || undefined;
                if(_zoomImg){
                    $(_zoomImg)
                    .wrap('<span class="zoom-container" style="display:inline-block"></span>')
                    .css('display', 'inline-block')
                    .parent()
                    .zoom({
                        url:$(_zoomImg).attr('data-zoom')
                    });
                }
            }
        }
    }

    // change sku
    const changeSku = (sku) => {    
        itemSkuSelector ? (itemSkuSelector.innerText = sku) : null;
    }

    // change variant title
    const changeVariantTitle = (variantTitle) => {    
        const variantTitleElement = document.querySelector(`[data-product-variant-title]`) || undefined;
        if(variantTitle.toLowerCase() === "default title"){
            variantTitleElement ? (variantTitleElement.innerText = "") : null;
        }else{
            variantTitleElement ? (variantTitleElement.innerText = variantTitle) : null;
        }
        
    }

    // initialize tool tip
    const  initStockToolTip = () => {
        const itemStockToolTipSelector = document.querySelector(`#ProductStock-${sectionId} .ship-tooltip`) || '';
         // tool tip
            itemStockToolTipSelector ? (
                $(itemStockToolTipSelector).tipr()
            ) : null;

    }

    const checkStockAvailability = (selectedVariant) => {

        if(!selectedVariant) return;

        
        // change sku
        changeSku(selectedVariant?.sku);
        // change title
        changeVariantTitle(selectedVariant.options[0]);
        /*
            if inventory less than 0 AND incoming is TRUE then will not ship until { next_incoming_date }
            else Will be in Stock After { next_incoming_date }
            No tooltip text for this condition 
        */ 
        (selectedVariant?.inventory_quantity < 0 && selectedVariant?.incoming) ? (
            itemStockSelector.innerHTML = `Will not ship until ${selectedVariant?.next_incoming_date}`,
            availabilityAltSelector ? (
                availabilityAltSelector.innerText = ""
            ) : null
        ) : (
            itemStockSelector.innerHTML = `Will be in Stock After ${selectedVariant?.next_incoming_date}`,
            availabilityAltSelector ? (
                availabilityAltSelector.innerText = ""
            ) : null
        );

        /*
            if inventory is 0 then
        */ 
            (selectedVariant?.inventory_quantity === 0 || selectedVariant?.inventory_quantity < 0) ?
            (
                itemStockSelector.innerHTML = `<span class="inStockMsg">discontinued <i class="ship-tooltip fas fa-question-circle"></i></span>`,
                availabilityAltSelector ? (
                    availabilityAltSelector.innerText = "This Product has been discontinued."
                ) : null,
                itemStockSelector?.querySelector(".ship-tooltip")?.setAttribute("data-tip", availabilityAltSelector?.innerText)
            ) : null; 

        /*
            if inventory between 1 and 1000 then
        */ 
        (selectedVariant?.inventory_quantity > 0 && selectedVariant?.inventory_quantity <= 1000) ?
        (
            itemStockSelector.innerHTML = `<span class="inStockMsg">back-ordered <i class="ship-tooltip fas fa-question-circle"></i></span>`,
            availabilityAltSelector ? (
                availabilityAltSelector.innerText = "We don’t have a definitive shipping date from the manufacturer. Orders will be filled in the order they were placed. We’ll keep you updated via email once the order is placed."
            ) : null,
            itemStockSelector?.querySelector(".ship-tooltip")?.setAttribute("data-tip", availabilityAltSelector?.innerText)
        ) : null; 
        
        /*
            if inventory between 1001 and 5000 then
        */ 
        (selectedVariant?.inventory_quantity > 1000 && selectedVariant?.inventory_quantity <= 5000) ?
        (
            itemStockSelector.innerHTML = `<span class="inStockMsg">Ships within 7 to 10 Days <i class="ship-tooltip fas fa-question-circle"></i></span>`,
            availabilityAltSelector ? (
                availabilityAltSelector.innerText = "Shipping information is provided by the manufacturer."
            ) : null,
            itemStockSelector?.querySelector(".ship-tooltip")?.setAttribute("data-tip", availabilityAltSelector?.innerText)
        ) : null;
        
        /*
            if inventory greater than 5000 then
        */ 
        (selectedVariant?.inventory_quantity > 5000 ) ?
        (
            itemStockSelector.innerHTML = `<span class="inStockMsg">IN STOCK <i class="ship-tooltip fas fa-question-circle"></i></span>`,
            availabilityAltSelector ? (
                availabilityAltSelector.innerText = "Product will be shipped within one business day. For quick delivery choose an expedited shipping service at checkout."
            ) : null,
            itemStockSelector?.querySelector(".ship-tooltip")?.setAttribute("data-tip", availabilityAltSelector?.innerText)
        ) : null;


    }

    const getVisibleImgThumbnails = () => {
        return document.querySelectorAll(".gallery__thumbnails .gallery__thumbnail:not(.hide)") ? Array.prototype.slice.call(document.querySelectorAll(".gallery__thumbnails .gallery__thumbnail:not(.hide)")) : [];
    }
    const getVisibleImgs = () => {
        return document.querySelectorAll(".slider--product .slide--product:not(.hide)") ? Array.prototype.slice.call(document.querySelectorAll(".slider--product .slide--product:not(.hide)")) : [];
    }
    const showSingleVariantImage = (variantOptionTitle = "") => {
        // show default image
        if(getVisibleImgThumbnails().length === 0 && getVisibleImgs().length === 0){
            let _optName = variantOptionTitle.split(" / ").join("#");
            if(document.querySelector(`.slider--product .slide--product[data-variants*="${_optName}"][data-img-alt="${window.NEW_RX_PDP_TEMPLATE.current_product.title}"]`)){
                document.querySelector(`.slider--product .slide--product[data-variants*="${_optName}"][data-img-alt="${window.NEW_RX_PDP_TEMPLATE.current_product.title}"]`).classList.remove('hide');
                document.getElementById("rx-new__thumb-img-container") ? (
                    document.getElementById("rx-new__thumb-img-container").classList.add("hide"),
                    document.getElementById("rx-new__main-img-container").classList.add("rx-new__thumb-img-hide"),
                    document.querySelector(".rx-new__magic-360") && document.querySelector(".rx-new__magic-360").classList.add("hide")
                ) : undefined;
            }
        }else{
            document.getElementById("rx-new__thumb-img-container") ? (
                document.getElementById("rx-new__thumb-img-container").classList.remove("hide"),
                document.getElementById("rx-new__main-img-container").classList.remove("rx-new__thumb-img-hide"),
                document.querySelector(".rx-new__magic-360") && document.querySelector(".rx-new__magic-360").classList.remove("hide")
            ) : undefined;
        }
        
    }
    const makeFirstVisibleThumbActive = () => {
        let productThumbnails = document.querySelectorAll(".gallery__thumbnails .gallery__thumbnail:not(.hide)") ? Array.prototype.slice.call(document.querySelectorAll(".gallery__thumbnails .gallery__thumbnail:not(.hide)")) : undefined;
        
        if(productThumbnails){
            for (let index = 0; index < productThumbnails.length; index++) {
                let productThumbnail = productThumbnails[index];
                if(index === 0){
                    productThumbnail.classList.add("bstrSlider__thumb--active");
                    productThumbnail.dispatchEvent(new Event("click"));
                    window.NEW_RX_PDP_TEMPLATE.currentSlide = Number(productThumbnail.getAttribute("data-bstr-slider-thumb")) || window.NEW_RX_PDP_TEMPLATE.currentSlide;
                    toggleNextPrevState();
                }else{
                    productThumbnail.classList.remove("bstrSlider__thumb--active");
                }
            }            
        } 
    };

    const productThumbSlider = (variantOptionTitle = "") => {
        if(Object.keys(BoosterTheme.swatches.current).length > 0){
            let currentVariantTitle = BoosterTheme.swatches.current[window.NEW_RX_PDP_TEMPLATE.current_product.id][0] || variantOptionTitle;
            let productThumbnails = document.querySelectorAll(".gallery__thumbnails .gallery__thumbnail") ? Array.prototype.slice.call(document.querySelectorAll(".gallery__thumbnails .gallery__thumbnail")) : undefined;
            
            if(productThumbnails){
                for (let index = 0; index < productThumbnails.length; index++) {
                    let productThumbnail = productThumbnails[index];
                    productThumbnail.classList.remove("bstrSlider__thumb--active");
                    productThumbnail.classList.remove("hide");
                    if(currentVariantTitle !== ""){
                        productThumbnail.getAttribute("data-img-alt") !== currentVariantTitle ? (
                            productThumbnail.classList.add("hide")
                        ) : (
                            productThumbnail.classList.remove("hide")
                        );
                    }
                    productThumbnail.addEventListener("click", () => {
                        window.dispatchEvent(new CustomEvent("bstrSlider:thumb:click",{detail:{trigger:true}}));
                    });
                }           
                makeFirstVisibleThumbActive(); 
            }
        }
    }
    const productSlider = (variantOptionTitle = "") => {
        if(Object.keys(BoosterTheme.swatches.current).length > 0){
            document.getElementById("rx-new__main-img-container") ? (
                document.getElementById("rx-new__main-img-container").classList.add("hide")
            ) : undefined;
            let currentVariantTitle = BoosterTheme.swatches.current[window.NEW_RX_PDP_TEMPLATE.current_product.id][0];
            let productImages = document.querySelectorAll(".slider--product .slide--product") ? Array.prototype.slice.call(document.querySelectorAll(".slider--product .slide--product")) : undefined;
            if(productImages){
                for (let index = 0; index < productImages.length; index++) {
                    let productImage = productImages[index];
                    productImage.setAttribute("data-bstr-slide", "");
                    productImage.classList.remove("hide");
                    if(currentVariantTitle !== ""){
                        productImage.getAttribute("data-img-alt") !== currentVariantTitle ? (
                            productImage.classList.add("hide")
                        ) : (
                            productImage.classList.remove("hide"),
                            productImage.setAttribute("data-bstr-slide", "active")
                        );
                    }
                }
            }
            document.getElementById("rx-new__main-img-container") ? (
                document.getElementById("rx-new__main-img-container").classList.remove("hide")
            ) : undefined;
        }
    }

    window.NEW_RX_PDP_TEMPLATE.handleNextSlide = () => {
        const visibleSlides = document.querySelectorAll('.gallery__thumbnails .gallery__thumbnail');
        const numberOfSlides = visibleSlides.length;
        let currentSlide = window.NEW_RX_PDP_TEMPLATE.currentSlide;

        currentSlide++;

        if(!document.querySelector(`[data-bstr-slider-thumb="${currentSlide}"]`)){
            currentSlide = window.NEW_RX_PDP_TEMPLATE.currentSlide
        }
        
        if(currentSlide > (numberOfSlides -1)){
            currentSlide = window.NEW_RX_PDP_TEMPLATE.currentSlide;
        }
        let visibleThumbnails = getVisibleImgThumbnails();
        let lastVisibleThumbnailIndex = visibleThumbnails[visibleThumbnails.length - 1] ? Number(visibleThumbnails[visibleThumbnails.length - 1].getAttribute("data-bstr-slider-thumb")) : window.NEW_RX_PDP_TEMPLATE.currentSlide;
        if(currentSlide > lastVisibleThumbnailIndex){
            currentSlide = lastVisibleThumbnailIndex;
        }
        
        
        BoosterTheme.defaultSlider._moveTo({index:currentSlide,slider:document.querySelector('[data-rx-main-img-slider]')});
        window.NEW_RX_PDP_TEMPLATE.currentSlide = currentSlide;
        if($(window).width()>767){
            // console.log("here");
        }else{
            let scrollAmount = 0;
            let slideTimer = setInterval(function(){
                document.querySelector('#rx-new__thumb-img-container .gallery__thumbnails').scrollLeft += 20;
                scrollAmount += 25;
                if(scrollAmount >= 100){
                    window.clearInterval(slideTimer);
                }
            }, 25);
        }
        toggleNextPrevState();
        // zoom
        // toggleZoom(true);
    }

    window.NEW_RX_PDP_TEMPLATE.handlePrevSlide = () => {
        let visibleThumbnails = getVisibleImgThumbnails();
        let firstVisibleThumbnailIndex = visibleThumbnails.length > 0 ? Number(visibleThumbnails[0].getAttribute("data-bstr-slider-thumb")) : window.NEW_RX_PDP_TEMPLATE.currentSlide;
        let currentSlide = window.NEW_RX_PDP_TEMPLATE.currentSlide;

        currentSlide--;

        if(!document.querySelector(`[data-bstr-slider-thumb="${currentSlide}"]`)){
            currentSlide = window.NEW_RX_PDP_TEMPLATE.currentSlide
        }

        if(currentSlide < Number(firstVisibleThumbnailIndex)){
            currentSlide = firstVisibleThumbnailIndex;
        }
        document.querySelector('[data-rx-main-img-slider]') && document.querySelector('[data-rx-main-img-slider]').setAttribute("data-bstr-slider-current",currentSlide);
        BoosterTheme.defaultSlider._moveTo({index:currentSlide,slider:document.querySelector('[data-rx-main-img-slider]')});
        window.NEW_RX_PDP_TEMPLATE.currentSlide = currentSlide;
        if($(window).width()>767){
            console.log("here");
        }else{
            let scrollAmount = 0;
            let slideTimer = setInterval(function(){
                document.querySelector('#rx-new__thumb-img-container .gallery__thumbnails').scrollLeft -= 20;
                scrollAmount += 25;
                if(scrollAmount >= 100){
                    window.clearInterval(slideTimer);
                }
            }, 25);
        }
        toggleNextPrevState();
        
    }

    const toggleNextPrevState = () => {
        document.querySelector("[data-rx-thumb-prev") ? (
            document.querySelector("[data-rx-thumb-prev").classList.remove("img_nav_disabled")
        ): undefined;
        document.querySelector("[data-rx-thumb-next") ? (
            document.querySelector("[data-rx-thumb-next").classList.remove("img_nav_disabled")
        ): undefined;

        let visibleThumbnails = getVisibleImgThumbnails();
        let firstVisibleThumbnailIndex = visibleThumbnails.length > 0 ? Number(visibleThumbnails[0].getAttribute("data-bstr-slider-thumb")) : 0;
        let lastVisibleThumbnailIndex = visibleThumbnails[visibleThumbnails.length - 1] ? Number(visibleThumbnails[visibleThumbnails.length - 1].getAttribute("data-bstr-slider-thumb")) : 0;
        if(Number(window.NEW_RX_PDP_TEMPLATE.currentSlide) === firstVisibleThumbnailIndex){
            document.querySelector("[data-rx-thumb-prev") ? (
                document.querySelector("[data-rx-thumb-prev").classList.add("img_nav_disabled")
            ): undefined;
        }else if(Number(window.NEW_RX_PDP_TEMPLATE.currentSlide) === lastVisibleThumbnailIndex){
            document.querySelector("[data-rx-thumb-next") ? (
                document.querySelector("[data-rx-thumb-next").classList.add("img_nav_disabled")
            ): undefined;
        }
        
    }

    const showSelectedVariantColorDetails = () => {
        let selectedVariant = window.NEW_RX_PDP_TEMPLATE.selected_variant;
        let colorDetails = document.querySelectorAll('[data-desc-color-tab-opt]') && Array.prototype.slice.call(document.querySelectorAll('[data-desc-color-tab-opt]')) || [];
        if(colorDetails.length > 0){
            for (let index = 0; index < colorDetails.length; index++) {
                let colorDetail = colorDetails[index];
                colorDetail.style.display = "none";
            }
        }

        document.querySelectorAll(`[data-desc-color-tab-opt][data-id="${selectedVariant}"]`) ? (
            document.querySelectorAll(`[data-desc-color-tab-opt][data-id="${selectedVariant}"]`).forEach(element => {
                element.removeAttribute("style");
            })
        ) : undefined;
    }

    const showSelectedVariantSizeDetails = () => {
        let selectedVariant = window.NEW_RX_PDP_TEMPLATE.selected_variant;
        let sizeDetails = document.querySelectorAll('[data-desc-size-tab-opt]') && Array.prototype.slice.call(document.querySelectorAll('[data-desc-size-tab-opt]')) || [];
        if(sizeDetails.length > 0){
            for (let index = 0; index < sizeDetails.length; index++) {
                let sizeDetail = sizeDetails[index];
                sizeDetail.style.display = "none";
            }
        }

        document.querySelectorAll(`[data-desc-size-tab-opt][data-id="${selectedVariant}"]`) ? (
            document.querySelectorAll(`[data-desc-size-tab-opt][data-id="${selectedVariant}"]`).forEach(element => {
                element.removeAttribute("style");
            })
        ) : undefined;
    }

    const customOfferStrikePrice = (selectedVariant) => {
        
        // strike price
        let strikeProductVariants = window.STRIKE_PRICE_OFF.productVariants || [];
        let currentVariantStrike = strikeProductVariants.filter(productVariantStrike => Number(productVariantStrike.variant_id) === Number(selectedVariant.id)) || [];                    
        if(currentVariantStrike.length > 0){
            let _variantSrike = currentVariantStrike[0];
            if(Number(_variantSrike.save_percentage) > 0) {
                window.STRIKE_PRICE_OFF.setSaveText(_variantSrike.save_percentage);
            }
        }
        
    // custom offer
        let productVariants = window.CUSTOM_OFFER.productVariants || [];
        let currentVariant = productVariants.filter(productVariant => Number(productVariant.variant_id) === Number(selectedVariant.id)) || [];
        
        if(currentVariant.length > 0){
            window.CUSTOM_OFFER.hideChildNodesPriceWrapper();
            let _variant = currentVariant[0];
            if(_variant.custom_offer === "MAP"){
                window.CUSTOM_OFFER.showHideCustomOfferText("show");
                // strike price
                window.STRIKE_PRICE_OFF.hideStrikePriceSaveText();
                return;        
            }
        }
        
        window.CUSTOM_OFFER.showPriceElement("show");
        window.CUSTOM_OFFER.showHideCustomOfferText("hide");

        // strike price
        if(currentVariantStrike.length > 0){
            let _variantSrike = currentVariantStrike[0];
            if(Number(_variantSrike.save_percentage) === 0) {
                window.STRIKE_PRICE_OFF.hideStrikePriceSaveText();
                return;        
            }
        }
        
        window.STRIKE_PRICE_OFF.showSaveText();
        window.STRIKE_PRICE_OFF.showStrikePrice();
        window.STRIKE_PRICE_OFF.hideSaveText();
        window.STRIKE_PRICE_OFF.hideStrikePrice();
    }

    // events
    const makeSelectedVariantImgeActive = (selectedEel = undefined) => {
        let variantImgSwatches = document.querySelectorAll('[data-variant-img-swatch]') && Array.prototype.slice.call(document.querySelectorAll('[data-variant-img-swatch]')) || [];
        variantImgSwatches.length > 0 && variantImgSwatches.map((variantImgSwatch,index) => {
            selectedEel !== variantImgSwatch.parentNode ? variantImgSwatch.parentNode.classList.remove("swatch--active") : undefined;
        });
        if(selectedEel){
            selectedEel.classList.contains("rx-new__swatch-image") ? (
                selectedEel.classList.add("swatch--active")
            ) : (
                selectedEel.parentNode.classList.add("swatch--active")
            )
        }
        
    }
    const variantImgSwatchEventListener = () => {
        let variantImgSwatches = document.querySelectorAll('[data-variant-img-swatch]') && Array.prototype.slice.call(document.querySelectorAll('[data-variant-img-swatch]')) || [];
        variantImgSwatches.length > 0 && variantImgSwatches.map((variantImgSwatch,index) => {
            variantImgSwatch.addEventListener("click", (event)=> {
                let _variantOpts = event.target.getAttribute("data-var") && event.target.getAttribute("data-var").split("~") || [];
                let _variantProduct = event.target.getAttribute("data-product") && event.target.getAttribute("data-product") || "";
                if(_variantOpts.length > 0){
                    for (let index = 0; index < _variantOpts.length; index++) {
                        const _variantOpt = _variantOpts[index];
                        BoosterTheme.swatches.setOption(_variantProduct,index,_variantOpt);
                    }
                }
                makeSelectedVariantImgeActive(event.target.parentNode);
            })
        });
    }

    const hideMagic360 = () => {
        let _360Containers = document.getElementsByClassName("Magic360") && Array.prototype.slice.call(document.getElementsByClassName("Magic360")) || [];        
        if(_360Containers.length > 0){
            for (let index = 0; index < _360Containers.length; index++) {
                let _360Container = _360Containers[index];
                _360Container.classList.add("hide");
                _360Container.parentNode && _360Container.parentNode.classList.add("hide");
            }
        }
        let magicElements = document.getElementsByClassName("rx-new__magic-360") && Array.prototype.slice.call(document.getElementsByClassName("rx-new__magic-360")) || [];
        if(magicElements.length > 0){
            for (let index = 0; index < magicElements.length; index++) {
                let magicElement = magicElements[index];
                magicElement.classList.remove("hide")
            }
        }
        document.getElementById("rx-new__main-img-container") ? (
            document.getElementById("rx-new__main-img-container").classList.contains("hide") ? document.getElementById("rx-new__main-img-container").classList.remove("hide") : null
        ) : undefined;
        let rxImageSlider = document.querySelector('[data-rx-main-img-slider]');
        rxImageSlider && rxImageSlider.classList.remove("hide");
        
    }
    
    const magic360Events = () => {

        let magicElements = document.getElementsByClassName("rx-new__magic-360") && Array.prototype.slice.call(document.getElementsByClassName("rx-new__magic-360")) || [];
        if(magicElements.length > 0){
            for (let index = 0; index < magicElements.length; index++) {
                let magicElement = magicElements[index];
                magicElement.addEventListener("click", (event) => {
                    let _360Id = event.target.getAttribute("data-id") && event.target.getAttribute("data-id") || "";
                    let rxImageSlider = document.querySelector('[data-rx-main-img-slider]');
                    hideMagic360();
                    let _360Container = document.getElementById(_360Id);
                    _360Container && (
                        _360Container.classList.remove("hide"),
                        _360Container.parentNode && _360Container.parentNode.classList.remove("hide"),
                        rxImageSlider && rxImageSlider.classList.add("hide"),
                        magicElement.classList.add("hide")
                    )
                });
            }
        }
    }


    const stickyBarEvents = () => {
        window.addEventListener('scroll', function(e) {
            let scrollTop = window.scrollY;    
            if(scrollTop > 300){
                document.querySelector("body").classList.add("active-scroll");
            }else{
                document.querySelector("body").classList.remove("active-scroll");
            }
        });
    }


    const setStickyBarProductImage = (variantImg) => {
        let stickyVariantImg = document.querySelector('[data-sticky-img]');
        stickyVariantImg && (
            stickyVariantImg.setAttribute("src",variantImg)
        )
    }

    const removeCheckedFromRadios = (excludeRadioSelector = null) => {
        let radios = document.querySelectorAll('[data-accordion-handle]') && Array.prototype.slice.call(document.querySelectorAll('[data-accordion-handle]')) || [];
        radios.length > 0 && radios.map((radio,index) => {
            if(excludeRadioSelector !== radio){
                radio.checked = false;
            }
        });
    }

    const reviewEvents = () => {
        let reviewBadge = document.querySelector('.jdgm-widget.jdgm-preview-badge');
        if(reviewBadge){
            reviewBadge.addEventListener("click", () => {
                if($(window).width()>767){
                    let ratingTab = document.querySelector('[data-tab-handle="ratings-reviews"]');
                    ratingTab && (
                        ratingTab.dispatchEvent(new Event("click"))
                    );
                }else{
                    let ratingAccordion = document.querySelector('[data-accordion-handle="ratings-reviews"]');
                    if(ratingAccordion && ratingAccordion.checked === false){
                        setTimeout(() => {
                            if(ratingAccordion && ratingAccordion.checked === false){
                                let _wasChecked = ratingAccordion.getAttribute('data-was-checked') && (ratingAccordion.getAttribute('data-was-checked') === "true" ? true : false) || false;
                                if(_wasChecked === true){
                                    ratingAccordion.checked = false;
                                    ratingAccordion.setAttribute('data-was-checked',false);
                                }else{
                                    ratingAccordion.checked = true,
                                    ratingAccordion.setAttribute('data-was-checked',true);
                                }
                                removeCheckedFromRadios(ratingAccordion);
                            }
                        }, 500);
                    }
                }
                
            });
        }
    }

   
    const accordionEvents = () => {
        let accordions = document.querySelectorAll('[data-accordion-handle]') && Array.prototype.slice.call(document.querySelectorAll('[data-accordion-handle]')) || [];
        if(accordions.length > 0){
            for (let index = 0; index < accordions.length; index++) {
                let accordion = accordions[index];
                accordion.addEventListener("change", (event) => {
                    document.querySelector('.rx-new__accordion.accordion:nth-child(1)').scrollIntoView({ 
                        behavior: 'smooth' 
                    });
                });
                accordion.addEventListener("click", (event) => {
                    let _wasChecked = event.target.getAttribute('data-was-checked') && (event.target.getAttribute('data-was-checked') === "true" ? true : false) || false;
                    if(_wasChecked === true){
                        event.target.checked = false;
                        event.target.setAttribute('data-was-checked',false);
                    }else{
                        event.target.setAttribute('data-was-checked',true);
                    }
                    removeCheckedFromRadios(event.target);
                });
            }
        }
    }

    window.addEventListener("booster:price:update", () => {
        let selectedVariant = {
            id:window.NEW_RX_PDP_TEMPLATE.selected_variant
        };
        customOfferStrikePrice(selectedVariant);
    });

    window.addEventListener("booster:variant:select", () => {

        let selectedVariant = event?.detail?.selectedVariant;
        
        setStickyBarProductImage(selectedVariant.variant_sticky_img);
        
        window.BACKORDER_PDP.toggleATCButton(selectedVariant.id);

        // toggleGallerySkleton(true);
        document.querySelector(".slider--product").setAttribute("style", "opacity:0.3;pointer-events:none;");

        
        document.querySelector(`[data-variant-img-swatch] img[data-varid="${selectedVariant.id}"]`) ? 
        (
            makeSelectedVariantImgeActive(document.querySelector(`[data-variant-img-swatch] img[data-varid="${selectedVariant.id}"]`).parentNode)
        ) : (
            makeSelectedVariantImgeActive()
        );
        
        window.NEW_RX_PDP_TEMPLATE.selected_variant = selectedVariant.id;

         // change stock availability
        checkStockAvailability(selectedVariant);
        initStockToolTip();
        setTimeout(() => {
                productSlider();
                productThumbSlider();
                showSingleVariantImage(selectedVariant.options[0]);
                document.querySelector(".slider--product").removeAttribute("style");
        }, 100);
    
        customOfferStrikePrice(selectedVariant);
        showSelectedVariantColorDetails();
        showSelectedVariantSizeDetails();
        
        
        // window.triggerSwymVariantEvent && window.triggerSwymVariantEvent(selectedVariant.id);
        // window._swat.initializeActionButtons(".swym-wishlist-button-bar");
        // setTimeout(() => {
        //     toggleGallerySkleton(false);
        // }, 1500);
        // update 360 id
        let _360Id = document.querySelector(".rx-new__magic-360");
        _360Id && (
            _360Id.setAttribute("data-id", selectedVariant.options[0]),
            _360Id.querySelector("img") && _360Id.querySelector("img").setAttribute("data-id", selectedVariant.options[0])
        );
        hideMagic360();
    });

    
    window.addEventListener("bstrSlider:thumb:click", () => {
        setTimeout(() => {
            hideMagic360(); 
        }, 200);
    });

    BoosterTheme.ELEMENTS.togglePDPTab = (event, tabId) => {
        BoosterTheme.ELEMENTS.toggleTab(event, tabId);
        let tabContainer = document.querySelector(`#${tabId}.product--tab__content`);
        tabContainer && tabContainer.querySelector('iframe') && (
            tabContainer.querySelector('iframe').src = tabContainer.querySelector('iframe').dataset.sourceUrl
        ) 
    }
    
   
    const onPDPLoad = () => {
        let selectedVariant = {
            id:window.NEW_RX_PDP_TEMPLATE.selected_variant
        };
        customOfferStrikePrice(selectedVariant);
        window.BACKORDER_PDP.toggleATCButton(selectedVariant.id);
        showSelectedVariantColorDetails();
        showSelectedVariantSizeDetails();
        variantImgSwatchEventListener();
        productSwatchSlider();
        californiaWarningPopup();
        magic360Events();
        stickyBarEvents();
        reviewEvents();
        accordionEvents();
        document.addEventListener('keydown', function(e) {
            if (e.keyCode == 27) {
                window.NEW_RX_PDP_TEMPLATE.sizeGuidePopUp(false);
            }
        }); 
    }

    // initializing 
    togglePlaceHolders(false);
    toggleRxNewHiddenElement(true);
    toggleVariantImageSwatchSkleton(true);
    toggleGallerySkleton(true);
    prescriptionEventListener();
    productSlider();
    productThumbSlider();
    showSingleVariantImage(window.NEW_RX_PDP_TEMPLATE.current_variant.title);
    // tool tip
    initStockToolTip();
    // zoom
    zoomImage();
    onPDPLoad();

    setTimeout(() => {
        toggleRxNewHiddenElement(false);
        toggleGallerySkleton(false);
        toggleVariantImageSwatchSkleton(false);
        togglePlaceHolders(true);
    }, 1000);
});

let spanIntervalPDP = setInterval(function(){
	if(BoosterTheme){    
		clearInterval(spanIntervalPDP);
		pdpNew();
	}
}, 1000);