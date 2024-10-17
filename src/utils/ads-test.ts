export const infoTest = {
  RESPONSIVE_ADS_1: {
      DOCUMENT_HEADER_SCRIPT: `
      window.googletag = window.googletag || { cmd: [] };

      googletag.cmd.push(() => {
        // Define the ad slot.
        googletag
          .defineSlot("/6355419/Travel", [728, 90], "div-for-slot")
          .setTargeting("test", "event")
          .addService(googletag.pubads());

        // Disable initial load.
        // This prevents GPT from automatically fetching ads when display is called.
        googletag.pubads().enableSingleRequest();
        googletag.enableServices();
      });
      `,
      id: `div-for-slot`,
      width: 250,
      height: 250
  },
  RESPONSIVE_ADS_2: {
      DOCUMENT_HEADER_SCRIPT: `
      window.googletag = window.googletag || { cmd: [] };

      googletag.cmd.push(() => {
        // Define the ad slot.
        googletag
          .defineSlot("/6355419/Travel", [728, 90], "div-for-slot1")
          .setTargeting("test", "event")
          .addService(googletag.pubads());

        // Disable initial load.
        // This prevents GPT from automatically fetching ads when display is called.
        googletag.pubads().enableSingleRequest();
        googletag.enableServices();
      });
      `,
      id: `div-for-slot1`,
      width: 250,
      height: 250
  },
  RESPONSIVE_ADS_3: {
      DOCUMENT_HEADER_SCRIPT: `
      window.googletag = window.googletag || { cmd: [] };

      googletag.cmd.push(() => {
        // Define the ad slot.
        googletag
          .defineSlot("/6355419/Travel", [728, 90], "div-for-slot2")
          .setTargeting("test", "event")
          .addService(googletag.pubads());

        // Disable initial load.
        // This prevents GPT from automatically fetching ads when display is called.
        googletag.pubads().enableSingleRequest();
        googletag.enableServices();
      });
      `,
      id: `div-for-slot2`,
      width: 250,
      height: 250
  },
  RESPONSIVE_ADS_4: {
      DOCUMENT_HEADER_SCRIPT: `
      window.googletag = window.googletag || { cmd: [] };

      googletag.cmd.push(() => {
        // Define the ad slot.
        googletag
          .defineSlot("/6355419/Travel", [728, 90], "div-for-slot3")
          .setTargeting("test", "event")
          .addService(googletag.pubads());

        // Disable initial load.
        // This prevents GPT from automatically fetching ads when display is called.
        googletag.pubads().enableSingleRequest();
        googletag.enableServices();
      });
      `,
      id: `div-for-slot3`,
      width: 250,
      height: 250
  },
  RESPONSIVE_ADS_5: {
      DOCUMENT_HEADER_SCRIPT: `
      window.googletag = window.googletag || { cmd: [] };

      googletag.cmd.push(() => {
        // Define the ad slot.
        googletag
          .defineSlot("/6355419/Travel", [728, 90], "div-for-slot4")
          .setTargeting("test", "event")
          .addService(googletag.pubads());

        // Disable initial load.
        // This prevents GPT from automatically fetching ads when display is called.
        googletag.pubads().enableSingleRequest();
        googletag.enableServices();
      });
      `,
      id: `div-for-slot4`,
      width: 320,
      height: 100
  },
  RESPONSIVE_ADS_6: {
      DOCUMENT_HEADER_SCRIPT: `
      window.googletag = window.googletag || { cmd: [] };

      googletag.cmd.push(() => {
        // Define the ad slot.
        googletag
          .defineSlot("/6355419/Travel", [728, 90], "div-for-slot5")
          .setTargeting("test", "event")
          .addService(googletag.pubads());

        // Disable initial load.
        // This prevents GPT from automatically fetching ads when display is called.
        googletag.pubads().enableSingleRequest();
        googletag.enableServices();
      });
      `,
      id: `div-for-slot5`,
      width: 320,
      height: 480
  },
  RESPONSIVE_ADS_7: {
    DOCUMENT_HEADER_SCRIPT: `
    window.googletag = window.googletag || { cmd: [] };

      googletag.cmd.push(() => {
        // Define the ad slot.
        googletag
          .defineSlot("/6355419/Travel", [728, 90], "div-for-slot6")
          .setTargeting("test", "event")
          .addService(googletag.pubads());

        // Disable initial load.
        // This prevents GPT from automatically fetching ads when display is called.
        googletag.pubads().enableSingleRequest();
        googletag.enableServices();
      });
    `,
    id: `div-for-slot6`,
    width: 300,
    height: 50
}
}