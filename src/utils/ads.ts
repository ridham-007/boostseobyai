export const info = {
    RESPONSIVE_ADS_1: {
        DOCUMENT_HEADER_SCRIPT: `
        window.googletag = window.googletag || { cmd: [] };
  
        googletag.cmd.push(() => {
          // Define the ad slot.
          googletag
            .defineSlot('/22751551271,22987481872/All_Ad_Units/aquarius/aquarius-pts_web_aitexthumanize_mainsite_display1', [[300, 250], [250, 250], [336, 280]], 'div-gpt-ad-1718965729627-0')
            .addService(googletag.pubads());
  
          // Disable initial load.
          // This prevents GPT from automatically fetching ads when display is called.
          googletag.pubads().enableSingleRequest();
          googletag.enableServices();
        });
        `,
        id: `div-gpt-ad-1718965729627-0`,
        width: 250,
        height: 250
    },
    RESPONSIVE_ADS_2: {
        DOCUMENT_HEADER_SCRIPT: `
          window.googletag = window.googletag || { cmd: [] };
    
          googletag.cmd.push(() => {
            // Define the ad slot.
            googletag
              .defineSlot('/22751551271,22987481872/All_Ad_Units/aquarius/aquarius-pts_web_aitexthumanize_mainsite_display2', [[250, 250], [336, 280], [300, 250]], 'div-gpt-ad-1718965733244-0')
              .addService(googletag.pubads());
    
            // Disable initial load.
            // This prevents GPT from automatically fetching ads when display is called.
            googletag.pubads().enableSingleRequest();
            googletag.enableServices();
          });
        `,
        id: `div-gpt-ad-1718965733244-0`,
        width: 250,
        height: 250
    },
    RESPONSIVE_ADS_3: {
        DOCUMENT_HEADER_SCRIPT: `
          window.googletag = window.googletag || { cmd: [] };
    
          googletag.cmd.push(() => {
            // Define the ad slot.
            googletag
              .defineSlot('/22751551271,22987481872/All_Ad_Units/aquarius/aquarius-pts_web_aitexthumanize_mainsite_display3', [[250, 250], [300, 250], [336, 280]], 'div-gpt-ad-1718965736416-0')
              .addService(googletag.pubads());
    
            // Disable initial load.
            // This prevents GPT from automatically fetching ads when display is called.
            googletag.pubads().enableSingleRequest();
            googletag.enableServices();
          });
        `,
        id: `div-gpt-ad-1718965736416-0`,
        width: 250,
        height: 250
    },
    RESPONSIVE_ADS_4: {
        DOCUMENT_HEADER_SCRIPT: `
          window.googletag = window.googletag || { cmd: [] };
      
          googletag.cmd.push(() => {
            // Define the ad slot.
            googletag
              .defineSlot('/22751551271,22987481872/All_Ad_Units/aquarius/aquarius-pts_web_aitexthumanize_mainsite_display4', [[336, 280], [250, 250], [300, 250]], 'div-gpt-ad-1718965741231-0')
              .addService(googletag.pubads());
    
            // Disable initial load.
            // This prevents GPT from automatically fetching ads when display is called.
            googletag.pubads().enableSingleRequest();
            googletag.enableServices();
          });
        `,
        id: `div-gpt-ad-1718965741231-0`,
        width: 250,
        height: 250
    },
    RESPONSIVE_ADS_5: {
        DOCUMENT_HEADER_SCRIPT: `
          window.googletag = window.googletag || { cmd: [] };
      
          googletag.cmd.push(() => {
            // Define the ad slot.
            googletag
              .defineSlot('/22751551271,22987481872/All_Ad_Units/aquarius/aquarius-pts_web_aitexthumanize_mainsite_display5', [[300, 100], [300, 50], [320, 100], [320, 50]], 'div-gpt-ad-1718965744542-0')
              .addService(googletag.pubads());
    
            // Disable initial load.
            // This prevents GPT from automatically fetching ads when display is called.
            googletag.pubads().enableSingleRequest();
            googletag.enableServices();
          });
        `,
        id: `div-gpt-ad-1718965744542-0`,
        width: 320,
        height: 100
    },
    RESPONSIVE_ADS_6: {
        DOCUMENT_HEADER_SCRIPT: `
          window.googletag = window.googletag || { cmd: [] };
        
          googletag.cmd.push(() => {
            // Define the ad slot.
            googletag
              .defineSlot('/22751551271,22987481872/All_Ad_Units/aquarius/aquarius-pts_web_aitexthumanize_mainsite_display6', [[300, 600], [320, 480]], 'div-gpt-ad-1718965748656-0')
              .addService(googletag.pubads());
    
            // Disable initial load.
            // This prevents GPT from automatically fetching ads when display is called.
            googletag.pubads().enableSingleRequest();
            googletag.enableServices();
          });
        `,
        id: `div-gpt-ad-1718965748656-0`,
        width: 320,
        height: 480
    },
    RESPONSIVE_ADS_7: {
      DOCUMENT_HEADER_SCRIPT: `
        window.googletag = window.googletag || { cmd: [] };
          
        googletag.cmd.push(() => {
          // Define the ad slot.
          googletag
            .defineSlot('/22751551271,22987481872/All_Ad_Units/aquarius/aquarius-pts_web_aitexthumanize_mainsite_display7', [[300, 75], [300, 50], [300, 100], [320, 100], [320, 50]], 'div-gpt-ad-1719213433783-0')
            .addService(googletag.pubads());

          // Disable initial load.
          // This prevents GPT from automatically fetching ads when display is called.
          googletag.pubads().enableSingleRequest();
          // googletag.pubads().disableInitialLoad();
          googletag.enableServices();
        });
      `,
      id: `div-gpt-ad-1719213433783-0`,
      width: 300,
      height: 50
  }
}