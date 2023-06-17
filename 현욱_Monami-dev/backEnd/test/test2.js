// function createSequence(users) {
//     const n = users.length;
//     const sequence = [];

// const { pluralize } = require("sequelize/types/utils");

  
//     for (let i = 0; i < n; i++) {
//       const user = users[i];
//       const promptIndex = i % n;
//       const imageIndex = (i + 1) % n;
  
//       const prompt = `${user}의 제시어`;
//       const image = `${imageIndex + 1}번유저의 그림`;
  
//       sequence.push({ prompt, image });
//     }
  
//     return sequence;
//   }
  
//   const users = ["1번유저", "2번유저", "3번유저", "4번유저"];
//   const result = createSequence(users);
  
//   result.forEach((item, index) => {
//     console.log(`${index + 1}번째 순서:`);
//     console.log(`${item.prompt} 관점`);
//     console.log(`${item.prompt}`);
//     console.log(`${item.image}`);
//     console.log();
//   });
  

  // 1. 유저의 총인원을 받아온다. 
  // 2. 홀수일떄 함수 짝수 일때 함수 나눈다. 유저인원이 짝수일경우 
  // 3. n유저 예를 들어 2번유저일경우 
  // 4. n유저의 제시어가 제시된다. 
  // 5. n-1유저가 n유저의 제시어를 보고 그림을그린다. 
  // 6. n+3 유저가 n-1유저의 그림을보고 정답을 말한다. 
  // 7. n+2 유저가 6번에서 전해준 정답을 보고 그림을그린다. 
  let palyer= ["현욱","지원","동희","덕진"];
  function game(player){
    let tmp=player.length;
    let replay=[];
    let dap=[];
    let painting=[];
    for(let i=0;i<tmp;i++)
    {
        dap[i]=prompt('enter your answer');
        replay[i]={
            제시어:dap[i]
        }
    }
    console.log("모든 정답이 입력되었습니다");
    for(let i=0;i<tmp;i++){
        console.log(dpa[i]);
        if(i==0){
            let asdf=prompt('그림을 그려주세요');
            // 첫번째 유저의 제시어가 보여졌을때
            // 마지막유저의 그림이 들어간다.
            painting[i]={ans1:`${player[tmp]},${asdf}`};
        }else{
        // 두번째이후 유저이후
        let asd=prompt('그림을 그려주세요');
        painting[i]={ans1:`${player[i-1]},${asd}`};
        }
    }
    
   
  }

  game(palyer);

