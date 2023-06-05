// html에서 canvas 태크를 가져온다.
const canvas = document.getElementById("canvas");
// 
const ctx = canvas.getContext("2d");

// canvas 영역 지정(css로는 X. 그림 그릴 때 마우스와 좌표가 안맞을 수 있음)
canvas.width = 500;
canvas.heigth = 500;

// 그림 그릴 마우스의 상태지정
let drawing = false;        // 기본 값은 종료상태이다.

canvas.addEventListener("mousedown", ()=>(drawing = true));     //마우스를 누르면 대기상태가 된다.
canvas.addEventListener("mouseup", ()=>(drawing = false));     //마우스 떼면 종료상태가 된다.
canvas.addEventListener("mousemove", draw);     //마우스를 누른 상태로 움직이면 그림그리는 함수가 동작한다.


// 그림을 그리는 함수
const draw = (e)=>{
const x = e.offsetX;
const y = e.offsetY;
if(!drawing) return;
// beginPath: 경로를 시작하는 메소드. 현재 경로가 초기화 되고, 이후의 그리기 명령으로 새로운 경로를 생성한다.
ctx.beginPath();
// moveTo: 시작점 설정
ctx.moveTo(x, y);
// lineTo: 끝점 설정
ctx.lineTo(x, y);
// stroke: 선 그리기
ctx.stroke();
// lineWidth: 선 굵기를 설정
ctx.lineWidth = 10;
// lineCap: 선의 끝 모양 설정 (butt: 선 끝이 직선(기본값) / round: 선 끝이 반원 / square: 선 끝이 사각형)
ctx.lineCap = "round";
// strokeStyle: 선 색상 설정
ctx.strokeStyle = "black";
}