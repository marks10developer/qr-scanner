appAds = {
  getConfig: function(){
    var admobid = {};
    if( /(android)/i.test(navigator.userAgent) ) { // for android & amazon-fireos
        admobid = {
            banner: 'ca-app-pub-2311167355411174/7999016440', // or DFP format "/6253334/dfp_example_ad"
            interstitial: 'ca-app-pub-2311167355411174/1952482840'
        };
    } else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) { // for ios
        admobid = {
            banner: 'ca-app-pub-2311167355411174/7999016440', // or DFP format "/6253334/dfp_example_ad"
            interstitial: 'ca-app-pub-2311167355411174/1952482840'
        };
    } else { // for windows phone
        admobid = {
            banner: 'ca-app-pub-2311167355411174/7999016440', // or DFP format "/6253334/dfp_example_ad"
            interstitial: 'ca-app-pub-2311167355411174/1952482840'
        };
    }
    return admobid;
  },

  
  init: function(){
    if(AdMob){
      AdMob.createBanner({
        adId: appAds.getConfig().banner, 
        position: AdMob.AD_POSITION.BOTTOM_CENTER, 
        autoShow: true
      });
      
      AdMob.prepareInterstitial({
        adId: appAds.getConfig().interstitial,
        autoShow:false
      });
    }
  },
  
  loadInterstitial: function(){
    if(AdMob){
      AdMob.showInterstitial();
    }
  }
  
}