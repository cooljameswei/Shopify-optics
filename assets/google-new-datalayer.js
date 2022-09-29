(() => {
    this.gaTrackNewEvent = (event,arguments) => {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            event:event,
            ...arguments
        });
    }

    this.gaViewItemList = (category,sortBy,category_id,data) => {
        let arguments = {};
        arguments["ecommerce"] = {};
        arguments["ecommerce"]["items"] = [];
        for (let index = 0; index < data.length; index++) {
            let item = data[index];
            let variants = item.variants.map((variant) => {
                return variant.title;
            });
            let variantsQuantity = item.variants.map((variant) => {
                return variant.inventory_quantity;
            });
            let totalQty = variantsQuantity.reduce((total,quantity) => {
                return Number(total)+Number(quantity);
            });
            arguments["ecommerce"]["items"].push({
                item_name: item.title,
                item_id: item.id,
                price: item.price_min,
                item_brand: item.vendor,
                item_category: category,
                item_variant: variants.join(","),
                item_list_name: `sort by :${sortBy}`,
                item_list_id: category_id,
                index:(Number(index)+1),
                quantity:1
            });
        }
        this.gaTrackNewEvent("view_item_list",arguments);
    }

    this.gaSelectItem = (category,sortBy,category_id,title,id,price_min,vendor,variants,totalQty, index) => {
        let arguments = {};
        arguments["ecommerce"] = {};
        arguments["ecommerce"]["items"] = [];
        arguments["ecommerce"]["items"].push({
            item_name: title,
            item_id: id,
            price: price_min,
            item_brand: vendor,
            item_category: category,
            item_variant: variants,
            item_list_name: `sort by :${sortBy}`,
            item_list_id: category_id,
            index: index,
            quantity:1
        });
        this.gaTrackNewEvent("select_item",arguments);
    }

    this.gaViewItem = (item_name,item_id,price,item_brand,item_category,item_variant,quantity) => {
        let arguments = {};
        arguments["ecommerce"] = {};
        arguments["ecommerce"]["items"] = [];
        arguments["ecommerce"]["items"].push({
            item_name: item_name,
            item_id: item_id,
            price: price,
            item_brand: item_brand,
            item_category: item_category,
            item_variant: item_variant,
            quantity:quantity
        });
        this.gaTrackNewEvent("view_item",arguments);
    }

    this.gaAddToCart = (item_name,item_id,price,item_brand,item_category,item_variant,quantity) => {
        let arguments = {};
        arguments["ecommerce"] = {};
        arguments["ecommerce"]["items"] = [];
        arguments["ecommerce"]["items"].push({
            item_name: item_name,
            item_id: item_id,
            price: price,
            item_brand: item_brand,
            item_category: item_category,
            item_variant: item_variant,
            quantity:quantity
        });
        this.gaTrackNewEvent("add_to_cart",arguments);
    }

    this.gaAddToWishList = (item_name,item_id,price,item_brand,item_category,item_variant,quantity) => {
        let arguments = {};
        arguments["ecommerce"] = {};
        arguments["ecommerce"]["items"] = [];
        arguments["ecommerce"]["items"].push({
            item_name: item_name,
            item_id: item_id,
            price: price,
            item_brand: item_brand,
            item_category: item_category,
            item_variant: item_variant,
            quantity:quantity
        });
        this.gaTrackNewEvent("add_to_wishlist",arguments);
    }

    this.gaViewCart = (data) => {
        let arguments = {};
        arguments["ecommerce"] = {};
        arguments["ecommerce"]["items"] = [];
        for (let index = 0; index < data.length; index++) {
            let item = data[index];
            arguments["ecommerce"]["items"].push({
                item_name: item.product_title,
                item_id: item.product_id,
                price: Number(item.price/100),
                item_brand: item.vendor,
                item_category: item.product_type,
                item_variant: item.variant_title,
                quantity:item.quantity
            });
        }
        this.gaTrackNewEvent("view_cart",arguments);
    }

    this.gaRemoveCart = (data) => {
        let arguments = {};
        arguments["ecommerce"] = {};
        arguments["ecommerce"]["items"] = [];
        for (let index = 0; index < data.length; index++) {
            let item = data[index];
            arguments["ecommerce"]["items"].push({
                item_name: item.product_title,
                item_id: item.product_id,
                price: (Number(item.price)/100),
                item_brand: item.vendor,
                item_category: item.product_type,
                item_variant: (item.variant_title == "Default Title" ? item.sku : item.variant_title ),
                quantity:item.quantity
            });
        }
        this.gaTrackNewEvent("remove_from_cart",arguments);
    }

    this.gaBeginCheckout = (data) => {
        let arguments = {};
        arguments["ecommerce"] = {};
        arguments["ecommerce"]["items"] = [];
        for (let index = 0; index < data.length; index++) {
            let item = data[index];
            arguments["ecommerce"]["items"].push({
                item_name: item.product_title,
                item_id: item.product_id,
                price: (Number(item.price)/100),
                item_brand: item.vendor,
                item_category: item.product_type,
                item_variant: item.variant_title,
                quantity:item.quantity
            });
        }
        this.gaTrackNewEvent("begin_checkout",arguments);
    }

    this.gaAddShippingInfo = (data, shipping_tier) => {
        let arguments = {};
        arguments["ecommerce"] = {shipping_tier:shipping_tier};
        arguments["ecommerce"]["items"] = [];
        for (let index = 0; index < data.length; index++) {
            let item = data[index];
            arguments["ecommerce"]["items"].push({
                item_name: item.product_title,
                item_id: item.product_id,
                price: (Number(item.price)/100),
                item_brand: item.vendor,
                item_category: item.product_type,
                item_variant: item.variant_title,
                quantity:item.quantity
            });
        }
        this.gaTrackNewEvent("add_shipping_info",arguments);
    }

    this.gaAddPaymentInfo = (data,payment_type) => {
        let arguments = {};
        arguments["ecommerce"] = {payment_type:payment_type};
        arguments["ecommerce"]["items"] = [];
        for (let index = 0; index < data.length; index++) {
            let item = data[index];
            arguments["ecommerce"]["items"].push({
                item_name: item.product_title,
                item_id: item.product_id,
                price: (Number(item.price)/100),
                item_brand: item.vendor,
                item_category: item.product_type,
                item_variant: item.variant_title,
                quantity:item.quantity
            });
        }
        this.gaTrackNewEvent("add_payment_info",arguments);
    }

    this.gaPurchase = (data, order_info) => {
        let arguments = {};
        arguments["ecommerce"] = {...order_info};
        arguments["ecommerce"]["items"] = [];
        for (let index = 0; index < data.length; index++) {
            let item = data[index];
            arguments["ecommerce"]["items"].push({
                item_name: item.product_title,
                item_id: item.product_id,
                price: (Number(item.price)/100),
                item_brand: item.vendor,
                item_category: item.product_type,
                item_variant: item.variant_title,
                quantity:item.quantity
            });
        }
        this.gaTrackNewEvent("purchase",arguments);
    }
    
})();