const video = document.querySelector('#video')
const main = document.querySelector('.face-show')

//change the height and width of the video using video.height/widght.
//get the height and width of the container using
//const computedWidth = window.getComputedStyle(myDiv).getPropertyValue('width');


//promise to check all models have been succesfully loaded.starts video when loaded
Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('./models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('/models')
]).then(startVideo)

//function to start video
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

//function that draws canvas on top of teh video element. called when video is played
video.addEventListener('play', (event)=>{

    //creates a canvas for drawing face recognition
    const canvas = faceapi.createCanvasFromMedia(video)
    //attach canvas to the container
    main.append(canvas)
    //take a variabel displaysize as an object with the width and height of video
    const displaySize = { width: video.width, height: video.height }
    //have faceapi make the canvas based on the displaysize object
    faceapi.matchDimensions(canvas, displaySize)

    //async function that is called every 100ms and draws landmarks, expressions and detections everytime called
    setInterval(async () => {
        //stores detections in a variable and logs the variable to the console
        const detections = await faceapi.detectAllFaces(video,
            new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
            console.log(detections);
            //resize the detections to draw on canvas
            const resizedDetections = faceapi.resizeResults(detections, displaySize)

            //clears the canvas before drawing next time
            canvas.getContext('2d').clearRect(0,0, canvas.width, canvas.height)
            //draws the result on canvs
            faceapi.draw.drawDetections(canvas, resizedDetections)
            faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
            faceapi.draw.drawFaceExpressions(canvas, resizedDetections)  
    }, 100)
})