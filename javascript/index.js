const colaList = [
  {
    key: 1,
    img: "assets/images/Original_Cola.png",
    name: "Original_Cola",
    price: "1000원",
  },
  {
    key: 2,
    img: "assets/images/Violet_Cola.png",
    name: "Violet_Cola",
    price: "1000원",
  },
  {
    key: 3,
    img: "assets/images/Yellow_Cola.png",
    name: "Yellow_Cola",
    price: "1000원",
  },
  {
    key: 4,
    img: "assets/images/Cool_Cola.png",
    name: "Cool_Cola",
    price: "1000원",
  },
  {
    key: 5,
    img: "assets/images/Green_Cola.png",
    name: "Green_Cola",
    price: "1000원",
  },
  {
    key: 6,
    img: "assets/images/Orange_Cola.png",
    name: "Orange_Cola",
    price: "1000원",
  },
];

const colaItem = document.querySelectorAll(".item");

colaItem.forEach((value, index) => {
  console.log(value, index);
});
