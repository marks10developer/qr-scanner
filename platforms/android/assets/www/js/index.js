/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    default_no_items_text : 'No History Items',
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
          window.plugins.flashlight.switchOff(this.exitApp, this.exitApp);
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
        
        app.displayHistoryItems();
        $('a#scan').on('click',function(e){
            var history_items = (window.localStorage.getItem("history_items") != null) ? JSON.parse(window.localStorage.getItem("history_items")) : new Array;
            e.preventDefault(); 
            cordova.plugins.barcodeScanner.scan(
                function (result) {
                    if (!result.cancelled) { 
                        if (app.isValidURL(result.text)) {
                            alert('Found URL: ' + result.text) ;
                            cordova.InAppBrowser.open(result.text, '_system', 'location=yes'); 
                        }else{
                            alert('Found code: ' + result.text) ;
                        }
                        history_items.push(result.text);  
                        window.localStorage.setItem("history_items", JSON.stringify(history_items));
                    }
                    app.displayHistoryItems();
                }, 
                function (error) {
                    alert("Scanning failed: " + error);
                }
            );
        }); 
    },
    
    clearHistoryItems: function(){
        window.localStorage.clear();
        $('div.history-list .items').html('<div class="no-border">'+ app.default_no_items_text +'</div>');
        $('div.history-list #clear-all').css('visibility','hidden');
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
                        html_result += '<div><a href="#" onclick="cordova.InAppBrowser.open(\''+history_items[i]+'\', \'_system\', \'location=yes\')">'+history_items[i]+'</a></div>';
                    }else{
                        html_result += '<div>'+history_items[i]+'</div>';
                    } 
                }
                $('div.history-list #clear-all').css('visibility','visible');
            }else{
                html_result += '<div class="no-border">'+ app.default_no_items_text +'</div>';
                $('div.history-list #clear-all').css('visibility','hidden');
            }
    
            $('div.history-list .items').html(html_result);    
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

