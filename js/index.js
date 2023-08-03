const 정답 = "APPLE";

let attempts = 0; // n번째 시도
let index = 0; // n번째 인덱스
let timer;

function appStart() {
  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "게임 종료";
    div.style =
      "display:flex; justify-content:center; align-items:center; position:absolute; top:10vh; left:47vw;";
    document.body.appendChild(div);
  };

  const nextLine = () => {
    if (attempts === 6) return gameOver();
    attempts++;
    index = 0;
  };
  const gameOver = () => {
    window.removeEventListener("keydown", hadnleKeyDown);
    displayGameover();
    clearInterval(timer);
  };
  const handleEnterKey = () => {
    let 맞은개수 = 0;
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`
      );
      const 입력글자 = block.innerText;
      const 정답글자 = 정답[i];
      if (입력글자 === 정답글자) {
        맞은개수++;
        block.style.background = "green";
      } else if (정답.includes(입력글자)) block.style.background = "orange";
      else block.style.background = "gray";
      block.style.color = "white";
    }
    if (맞은개수 === 5) gameOver();
    else nextLine();
  };

  const handleBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-block[data-index='${attempts}${index - 1}']`
      );
      preBlock.innerText = "";
    }
    if (index != 0) index--;
  };

  const hadnleKeyDown = (e) => {
    const key = e.key;
    const keyCode = e.keyCode;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );
    if (key === "Backspace") handleBackspace();
    else if (index === 5) {
      if (e.key === "Enter") handleEnterKey();
      else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key.toUpperCase();
      index++;
    }
  };

  const startTimer = () => {
    const 시작시간 = new Date(); // 고정값

    function Timer() {
      const 현재시간 = new Date(); // setInterval로 인해 1초마다 늘어남(고정값x)
      const 흐른시간 = new Date(현재시간 - 시작시간);
      //시작시간은 고정이지만 현재시간은 1씩 늘어나고 있기 때문에 흐른시간도 1씩 늘어남.
      const 분 = 흐른시간.getMinutes().toString().padStart(2, "0");
      // 흐른시간에서 분 정보를 받아와 문자열로 변환 후 최대 길이 2자리로 지정 후 길이가 모자라면 모자란 부분은 "0"으로 채움.
      const 초 = 흐른시간.getSeconds().toString().padStart(2, "0");
      // 흐른시간에서 초 정보를 받아와 문자열로 변환 후 최대 길이 2자리로 지정 후 길이가 모자라면 모자란 부분은 "0"으로 채움.
      const tiemDiv = document.querySelector("#timer");

      tiemDiv.innerText = `${분}:${초}`;
    }

    timer = setInterval(Timer, 1000);
  };

  startTimer();
  window.addEventListener("keydown", hadnleKeyDown);
}

appStart();
