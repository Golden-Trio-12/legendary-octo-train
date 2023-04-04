song_1 = ""
song_2 = ""

song_1_status = "";
song_2_status = "";

leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

scoreLeftWrist = 0;
scoreRightWrist = 0;

function preload(){
    song_1 = loadSound("CupSong.mp3");
    song_2 = loadSound("Sunflower.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
  }

  function draw(){
      image(video, 0, 0, 600, 500);
  }

  function modelLoaded() {
    console.log("poseNet is Initialized");
  }

  function gotPoses(results) {
      if (results.length > 0) {
          console.log(results);
          leftWristX = results[0].poses.leftWrist.x;
          leftWristY = results[0].pose.leftWrist.y;

          rightWristX = results[0].poses.rightWrist.x;
          rightWristY = results[0].pose.rightWrist.y;

          console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);
          console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);

          scoreLeftWrist = results[0].pose.keypoints[9].score;
          scoreRightWrist = results[0].pose.keypoints[10].score;
          console.log("scoreRightWrist =" + scoreRightWrist + "scoreLeftWrist =" + scoreLeftWrist);
      }
  }


function draw() {
    image(video, 0, 0, 600, 500);
    fill("#ff9a8e");
    stroke("#ff9a8e");

  song_1_status = song_1.isPlaying()
  song_2_status = song_2.isPlaying()

  if(scoreLeftWrist > 0.2){
    circle(leftWristX, leftWristY, 20)
    song_2.stop()
    
    if(song_1_status == false){
      song_1.play()
      document.getElementById("play_song").innerHTML = "Playing The Cup Song by Anna Kendrick"
    }
  }

  if(scoreRightWrist > 0.2){
    circle(rightWristX, rightWristY, 20)
    song_1.stop()
    
    if(song_2_status == false){
      song_2.play()
      document.getElementById("play_song").innerHTML = "Playing Sunflower by Post Malone"
    }
  }
}