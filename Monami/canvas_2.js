// html에서 canvas 태크를 가져온다.
const canvas = document.getElementById("canvas");
// getContext: 그래픽 렌더링 컨텍스트를 가져오는 메소드. 2d를 가져온다.
const ctx = canvas.getContext("2d");
//브러쉬 사이즈와 컬러들을 담는 div를 불러오는 변수.
const brushSize = document.querySelector('.brushSizes');
const brushColor = document.querySelector('.brushColors');

// canvas 영역 지정(css로는 X. 그림 그릴 때 마우스와 좌표가 안맞을 수 있음)
canvas.width = 700;
canvas.height = 700;

let drawing = false;        // 기본 값은 종료상태이다.

// ----- 브러쉬 사이즈를 변경하는 함수 ------------------------------------------------------------------
//------- 읽어온 브러쉬 사이즈를 업데이트 하는 함수 --------------------------------
let updateBrushSize = (e) => {
    ctx.lineWidth = e;
}
//-------------------------------------------------------------------------------
//------- 읽어온 브러쉬 색상을 업데이트 하는 함수 ---------------------------------
let updateBrushColor = (e) => {
    ctx.strokeStyle = e;
}
//-------------------------------------------------------------------------------

//------ HTML에 저장된 브러쉬 사이즈를 읽어오는 함수 -------------------------------
const changeBrush = (e) => {
    // 클릭으로 선택한 target의 클래스가 brushSize가 아니라면 return
    if (!e.target.classList.contains("brushSize")) return;
    // dataset.size: 'datasetd'을 사용하면 해당 요소의 'data-'접두사를 가진 속성의 값을 가져올 수 있다.
    // 따라서, 'data-size'의 속성을 읽어올 수 있는 것이다.
    const brushSized = e.target.dataset.size;
    updateBrushSize(brushSized);
}
// ------------------------------------------------------------------------------
// ------- HTML에 저장된 브러쉬 컬러를 읽어오는 함수 ------------------------------
const changeColor = (e) => {
    if (!e.target.classList.contains("brushColor")) return;

    const selectColor = e.target.dataset.color;
    updateBrushColor(selectColor);
}
// ------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------

// 브러쉬 크기 버튼의 click함수 실행
brushSize.addEventListener("click", changeBrush);
// 브러쉬 색상 버튼의 click함수 실행
brushColor.addEventListener("click", changeColor);

// ----------- 그림을 그리는 함수 -----------------------------------------------------------------------
// ------- 그림 그리는 시작을 하는 함수 ----------------------
const startDrawing = (e) => {
    drawing = true;
    // getBoundingClientRect: 캔버스 요소의 위치와 크기를 가져온다.
    // canvas영역과의 간격을 없애기 위해 선택한 좌표값에서 빼준다.
    const canvasRect = canvas.getBoundingClientRect();
    lastX = e.clientX - canvasRect.left;
    lastY = e.clientY - canvasRect.top;
    // console.log(e)
}
//----------------------------------------------------------

// ------ 그림 그리는 동작을 종료하는 함수 ------------------
const stopDrawing = () => {
    drawing = false;
}
// -------------------------------------------------------

// ------- 그림 그리는 동작을 하는 함수 -----------------------
const draw = (e) => {
    // console.log(e);
    // const x = e.offsetX;
    // const y = e.offsetY;
    const canvasRect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - canvasRect.left;
    const mouseY = e.clientY - canvasRect.top;

    if (!drawing) return;
    // beginPath: 경로를 시작하는 메소드. 현재 경로가 초기화 되고, 이후의 그리기 명령으로 새로운 경로를 생성한다.
    ctx.beginPath();
    // moveTo: 시작점 설정
    ctx.moveTo(lastX, lastY);
    // lineTo: 끝점 설정
    ctx.lineTo(mouseX, mouseY);
    // stroke: 선 그리기
    ctx.stroke();
    // lineWidth: 선 굵기를 설정
    // ctx.lineWidth = 10;
    // lineCap: 선의 끝 모양 설정 (butt: 선 끝이 직선(기본값) / round: 선 끝이 반원 / square: 선 끝이 사각형)
    ctx.lineCap = "round";
    // strokeStyle: 선 색상 설정
    // ctx.strokeStyle = "black";

    lastX = mouseX;
    lastY = mouseY;
    // 그림을 그릴 때 마다 그림그리는 동작을 기록한다.
    // recordedFrames.push(canvas.toDataURL('image/webp', 1.0));
}
// 기본 선 굵기, 컬러 값
ctx.lineWidth = 10;
ctx.strokeStyle = "black";

//-----------------------------------------------------------------------------------------------------

//----------- 그림 그릴 마우스의 상태지정 ---------------------------------------------------------------
canvas.addEventListener("mousedown", startDrawing);     //마우스를 누르면 대기상태가 된다.
canvas.addEventListener("mouseup", stopDrawing);     //마우스 떼면 종료상태가 된다.
canvas.addEventListener("mouseout", stopDrawing);     //마우스가 캔버스 영역에서 나가면 종료상태가 된다.
canvas.addEventListener("mousemove", draw);     //마우스를 누른 상태로 움직이면 그림그리는 함수가 동작한다.
//-----------------------------------------------------------------------------------------------------

// 그림그리기는 동작을 기록하기 위한 배열 생성
let recordedFrames = [];
let mediaRecorder;

// 비디오 녹화 시작
function startRecording() {
    const canvasStream = canvas.captureStream();
    mediaRecorder = new MediaRecorder(canvasStream, { mimeType: 'video/webm' });
  
    mediaRecorder.ondataavailable = (e) => {
      recordedFrames.push(e.data);
    };
  
    mediaRecorder.start();
  }

  // 비디오 재생
  function playVideo() {
    const videoBlob = new Blob(recordedFrames, { type: 'video/webm' });
    const videoURL = URL.createObjectURL(videoBlob);
    const videoElement = document.getElementById('video_recorded');
  
    videoElement.src = videoURL;
    videoElement.play();
  }

// 비디오 녹화 종료
function stopRecording() {
    mediaRecorder.stop();
    // playVideo();
  }

  const completeBtn = document.getElementById('complete');
  const playBtn = document.getElementById('play');


  window.addEventListener('DOMContentLoaded',startRecording);
  completeBtn.addEventListener('click', stopRecording);
  playBtn.addEventListener('click', playVideo);