(function( $, undefined ) {

$.widget('silexlabs.pageable', {
	version: '1.0.0',
	options: {
		defaultPage:"home",
        useDeeplink:true
	},
    currentPage: '',
	// _setOption is called for each individual option that is changing
	_setOption: function( key, value ) {
		this.options[key] = value;
        switch (key) {
            case 'useDeeplink':
                this._destroy();
                this._create();
                break;
        }
	},
	_create: function() {
		console.log("_create ");
        if(this.useDeeplink){
            $(window).bind( 'hashchange', this.updatePage);
        }
        else{
            var that=this;
            this.element.find('a').each(function(){
                $(this).bind('click', function(event){
                    event.preventDefault();
                    console.log($(this).attr('href'));
                    that.currentPage = $(this).attr('href');
                    that.updatePage();
                });
            });
        }
        this.updatePage();
	},
	_destroy: function() {
		console.log("_destroy ");
        if(this.useDeeplink){
            $(window).unbind( 'hashchange', this.updatePage);
        }
        else{
            this.element.find('a').each(function(){
                $(this).unbind('click');
            });
        }
	},
    updatePage: function (event){
        if(this.useDeeplink){
            this.currentPage = window.location.hash;
        }
        if (this.currentPage=='') this.currentPage = this.options.defaultPage;
        else if (this.currentPage.charAt(0)=='#') this.currentPage = this.currentPage.substr(1);
        console.log(this.currentPage);

        $('#current-page-style').remove();
        $('head').append('<style id="current-page-style">.'+this.currentPage+'{display:inherit;}</style>');
    }
});
})(jQuery);