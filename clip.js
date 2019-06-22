// Modified https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob#Polyfill
function dataURIToBlob(dataURI, callback) {
  var binStr = atob(dataURI.split(',')[1]),
    len = binStr.length,
    arr = new Uint8Array(len);

  for (var i = 0; i < len; i++) {
    arr[i] = binStr.charCodeAt(i);
  }

  callback(new Blob([arr]));
}


function clip_image_from_video(){
    /*
     * Saves image from first video element found in page
     *
     */
    // Get video element
    video = document.querySelector("video");
    if (!video){
        window.alert("Failed to find video");
        return;
    }

    // Create canvas that fits video
    var canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    var frame = Math.round(video.currentTime * 25); // assume 25 fps

    // Draw video frame into canvas
    var ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);

    // Use page title as default basename
    var basename = document.querySelector("title").text;

    // Look for a better name?
    var youtube_title = document.querySelector('h1 yt-formatted-string');
    if (youtube_title){
        console.log(youtube_title);
        console.log(youtube_title.innerText);
        basename = youtube_title.innerText;
    }

    // Make basename look nicer
    basename = basename.replace(/['"|]/g, '').replace(/ +/g, "_");
    var extension = '.png'
    var filename = basename + '.' + frame + extension;
    console.log(filename)

    // Create data url
    var image_data_url = canvas.toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
    console.log(image_data_url)

    // Make blob
    dataURIToBlob(
        image_data_url,
        function(blob) {
            // Save blob to hidden element
            var a = document.createElement('a');
            a.download = filename;
            a.href = URL.createObjectURL(blob);
            a.click();

            // revoke the object URL after hidden click
            requestAnimationFrame(function() {
                URL.revokeObjectURL(a.href);
            });
        }
    );
}


clip_image_from_video();
