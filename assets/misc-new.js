(() => {
    
    const sectionId = window.MISC_TEMPLATE?.config?.sectionId;
    const availabilityAltSelector =  document.getElementById(`availability_alt`) || '';
    const itemStockSelector = document.getElementById(`ProductStock-${sectionId}`) || '';
    const itemStockToolTipSelector = document.querySelector(`#ProductStock-${sectionId} .ship-tooltip`) || '';
    const itemSkuSelector = document.querySelector(`#ProductSku-${sectionId} span`) || '';
    
    // change sku
    const changeSku = (sku) => {    
        itemSkuSelector ? (itemSkuSelector.innerText = sku) : null;
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


    // tool tip
    initStockToolTip();

    // variant change event
    window.addEventListener("booster:variant:select", () => {
        let selectedVariant = event?.detail?.selectedVariant;
        // change stock availability
        checkStockAvailability(selectedVariant);
        initStockToolTip();
    });

})(window.MISC_TEMPLATE);