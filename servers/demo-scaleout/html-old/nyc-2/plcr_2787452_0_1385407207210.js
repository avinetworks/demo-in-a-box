(function() {
  var creativeDefinition = {
    customScriptUrl: '',
    isDynamic: false,
    delayedImpression: false,
    standardEventIds: {
      DISPLAY_TIMER: '2',
      INTERACTION_TIMER: '3',
      INTERACTIVE_IMPRESSION: '4',
      FULL_SCREEN_VIDEO_PLAYS: '5',
      FULL_SCREEN_VIDEO_COMPLETES: '6',
      FULL_SCREEN_AVERAGE_VIEW_TIME: '7',
      MANUAL_CLOSE: '8',
      BACKUP_IMAGE_IMPRESSION: '9',
      EXPAND_TIMER: '10',
      VIDEO_PLAY: '11',
      VIDEO_VIEW_TIMER: '12',
      VIDEO_COMPLETE: '13',
      VIDEO_INTERACTION: '14',
      VIDEO_PAUSE: '15',
      VIDEO_MUTE: '16',
      VIDEO_REPLAY: '17',
      VIDEO_MIDPOINT: '18',
      FULL_SCREEN_VIDEO: '19',
      VIDEO_STOP: '20',
      VIDEO_UNMUTE: '21',
      FULL_SCREEN: '22',
      DYNAMIC_CREATIVE_IMPRESSION: '23',
      HTML5_CREATIVE_IMPRESSION: '25'
    },
    exitEvents: [
      {
        name: 'Background Exit',
        reportingId: '1362927',
        url: 'http://analytics.bluekai.com/site/15991?phint\x3devent%3Dclick\x26phint\x3daid%3D%eadv!\x26phint\x3dpid%3D%epid!\x26phint\x3dcid%3D%ebuy!\x26phint\x3dcrid%3D%ecid!\x26done\x3dhttps%3A%2F%2Fexplore.t-mobile.com%2Fipad-air%3F%26csdids%3D%25epid!_%25eaid!_%25ecid!_%25eadv!%26cm_mmc_o%3DKbl5kzYCjCVAygtzlwCjChSjbVzp-byjpbTbfzkjlfzfbgCjChSjbVzp-byjpbTbfzkjlfzfbg%26cm_mmca1%3D%26cm_mmca2%3D%26cm_mmca3%3D%26cm_mmca4%3D',
        targetWindow: '_blank',
        windowProperties: ''
      }
    ],
    timerEvents: [
    ],
    counterEvents: [
    ],
    childFiles: [
      {
        name: 'cta.gif',
        url: '/ads/richmedia/studio/pv2/26234590/20131122100344009/cta.gif',
        isVideo: false
      },
      {
        name: 'ip5.jpg',
        url: '/ads/richmedia/studio/pv2/26234590/20131122100344009/ip5.jpg',
        isVideo: false
      },
      {
        name: 'legal.gif',
        url: '/ads/richmedia/studio/pv2/26234590/20131122100344009/legal.gif',
        isVideo: false
      },
      {
        name: 'logo.gif',
        url: '/ads/richmedia/studio/pv2/26234590/20131122100344009/logo.gif',
        isVideo: false
      },
      {
        name: 'tagline1.gif',
        url: '/ads/richmedia/studio/pv2/26234590/20131122100344009/tagline1.gif',
        isVideo: false
      },
      {
        name: 'tagline2.gif',
        url: '/ads/richmedia/studio/pv2/26234590/20131122100344009/tagline2.gif',
        isVideo: false
      },
      {
        name: 'tagline3.gif',
        url: '/ads/richmedia/studio/pv2/26234590/20131122100344009/tagline3.gif',
        isVideo: false
      },
      {
        name: '728x90_ipad.jpg',
        url: '/ads/richmedia/studio/pv2/26234590/20131122100344009/728x90_ipad.jpg',
        isVideo: false
      },
      {
        name: 'ad.js',
        url: '/ads/richmedia/studio/pv2/26234590/20131122100344009/ad.js',
        isVideo: false
      },
      {
        name: 'ad.css',
        url: '/ads/richmedia/studio/pv2/26234590/20131122100344009/ad.css',
        isVideo: false
      }
    ],
    videoFiles: [
    ],
    videoEntries: [
    ],
    primaryAssets: [
      {
        id: '26414231',
        artworkType: 'HTML5',
        displayType: 'BANNER',
        width: '728',
        height: '90',
        servingPath: '/ads/richmedia/studio/pv2/26234590/20131122100344009/index.html',
        zIndex: '1000000',
        customCss: '',
        flashArtworkTypeData: null,
        htmlArtworkTypeData: {
          isTransparent: false,
          sdkVersion: '01_31' // Duplicating sdk version in subsequent field as version format not the same.
        },
        floatingDisplayTypeData: null,
        expandingDisplayTypeData: null,
        pageSettings:null,
        layoutsConfig: null
      }
    ]
  }
  var rendererDisplayType = '';
  rendererDisplayType += 'html_';
  var rendererFormat = 'inpage';
  var rendererName = rendererDisplayType + rendererFormat;

  var creativeId = '1385407207133';
  var adId = '0';
  var templateVersion = '200_32';
  var studioObjects = window['studioV2'] = window['studioV2'] || {};
  var creativeObjects = studioObjects['creatives'] = studioObjects['creatives'] || {};
  var creativeKey = [creativeId, adId].join('_');
  var creative = creativeObjects[creativeKey] = creativeObjects[creativeKey] || {};
  creative['creativeDefinition'] = creativeDefinition;
  var adResponses = creative['adResponses'] || [];
  for (var i = 0; i < adResponses.length; i++) {
    adResponses[i].creativeDto && adResponses[i].creativeDto.csiEvents &&
        (adResponses[i].creativeDto.csiEvents['pe'] =
            adResponses[i].creativeDto.csiEvents['pe'] || (+new Date));
  }
  var loadedLibraries = studioObjects['loadedLibraries'] = studioObjects['loadedLibraries'] || {};
  var versionedLibrary = loadedLibraries[templateVersion] = loadedLibraries[templateVersion] || {};
  var typedLibrary = versionedLibrary[rendererName] = versionedLibrary[rendererName] || {};
  if (typedLibrary['bootstrap']) {
    typedLibrary.bootstrap();
  }
})();
