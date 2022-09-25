// 전역변수
const colaItems = document.querySelectorAll(".item");
const cartList = document.querySelector(".item-get-list");
const resultList = document.querySelector(".item-get-result-list");
const resultBtn = document.querySelector(".item-get-btn");
const putMoneyBtn = document.querySelector(".item-put-btn");
const innerMoney = document.querySelector(".inner-money");
const returnBtn = document.querySelector(".item-return-btn");
// 중복 여부를 체크하는 배열
const addedIds = [];
const addedResult = [];

let inputMoney = document.querySelector("#money");
let totalMoney = document.querySelector(".total-money");
let sumAmount = document.querySelector(".sum-amount");

// 소지금 , 추가
totalMoney.textContent = `${priceToString(25000)} 원`;

// 획득목록에 item을 추가하고 active클래스와 유니크한 class 추가
const setColaItem = (item, id) => {
  const imgSrc = item.querySelector(".item-img").getAttribute("src");
  const title = item.querySelector(".item-name").textContent;
  const cartElement = `
  <li id=${id}>
    <img class='item-img' src=${imgSrc} />
    <p class='item-name'>${title}</p>
    <span class='item-quantity'>${1}</span>
  </li>
  `;

  item.classList.add("active");
  item.classList.add(`${id}`);
  cartList.innerHTML += cartElement;
  addedIds.push(id);
};

const setResultItem = (item, id) => {
  const title = item.querySelector(".item-name").textContent;
  const imgSrc = item.querySelector(".item-img").getAttribute("src");
  const quantity = item.querySelector(".item-quantity").textContent;

  const ResultElement = `
  <li id=${id}>
    <img src=${imgSrc} />
    <p>${title}</p>
    <span class='item-quantity'>${quantity}</span>
  </li>
  `;

  console.log(addedResult);
  item.classList.add(`${id}`);
  resultList.innerHTML += ResultElement;
  addedResult.push(id);
};

const setResultQuantity = (id) => {
  const cartQuantity = document.querySelector(`.${id}`).lastElementChild;

  console.log(cartQuantity);

  cartQuantity.textContent = parseInt(cartQuantity.textContent) + 1;
};

// 여러번 클릭 시 획득목록의 수량을 늘려주고 max값인 5를 넘으면 품절 class를 달아주는 함수
const setQuantity = (id) => {
  const cartQuantity = document.getElementById(`${id}`).lastElementChild;
  const itemSelect = document.querySelector(`.${id}`);

  if (parseInt(cartQuantity.textContent) >= 5) {
    itemSelect.classList.add("soldOut");
  } else {
    cartQuantity.textContent = parseInt(cartQuantity.textContent) + 1;
  }
};

// 현재 시간과 난수를 이용해 id를 생성하는 함수
const createUniqueId = () => {
  const time = `${new Date().getTime()}`.slice(-4);
  const randomNum = Math.floor(Math.random() * 10000);

  return `cartItem${time}${randomNum}`;
};

// 가격의 , 를 붙여주는 정규식
function priceToString(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// 가격의 , 를 제거한 정수를 리턴해주는 함수
function stringNumberToInt(stringNumber) {
  return parseInt(stringNumber.replace(/,/g, ""));
}

//거스름돈 반환 클릭 이벤트
returnBtn.addEventListener("click", () => {
  totalMoney.textContent = `${priceToString(
    stringNumberToInt(totalMoney.textContent) +
      stringNumberToInt(innerMoney.textContent)
  )} 원`;
  innerMoney.textContent = `${0} 원`;
});

// 입금버튼 클릭 이벤트
putMoneyBtn.addEventListener("click", () => {
  if (inputMoney.value > stringNumberToInt(totalMoney.textContent)) {
    alert("소지금보다 작은 금액을 입력해 주세요.");
  } else if (inputMoney.value === "") {
    alert("입금액을 입력해주세요.");
  } else {
    innerMoney.textContent = `${priceToString(
      stringNumberToInt(innerMoney.textContent) +
        stringNumberToInt(inputMoney.value)
    )} 원`;
    totalMoney.textContent = `${priceToString(
      stringNumberToInt(totalMoney.textContent) - inputMoney.value
    )} 원`;

    inputMoney.value = "";
  }
});

//획득 버튼클릭 시 소지품목록에 들어가는 이벤트
resultBtn.addEventListener("click", () => {
  const cartLi = document.querySelectorAll(".item-get-list li");

  cartLi.forEach((item) => {
    const resultId = createUniqueId();
    if (addedResult.includes(resultId)) {
      setResultQuantity(resultId);
    } else {
      setResultItem(item, resultId);
    }
  });
});

// 각각의 li 클릭이벤트 및 획득목록에 들어가는 유니크한 id 추가
colaItems.forEach((item) => {
  // 유니크 id 생성
  const id = createUniqueId();

  // 클릭이벤트 중복여부를 체크하는 배열에 유니크한 id가 있으면 수량을 늘려주는 함수를 실행하고
  // 배열에 id가 없다면 획득목록에 추가해주는 함수를 실행
  item.addEventListener("click", () => {
    if (addedIds.includes(id)) {
      setQuantity(id);
    } else {
      setColaItem(item, id);
    }
  });
});
