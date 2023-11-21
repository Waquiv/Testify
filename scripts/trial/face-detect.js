
//change the height and width of the video using video.height/widght.
//get the height and width of the container using
//const computedWidth = window.getComputedStyle(myDiv).getPropertyValue('width');

// Function to set video dimensions
function setVideoSize() {
    video.width = containerWidth // Set video width to container width
    console.log(video.width)
    video.height = containerHeight // Set video width to container width
    console.log(video.height)
  
  }
  
  // Call setVideoSize when the window is resized
  window.addEventListener('resize', setVideoSize);
  
  // Set initial size when the page loads
  setVideoSize();


//promise to check all models have been succesfully loaded.starts video when loaded


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

function getVideoAspectRatio() {
    const videoWidth = video.videoWidth;
    const videoHeight = video.videoHeight;
    console.log(videoHeight)

    // Calculate the aspect ratio
    const aspectRatio = videoWidth / videoHeight;

    return aspectRatio;
}

//function that draws canvas on top of teh video element. called when video is played
video.addEventListener('play', (event)=>{

    //creates a canvas for drawing face recognition
    canvas = faceapi.createCanvasFromMedia(video)
    //attach canvas to the container
    main.append(canvas)
    //take a variabel displaysize as an object with the width and height of video
    displaySize = { width: containerHeight*getVideoAspectRatio(), height: containerHeight }
    //have faceapi make the canvas based on the displaysize object
    faceapi.matchDimensions(canvas, displaySize)
    canvas.style.left=`-${(canvas.width-containerWidth)/2}px`
    
})

function stopVideo() {
    const stream = video.srcObject;
    const tracks = stream.getTracks();
  
    tracks.forEach(track => track.stop());
    video.srcObject = null;
  }



button.onclick= (event) =>{
    if(!isShutter){
        button.innerText="";
        button.classList.add("button-click");
        const tag = document.querySelector('.tagline-box');
        tag.classList.add('tagline-fadeout')
        console.log(tag.classList);
        startVideo();
        isShutter=true;
    }
    else{
        console.log('inside else');
        // stopVideo();
        // clearInterval(inter);

        

        //async function that is called every 100ms and draws landmarks, expressions and detections everytime called
        inter = setInterval(async () => {
            //stores detections in a variable and logs the variable to the console
            // clearInterval(inter)
            const detections = await faceapi.detectAllFaces(video,
                new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
                console.log(JSON.stringify(detections[0]['expressions']));
                handleExpressionDetection(detections[0]['expressions']);
                //resize the detections to draw on canvas
                const resizedDetections = faceapi.resizeResults(detections, displaySize)
    
                //clears the canvas before drawing next time
                canvas.getContext('2d').clearRect(0,0, canvas.width, canvas.height)
                //draws the result on canvs
                faceapi.draw.drawDetections(canvas, resizedDetections)
                faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
                faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
        }, 100)

    }
}

function handleExpressionDetection(expression) {
    if (expressionsArray.length < maxExpressionCount) {
      expressionsArray.push(expression);
      console.log(`Expression "${expression}" added to the array.`);
    } else {
      console.log('Maximum expressions reached (20).');
      // If you want to stop storing expressions after reaching 20, you can add logic here
      clearInterval(inter);
      canvas.getContext('2d').clearRect(0,0, canvas.width, canvas.height);
      stopVideo();
      const sec2 = document.getElementById('p2');
      setTimeout(()=>{
        // Scroll the page to the second section smoothly
        sec2.scrollIntoView({ behavior: 'smooth' });
        // location.reload();




        // window.onSpotifyIframeApiReady=(IFrameAPI)=>{
        //     console.log('Spotify Iframe API loaded');
        
        //     const element = document.getElementById("embed-iframe");
        //     console.log(element);
        
        //     const options = {
        //         uri: 'spotify:track:3vkCueOmm7xQDoJ17W1Pm3'
        //     };
        //     console.log(options)
        
        //     const callback = (EmbedController)=>{};
        
        //     IFrameAPI.createController(element, options, callback);
        // }








        setInterval(() => {
            count += 1;
            if (count>100){
                const sec3 = document.getElementById('p3');
                sec3.scrollIntoView({ behavior: 'smooth' });
                clearInterval()}
            else{num.textContent=`${count}%`}
        }, x);
        
      }, 1000)
  
        
        
    }
}

function getKeyOfMaxValue(obj) {
    let maxKey = null;
    let maxValue = Number.NEGATIVE_INFINITY;
  
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        if (value > maxValue) {
          maxValue = value;
          maxKey = key;
        }
      }
    }
  
    return maxKey;
  }
  