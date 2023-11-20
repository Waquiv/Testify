const iframe= document.querySelector("iframe");

const clicky=document.querySelector(".clicky");
console.log(clicky)

const arr=['21O0XXPEWPtePt5RMY93Ob', '1EO9dn7V0ufwPHJngZThO5', '5FVd6KXrgO9B3JPmC8OPst', '2DlHlPMa4M17kufBvI2lEN', '4fXGWiVhlOLdhwRDP6pIFG', '3DjYU54tU6YCEy822r8TcY']

clicky.addEventListener('click', function(){
    let rand=Math.floor(Math.random() * 7)
    //console.log(rand)
    iframe.src=`https://open.spotify.com/embed/track/${arr[rand]}?utm_source=generator`
})
//Code to display normal spotify embed without controls


//plays the uri track in the "embed-iframe div"
window.onSpotifyIframeApiReady=(IFrameAPI)=>{
    console.log('Spotify Iframe API loaded');

    const element = document.getElementById("embed-iframe");
    console.log(element);

    const options = {
        uri: 'spotify:track:3vkCueOmm7xQDoJ17W1Pm3'
    };
    console.log(options)

    const callback = (EmbedController)=>{};

    IFrameAPI.createController(element, options, callback);
}

