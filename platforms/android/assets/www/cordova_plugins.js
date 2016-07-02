cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-admobpro/www/AdMob.js",
        "id": "cordova-plugin-admobpro.AdMob",
        "clobbers": [
            "window.AdMob"
        ]
    },
    {
        "file": "plugins/cordova-plugin-device/www/device.js",
        "id": "cordova-plugin-device.device",
        "clobbers": [
            "device"
        ]
    },
    {
        "file": "plugins/cordova-plugin-inappbrowser/www/inappbrowser.js",
        "id": "cordova-plugin-inappbrowser.inappbrowser",
        "clobbers": [
            "cordova.InAppBrowser.open",
            "window.open"
        ]
    },
    {
        "file": "plugins/cordova-plugin-network-information/www/network.js",
        "id": "cordova-plugin-network-information.network",
        "clobbers": [
            "navigator.connection",
            "navigator.network.connection"
        ]
    },
    {
        "file": "plugins/cordova-plugin-network-information/www/Connection.js",
        "id": "cordova-plugin-network-information.Connection",
        "clobbers": [
            "Connection"
        ]
    },
    {
        "file": "plugins/cordova-plugin-whitelist/whitelist.js",
        "id": "cordova-plugin-whitelist.whitelist",
        "runs": true
    },
    {
        "file": "plugins/org.solderzzc.base64imagesaverplugin/www/Base64ImageSaverPlugin.js",
        "id": "org.solderzzc.base64imagesaverplugin.Base64ImageSaverPlugin",
        "clobbers": [
            "window.Base64ImageSaverPlugin"
        ]
    },
    {
        "file": "plugins/phonegap-plugin-barcodescanner/www/barcodescanner.js",
        "id": "phonegap-plugin-barcodescanner.BarcodeScanner",
        "clobbers": [
            "cordova.plugins.barcodeScanner"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-extension": "1.3.0",
    "cordova-plugin-admobpro": "2.13.0",
    "cordova-plugin-device": "1.1.1",
    "cordova-plugin-inappbrowser": "1.3.1-dev",
    "cordova-plugin-network-information": "1.2.0",
    "cordova-plugin-whitelist": "1.2.1",
    "org.solderzzc.base64imagesaverplugin": "0.6.0",
    "cordova-plugin-compat": "1.0.0",
    "phonegap-plugin-barcodescanner": "5.0.1"
};
// BOTTOM OF METADATA
});