var fw7 = new Framework7({
    modalTitle: 'Framework7', 
    material: true,
});
// Export selectors engine
var $$ = Dom7;

// Page Init history page
$$(document).on('pageInit', '.page[data-page="history"]', function (e) {
    app.displayHistoryItems();
    // Clear all history
    $$('.delete').on('click',function(){
        fw7.confirm('','Delete all history?', function(){
            // OK
            app.clearHistoryItems();
        }, function(){
            // Cancel    
        });    
    });
});

// Page Init generate code page
$$(document).on('pageInit', '.page[data-page="generate"]', function (e) {
    window.Base64ImageSaverPlugin.requestPermission();
    appAds.initInterstitial(); 
    $('#generate-code').click(function(){       
        $('#code-save').addClass('display-none');
        $('.image-saved').addClass('display-none');
        if( $('input#qr-text').val().trim().length == 0 ) {  
            fw7.alert('Text cannot be empty.', '<i class="fa fa-warning"></i> Warning');
        }
        /* else if( !app.isValidURL($('input#qr-text').val()) && !app.isAlphaNumeric($('input#qr-text').val())){
            fw7.alert('<ul><li>Letters and numbers are only allowed.</li><li>Remove any spaces and special characters.</li><li>Add "http://" or "https://" if it\'s a URL.</li></ul>', '<i class="fa fa-warning"></i> Warning');
        }*/
        else{
            
            if(navigator.onLine){
                $('.generate-result').html('<span class="progressbar-infinite color-multi"></span>');
                $.ajax({
                    'url' : 'http://api.experia-industries.com/qr.php',
                    'data' : {
                        'chs' : '180x180',
                        'cht' : 'qr',
                        'chl' : encodeURI($('input#qr-text').val().trim()),
                        'choe' : 'UTF-8',
                        'chld' : 'L|1'
                    },
                    'contentType': "image/png",
                    'type' : 'GET',
                    'timeout' : 35000
                }).done(function(response, textStatus, jqXHR) { 
                    
                    $('.generate-result').html('<img src="'+response+'" width="140" />');
                    $('#code-save').removeClass('display-none');
                    $('#code-save').on('click', function(){ 
                        $(this).addClass('display-none');
                        //$('.image-saved').addClass('display-none');
                        window.Base64ImageSaverPlugin.saveImageDataToLibrary(
                            function(msg){ 
                                //fw7.alert('Image has been saved to Photo Gallery', '<i class="fa fa-check-circle"></i> Hooray!'); 
                                appAds.loadInterstitial(); 
                                $('.image-saved').removeClass('display-none');
                                
                            },
                            function(err){ 
                                fw7.alert(err,'<i class="fa fa-times-circle"></i> Error');
                            },
                            response
                        );
                    });
                    
                }).fail(function(e) {
                    if (e.statusText == 'timeout') {
                       fw7.alert('Unable to generate code.', '<i class="fa fa-times-circle"></i> Slow Connection');
                    }
                });
            }else{
                fw7.alert('Please connect to the internet.', '<i class="fa fa-times-circle"></i> Connection Error');
            }
            
        } 
    });

});

// Start scanning code
$$('a#scan').on('click', function(){
    var history_items = (window.localStorage.getItem("history_items") != null) ? JSON.parse(window.localStorage.getItem("history_items")) : new Array;
        
    cordova.plugins.barcodeScanner.scan(
        function (result) {
            if (!result.cancelled) { 
                if (app.isValidURL(result.text)) { 
                    fw7.alert(result.text, 'URL found', function(){
                        cordova.InAppBrowser.open(result.text, '_system', 'location=yes');
                    }); 
                }else{
                    fw7.alert(result.text, 'Code found');
                }
                history_items.push(result.text);  
                window.localStorage.setItem("history_items", JSON.stringify(history_items));
            } 
        }, 
        function (error) {
            fw7.alert(error, "Scanning failed");
        }
    );
});

// Add main view
var mainView = fw7.addView('.view-main', {});


var app = {
    default_no_items_text : 'No Items',
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener('pause', this.onPause, false);
        document.addEventListener('resume', this.onResume, false);

    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        $('.app').show();
        new FastClick(document.body); 
        appAds.initBanner(); 
    },
    
    clearHistoryItems: function(){
        window.localStorage.clear(); 
        $('div[data-page="history"] div.history-items').html('<div class="no-border">'+ app.default_no_items_text +'</div>');
        $('a.delete').addClass('hidden');
    },
    
    displayHistoryItems: function(){
        try{
            /* var ff=new Array('asdasdas','http://facebook.com','asdasdas2');
            window.localStorage.setItem("history_items", JSON.stringify(ff));*/
            
            var history_items = JSON.parse(window.localStorage.getItem("history_items"));
            var html_result = '';
            //console.log('history_items ' + history_items);
            if (history_items != null) {
                history_items.reverse();
                for(var i=0; i < history_items.length; i++){
                    if (app.isValidURL(history_items[i])) {
                     
                        html_result += '<li><a href="#" class="item-link" onclick="cordova.InAppBrowser.open(\''+history_items[i]+'\', \'_system\', \'location=yes\')">';
                          html_result += '<div class="item-content">';
                            html_result += '<div class="item-media"><i class="fa fa-globe"></i></div>';
                            html_result += '<div class="item-inner">';
                              html_result += '<div class="item-title">'+history_items[i]+'</div>';
                              html_result += '<div class="item-after"></div>';
                            html_result += '</div>';
                          html_result += '</div>';
                        html_result += '</a></li>';
                        
                    }else{
                        html_result += '<li><a href="#" class="item-link">';
                          html_result += '<div class="item-content">';
                            html_result += '<div class="item-media"><i class="fa fa-font"></i></div>';
                            html_result += '<div class="item-inner">';
                              html_result += '<div class="item-title">'+history_items[i]+'</div>';
                              html_result += '<div class="item-after" onclick="app.onHistoryItemCopy(\''+history_items[i]+'\');"><i class="fa fa-copy"></i>&nbsp;Copy</div>'; 
                            html_result += '</div>';
                          html_result += '</div>';
                        html_result += '</a></li>';
                    } 
                } 
                html_result = '<ul>' +html_result+ '</ul>';
                $('a.delete').removeClass('hidden');
            }else{
                html_result += '<div class="text-center">'+ app.default_no_items_text +'</div>';
                $('a.delete').addClass('hidden');
            }
            $('div[data-page="history"] div.history-items').html(html_result);



        }catch(e){
            console.log('Err: ' + e);
        }
    },
    
    onResume: function(){ },
    
    onPause: function(){ },
    
    onHistoryItemCopy: function(txt){
        fw7.alert('&quot;<b>' + txt + '</b>&quot; has now been copied to clipboard', '<i class="fa fa-check-circle"></i> Clipboard');
        cordova.plugins.clipboard.copy(txt);
    },
     
    isValidURL: function(str) {
        var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
        if(!regex .test(str)) { 
          return false;
        } else {
          return true;
        }
    },
    
    
    isAlphaNumeric: function(e) {
        var regExp = /^[A-Za-z0-9]+$/;
        return (e.match(regExp));
    }
};



 