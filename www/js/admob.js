appAds = {
  getConfig: function(){
    var admobid = {};
    if( /(android)/i.test(navigator.userAgent) ) { // for android & amazon-fireos
        admobid = {
            banner: 'ca-app-pub-3889892187391344/3136636914', // or DFP format "/6253334/dfp_example_ad"
            interstitial: 'ca-app-pub-3889892187391344/4613370110'
        };
    } else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) { // for ios
        admobid = {
            banner: 'ca-app-pub-3889892187391344/3136636914', // or DFP format "/6253334/dfp_example_ad"
            interstitial: 'ca-app-pub-3889892187391344/4613370110'
        };
    } else { // for windows phone
        admobid = {
            banner: 'ca-app-pub-3889892187391344/3136636914', // or DFP format "/6253334/dfp_example_ad"
            interstitial: 'ca-app-pub-3889892187391344/4613370110'
        };
    }
    return admobid;
  },

  
  initBanner: function(){
    if(AdMob){
      AdMob.createBanner({
        adId: appAds.getConfig().banner, 
        position: AdMob.AD_POSITION.BOTTOM_CENTER, 
        autoShow: true
      }); 
    }
  },

  initInterstitial: function(){
    if(AdMob){  
      AdMob.prepareInterstitial({
        adId: appAds.getConfig().interstitial,
        autoShow: false
      });
    }
  },
  
  loadInterstitial: function(){
    if(AdMob){
      AdMob.showInterstitial();
    }
  }
  
}