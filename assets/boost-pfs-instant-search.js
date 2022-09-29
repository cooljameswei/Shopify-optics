// Override Settings
var boostPFSInstantSearchConfig = {
	search: {
		//suggestionMode: 'test',
		//suggestionPosition: 'left'
	}
};


(function() {
	let spanInterval = setInterval(function(){
		if(window.BoostPFS){    
			clearInterval(spanInterval);
			BoostPFS.inject(this);
			// Customize style of Suggestion box
			SearchInput.prototype.customizeInstantSearch = function() {
				var suggestionElement = this.$uiMenuElement;
				var searchElement = this.$element;
				var searchBoxId = this.id;
			};
		}
	}, 1000);	
})();