const iframe= document.querySelector("iframe");

const clicky=document.querySelector(".cicky");
console.log(clicky)

const arr=['21O0XXPEWPtePt5RMY93Ob', '1EO9dn7V0ufwPHJngZThO5', '5FVd6KXrgO9B3JPmC8OPst', '2DlHlPMa4M17kufBvI2lEN', '4fXGWiVhlOLdhwRDP6pIFG', '3DjYU54tU6YCEy822r8TcY']

clicky.addEventListener('click', function(){
    let rand=Math.floor(Math.random() * 7)
    //console.log(rand)
    iframe.src=`https://open.spotify.com/embed/track/${arr[rand]}?utm_source=generator`
})