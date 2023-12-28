$(document).ready(function () {
  const audio = $("#myAudio")[0];
  const playPauseBtn = $("#playPauseBtn");

  playPauseBtn.on("click", function () {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  });

  const backgroundVideo = $("#backgroundVideo")[0];

  backgroundVideo.volume = 0; // Tắt tiếng video

  // Sự kiện khi video kết thúc, chơi lại video
  backgroundVideo.addEventListener("ended", function () {
    this.currentTime = 0; // Đặt thời gian video về đầu
    this.play(); // Chơi lại video
  });
});
