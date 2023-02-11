window.onload = function() {
  
  var file = document.getElementById("thefile");
  var audio = document.getElementById("audio");
  
  file.onchange = function() {
    var files = this.files;
    audio.src = URL.createObjectURL(files[0]);
    audio.load();
    audio.play();
    var context = new AudioContext();
    var src = context.createMediaElementSource(audio);
    var analyser = context.createAnalyser();

    var canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var ctx = canvas.getContext("2d");

    src.connect(analyser);
    analyser.connect(context.destination);

    analyser.fftSize = 256;

    var bufferLength = analyser.frequencyBinCount;

    var dataArray = new Uint8Array(bufferLength);

    var WIDTH = canvas.width;
    var HEIGHT = canvas.height;

    var barWidth = (WIDTH / bufferLength);
    var barHeight;
    var x;

    function renderFrame() {
      requestAnimationFrame(renderFrame);


      analyser.getByteFrequencyData(dataArray);

      ctx.fillStyle = "#B6C0AF";
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      x =  -0 + (WIDTH / 2);

      for (var i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i];
        
        var r = 22;
        var g = 69;
        var b = 111;

        ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
        ctx.fillRect(x, -100 + HEIGHT - barHeight, barWidth, barHeight);

        x -= barWidth + 1;
      }

      x = (WIDTH / 2) + 0

      for (var i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i];
        
        var r = 22;
        var g = 69;
        var b = 111;

        ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
        ctx.fillRect(x, -100+HEIGHT - barHeight, barWidth, barHeight);

        x += barWidth + 1;
      }
    }

    audio.play();
    renderFrame();
  };
};
