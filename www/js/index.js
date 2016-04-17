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
        document.addEventListener('backbutton', function() {
          // pass exitApp as callbacks to the switchOff method 
        }, false);

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
        appAds.init();  
    },
    
    clearHistoryItems: function(){
        window.localStorage.clear(); 
        $('div[data-page="history"] div.history-items').html('<div class="no-border">'+ app.default_no_items_text +'</div>');
        $('a.delete').addClass('hidden');
    },
    
    displayHistoryItems: function(){
        try{
           
            var history_items = JSON.parse(window.localStorage.getItem("history_items"));
            var html_result = '';
            //console.log('history_items ' + history_items);
            if (history_items != null) {
                history_items.reverse();
                for(var i=0; i < history_items.length; i++){
                    if (app.isValidURL(history_items[i])) {
                     
                        html_result += '<li><a href="#" class="item-link" onclick="cordova.InAppBrowser.open(\''+history_items[i]+'\', \'_system\', \'location=yes\')">';
                          html_result += '<div class="item-content">';
                            html_result += '<div class="item-media"><i class="fa fa-asterisk"></i></div>';
                            html_result += '<div class="item-inner">';
                              html_result += '<div class="item-title">'+history_items[i]+'</div>';
                            html_result += '</div>';
                          html_result += '</div>';
                        html_result += '</a></li>';
                        
                    }else{
                        html_result += '<li><a href="#" class="item-link">';
                          html_result += '<div class="item-content">';
                            html_result += '<div class="item-media"><i class="fa fa-asterisk"></i></div>';
                            html_result += '<div class="item-inner">';
                              html_result += '<div class="item-title">'+history_items[i]+'</div>';
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
    
    onResume: function(){
        //app.toggleFlash(false);    
    },
    
    onPause: function(){
        
    },
    
     
    isValidURL: function(str) {
        var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
        if(!regex .test(str)) { 
          return false;
        } else {
          return true;
        }
    },
    
    exitApp: function() {
      navigator.app.exitApp();
    }
};


 
 
