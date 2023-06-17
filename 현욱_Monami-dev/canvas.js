// html에서 canvas 태크를 가져온다.
const canvas = document.getElementById("canvas");
//
const ctx = canvas.getContext("2d");
//
const brushSize = document.querySelector('.brushSizes');
const brushColor = document.querySelector('.brushColors');

// canvas 영역 지정(css로는 X. 그림 그릴 때 마우스와 좌표가 안맞을 수 있음)
canvas.width = 700;
canvas.height = 700;

let drawing = false;        // 기본 값은 종료상태이다.


// 그림그리기는 동작을 기록하기 위한 배열 생성
let recordedFrames = [];

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
    // recordedFrames.push(canvas.toDataURL('image/webp', 0.5));
    // console.log("그림그리는 동작?",recordedFrames)
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


// 그림을 다 그리면 누르는 버튼
const completeBtn = document.getElementById('complete');

// 영상을 생성하고 다운로드하는 함수 생성
function createVideo() {
    // 초당 프레임 수 설정
    const framesPerSecond = 30;
    // captureStream(): canvas 요소의 현재 상태를 스트림 형태로 캡쳐한다. canvas의 동작을 캡쳐하여 영상으로 저장한다.
    const canvasStream = canvas.captureStream();
    // MediaRecorder: 웹 브라우저 상에서 미디어 스트림을 녹화하고 저장하는 메소드이다.
    // 해당 메소드를 사용하려면 녹화할 미디어 스트림(예.captureStream)을 제공해야 한다.
    // mimeType 매개변수: 저장할 영상 형식으로 지정할 수 있다.
    const mediaRecorder = new MediaRecorder(canvasStream, { mimeType: 'video/webm' });
    // ondataavailable: 녹화된 데이터 조각을 사용하는 메소드. 데이터 조각은 Blob형식으로 제공
        // Blob: 파일류의 불변하는 미가공 데이터를 나타낸다.
    // 각 Blob가 준비될 때마다 호출된다. 헤당 조각을 recordedFrames에 추가한다.
    // mediaRecorder.ondataavailable = (e) => {
    //     // console.log("e",e)
    //     const imgUrl = canvas.toDataURL('image/webp', 1.0);
    //     recordedFrames.push(imgUrl);
    // };
    // mediaRecorder.onstop: 녹화가 종료되었을 때 호출된다.
    mediaRecorder.onstop = () => {
        console.log("스탑?")
        // recordedFrames배열에 저장되어 있는 blob조각들을 사용하여 Blob객체를 생성한다.
        // 타입을 video/webm 형식으로 지정한다.
        console.log("recordedFrames",recordedFrames)
        const videoBlob = new Blob(recordedFrames, { type: 'video/webm' });
        const chunk = videoBlob.slice(0, 1024,'video/webm');

        const chunks = [];
        const numberOfSlices = 10;
        const chunkSize = Math.ceil(videoBlob.size / numberOfSlices);
        for (let i = 0; i < numberOfSlices; i+= 1) {
            const startByte = chunkSize * i;
            chunks.push(
                videoBlob.slice(
                    startByte,
                    startByte + chunkSize,
                    videoBlob.type
                )
            );
        }
        console.log("chunks",chunks);

        const videoBlob2 = new Blob(chunks);
        // URL.createObjectURL(): 매개변수의 객체를 URL로 변환한다.
        // 따라서 Blob 객체를 다운로드 링크로 사용할 수 있다.
        console.log("videoBlob",videoBlob)
        const videoURL = URL.createObjectURL(videoBlob2);
        // a태그를 생성하여 다운로들할 수 있는 링크로 이동한다.
        const videoDiv = document.getElementById('video_recorded');
        // console.log(videoURL);
        // console.log(videoDiv.src);
        videoDiv.src = videoURL;
        videoDiv.controls = true;
        console.log(videoDiv.src);
        // downloadLink.href: a태그의 이동할 url을 지정
        // downloadLink.href = videoURL;
        // downloadLink.download: 다운로드될 파일의 이름을 지정
        // downloadLink.download = 'canvas_animation.webm';
        // 자동으로 파일다운 링크로 넘어가도록 click버튼 활성화
        // downloadLink.click();
        // URL을 할당하여 다운로드를 진행했으므로, URL.revokeObjectURL()를 사용하여 메모리를 해제해주어야 한다.
        // URL.revokeObjectURL(videoURL);
    };
    // start(): 녹화를 시작하는 메소드
    mediaRecorder.start();
    // frameDuration: 프레임간의 시간 간격을 나타냄
    const frameDuration = 1000 / framesPerSecond;

    for (let i = 0; i < recordedFrames.length; i++) {
        setTimeout(() => {
            // requestData메소드: 데이터 조각을 요청한다. 여기서 ondataavailable가 호출된다.
            mediaRecorder.requestData();
        }, i * frameDuration);
    }

    setTimeout(() => {
        // stop(): 녹화를 중지하는 메소드
        mediaRecorder.stop();
    }, recordedFrames.length * frameDuration);
}


// 그림그리기 완료 함수 선언
const stopRecording = () => {
    console.log("클릭?")
    drawing = false;
    // canvas.toDataURL(): 캔버스에 그린 그림을 문자열로 저장하는 메소드
        // 첫 번째 매개변수: 이미지 형식
            // webp형식의 이미지로 변환
        // 두 번째 매개변수: 이미지 품질
            // 1.0: 최고 퀄리티
            // 0.5: 중간 퀄리티
            // 0.1: 낮은 퀄리티
    // recordedFrames.push(canvas.toDataURL('image/webp', 1.0));
    // 영상을 생성하는 함수 실행
    createVideo();
}

// 그림 완료 버튼을 누르면 stopRecording함수 실행
completeBtn.addEventListener('click', stopRecording);


