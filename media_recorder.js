//https://developer.mozilla.org/en-US/docs/Web/Media/Formats/codecs_parameter#AVC_profiles
//https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder/isTypeSupported
//https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder/MediaRecorder
//https://developers.google.com/web/updates/2016/01/mediarecorder
//https://developers.google.com/web/updates/2016/10/capture-stream

function download() {
  var blob = new Blob(recordedChunks, {
    type: 'video/webm'
  });
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  document.body.appendChild(a);
  a.style = 'display: none';
  a.href = url;
  a.download = 'test.webm';
  a.click();
    setTimeout(function(){
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);  
    }, 100); 
}

var recordedChunks = [];
function handleDataAvailable(event) {
  if (event.data.size > 0) {
    recordedChunks.push(event.data);
  } else {
    // ...
  }
}

var video = document.getElementById("df8-2"); //the id of a canvas element in the page
var stream = video.captureStream();
profile = { mimeType: "video/webm" };
var mediaRecorder = new MediaRecorder(stream, profile);
mediaRecorder.ondataavailable = handleDataAvailable;

mediaRecorder.start(); //starts recording
mediaRecorder.stop(); //when you done stops recording
