// 전역변수
const colaItems = document.querySelectorAll(".item");
const cartList = document.querySelector(".item-get-list");
const resultList = document.querySelector(".item-get-result-list");
//획득 버튼
const resultBtn = document.querySelector(".item-get-btn");
// 중복 여부를 체크하는 배열
const addedIds = [];
const addedResult = [];

// 획득목록에 item을 추가하고 active클래스와 유니크한 class 추가
const setColaItem = (item, id) => {
  const imgSrc = item.querySelector(".item-img").getAttribute("src");
  const title = item.querySelector(".item-name").textContent;
  const cartElement = `
  <li id=${id}>
    <img src=${imgSrc} />
    <p>${title}</p>
    <span class='item-quantity'>${1}</span>
  </li>
  `;

  item.classList.add("active");
  item.classList.add(`${id}`);
  cartList.innerHTML += cartElement;
  addedIds.push(id);
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

const putMoneys = (item, id) => {};

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

//획득 버튼클릭 시 소지품목록에 들어가는
resultBtn.addEventListener("click", () => {
  const cartLi = document.querySelectorAll(".item-get-list li");

  cartLi.forEach((value) => {
    const cloneLi = value.cloneNode(true);
    if (addedResult.includes()) resultList.append(cloneLi);
  });
});
