
const arr=['21O0XXPEWPtePt5RMY93Ob', '1EO9dn7V0ufwPHJngZThO5', '5FVd6KXrgO9B3JPmC8OPst', '2DlHlPMa4M17kufBvI2lEN', '4fXGWiVhlOLdhwRDP6pIFG', '3DjYU54tU6YCEy822r8TcY']

window.onSpotifyIframeApiReady = (IFrameAPI) => {
    const element = document.getElementById('embed-iframe');
    const options = {
        width: '100%',
        height: '100%',
        uri: `spotify:track:${arr[Math.floor(Math.random() * 7)]}`
      };
      
    const callback = (EmbedController) => {};
    IFrameAPI.createController(element, options, callback);
  };

