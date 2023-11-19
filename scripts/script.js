/*const p1=document.querySelector('.main');
console.log(`teh mainis ${p1}`)

const flag=false;

const np=document.querySelector('.next-page')
const dp=document.querySelector('.loaded-page')

np.appendChild(p1)

const main = document.querySelector('.loading')
console.log(main)

main.addEventListener("animationend", (event) => {
    console.log('the animation ended', event);
    main.remove()
    main.classList.remove('animate')
    dp.appendChild(main)
})*/

// Get the video element
const video = document.getElementById('video');

function startVideo(){
    // Request access to the user's camera
    navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
    // Set the video stream as the source for the video element
    video.srcObject = stream;
    })
    .catch(error => {
    console.error('Error accessing the camera:', error);
    });
}

startVideo()
