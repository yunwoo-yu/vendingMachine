// 전역변수
const colaItems = document.querySelectorAll(".item");
const cartList = document.querySelector(".item-get-list");
const resultList = document.querySelector(".item-get-result-list");
const resultBtn = document.querySelector(".item-get-btn");
const putMoneyBtn = document.querySelector(".item-put-btn");
const innerMoney = document.querySelector(".inner-money");
const returnBtn = document.querySelector(".item-return-btn");

// 중복 여부를 체크하는 배열
const cartItems = [];
const resultItems = [];

let inputMoney = document.querySelector("#money");
let totalMoney = document.querySelector(".total-money");
let sumAmount = document.querySelector(".sum-amount");

// 현재 시간과 random 메서드를 이용해 유니크한 id를 생성하는 함수
const createUniqueId = () => {
  const time = `${new Date().getTime()}`.slice(-4);
  const randomNum = Math.floor(Math.random() * 10000);

  return `cartItem${time}${randomNum}`;
};

// 가격의 원화 , 를 붙여주는 함수
const priceToString = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// 가격의 , 를 제거한 정수를 리턴해주는 함수
const stringNumberToInt = (stringNumber) => {
  return parseInt(stringNumber.replace(/,/g, ""));
};

/////////////////////////// 상단함수는 유틸 함수 입니다. /////////////////////////////

// 클릭한 상품을 cartItems 배열에 넣어주는 함수 (이미 있다면 수량만 증가)
const setCartItem = (item, id) => {
  const src = item.querySelector(".item-img").getAttribute("src");
  const title = item.querySelector(".item-name").textContent;
  const findItemIdx = cartItems.findIndex((el) => el.id === id);
  let count = 1;

  if (findItemIdx !== -1) {
    if (cartItems[findItemIdx].count >= 5) {
      item.classList.add("soldOut");
      return;
    }
    return cartItems[findItemIdx].count++;
  }

  // 선택표시 active class 추가
  item.classList.add("active");

  // soldOut 상태라면 배열에 push X
  if (!item.classList.contains("soldOut")) {
    cartItems.push({ id, src, title, count });
  }
};

// 상품 클릭 시 setCartItem 함수에서 객체를 넣어준 cartItems 배열에서 정보를 가져와 장바구니에 상품을 렌더링 해주는 함수
const renderCartItem = () => {
  cartList.innerHTML = "";

  cartItems.forEach((item) => {
    cartList.innerHTML += `
     <li id=${item.id}>
    <img class='item-img' src=${item.src} />
    <p class='item-name'>${item.title}</p>
    <span class='item-quantity'>${item.count}</span>
  </li>
  `;
  });
};

// 획득 버튼 클릭 시 cartItems 배열에서 정보를 가져와 resultItems배열에 넣어주는 함수 (이미 있다면 수량만 증가)
const setResultItem = (item) => {
  const src = item.src;
  const title = item.title;
  const findItemIdx = resultItems.findIndex((el) => el.title === title);

  if (findItemIdx !== -1) {
    return (resultItems[findItemIdx].count += item.count);
  }

  resultItems.push({ src, title, count: item.count });
};

// 획득 버튼 클릭 시 setResultItem 함수에서 객체를 넣어준 resultItems 배열에서 정보를 가져와 획득한 음료에 상품을 렌더링 해주는 함수
const renderResultItem = () => {
  resultList.innerHTML = "";

  resultItems.forEach((item) => {
    resultList.innerHTML += `
     <li>
    <img class='item-img' src=${item.src} />
    <p class='item-name'>${item.title}</p>
    <span class='item-quantity2'>${item.count}</span>
  </li>
  `;
  });

  cartList.innerHTML = "";
};

// 카트 배열을 비워주는 함수
const deleteCart = () => {
  for (let i = cartItems.length; i > 0; i--) {
    cartItems.pop();
  }
};

// 거스름돈 반환 함수
const getReturnMoneys = () => {
  totalMoney.textContent = `${priceToString(
    stringNumberToInt(totalMoney.textContent) +
      stringNumberToInt(innerMoney.textContent)
  )} 원`;
  innerMoney.textContent = `${0} 원`;
};

// 획득 시 입금액 차감 함수
const setMoney = (sum) => {
  innerMoney.textContent = priceToString(
    `${stringNumberToInt(innerMoney.textContent) - sum} 원`
  );
};

// 입금 함수
const putMoney = () => {
  innerMoney.textContent = `${priceToString(
    stringNumberToInt(innerMoney.textContent) +
      stringNumberToInt(inputMoney.value)
  )} 원`;
  totalMoney.textContent = `${priceToString(
    stringNumberToInt(totalMoney.textContent) - inputMoney.value
  )} 원`;
  inputMoney.value = "";
};

// 획득 시 상품 클래스 초기화 함수
const setClassName = () => {
  colaItems.forEach((item) => {
    item.classList.remove("active");
  });
};

// 총금액 합산 함수
const resultSum = () => {
  let resultQuantity = 0;
  resultItems.forEach((item) => {
    resultQuantity += item.count;
  });
  return (sumAmount.textContent = priceToString(1000 * resultQuantity));
};

////////////////////////// 이벤트 ////////////////////////////

// 소지금 , 추가
totalMoney.textContent = `${priceToString(25000)} 원`;

//거스름돈 반환 클릭 이벤트
returnBtn.addEventListener("click", () => {
  getReturnMoneys();
});

// 입금 버튼 클릭 이벤트
putMoneyBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (inputMoney.value > stringNumberToInt(totalMoney.textContent)) {
    alert("소지금이 부족합니다.");
    inputMoney.focus();
  } else if (inputMoney.value === "") {
    alert("입금액을 입력해주세요.");
    inputMoney.focus();
  } else {
    putMoney();
  }
});

// 상품 클릭 이벤트
colaItems.forEach((item) => {
  // 유니크한 id 생성
  const id = createUniqueId();

  // 클릭이벤트 중복여부를 체크하는 배열에 유니크한 id가 있으면 수량을 늘려주는 함수
  // 배열에 id가 없다면 획득 목록에 렌더링해주는 함수를 실행
  item.addEventListener("click", () => {
    setCartItem(item, id);
    renderCartItem();
  });
});

// 획득 버튼 클릭이벤트
resultBtn.addEventListener("click", () => {
  const cartQuantity = document.querySelectorAll(".item-quantity");
  let sum = 0;
  console.log(cartQuantity);
  cartQuantity.forEach((item) => {
    sum += 1000 * stringNumberToInt(item.textContent);
  });

  if (!cartItems.length) {
    alert("장바구니에 음료가 없습니다");
  }

  if (stringNumberToInt(innerMoney.textContent) >= sum) {
    cartItems.forEach((item) => {
      setResultItem(item);
      renderResultItem();
    });
    setMoney(sum);
    deleteCart();
    resultSum();
    setClassName();
  } else {
    alert("잔액이 부족합니다.");
    inputMoney.focus();
  }

  sum = 0;
});
