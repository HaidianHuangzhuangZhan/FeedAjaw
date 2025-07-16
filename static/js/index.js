/*
 * @description: 
 * @Date: 2022-09-30 13:10:46
 * @LastEditTime: 2022-09-30 13:27:10
 */
const muyu = document.querySelector("#muyu-img");
const listBox = document.querySelector(".gongde");
const setting = document.querySelector(".setting");
var gd = 1;

// 从本地存储读取总功德数，如果没有则初始化为0
let totalMerits = parseInt(localStorage.getItem('totalMerits')) || 0;

// 新增：总功德数变量
//let totalMerits = 0;

// 新增：创建总功德数显示元素
const totalMeritsElement = document.createElement("div");
totalMeritsElement.className = "total-merits";
totalMeritsElement.innerText = `总投喂次数: ${totalMerits}`;
document.body.appendChild(totalMeritsElement);

//声音素材
//const audio = new Audio();
//audio.src = "./static/audio.mp3"
//audio.volume = 1;

// 保存功德数到本地存储
const saveMeritsToStorage = () => {
  localStorage.setItem('totalMerits', totalMerits);
};

//动态创建功德弹窗
const createAlert = () => {
//  audio.pause()
//  audio.play()
  const div = document.createElement("div");
  div.className = "gongde-item"
  div.innerText = `投喂次数+1 `
  setTimeout(() => {
    listBox.removeChild(div);
  }, 1900);
  listBox.append(div)

  // 新增：更新总功德数
  totalMerits += gd;
  totalMeritsElement.innerText = `总投喂次数: ${totalMerits}`;
  saveMeritsToStorage();
}

//木鱼点击后的效果
const muyuScale = () => {
  muyu.className = 'clickDown'
  setTimeout(_ => {
    muyu.className = ''
  }, 200)
}

let lastTime = new Date().getTime();

//木鱼图片按下事件
muyu.onclick = () => {
  if (new Date().getTime() - 500 > lastTime) {
    createAlert()
    muyuScale();
    lastTime = new Date().getTime();
  }
}
//监听空格键按下事件
window.addEventListener("keydown", function (event) {
  const { code } = event;
  if (code == 'Space') {
    if (new Date().getTime() - 500 > lastTime) {
      muyuScale();
      createAlert()
      lastTime = new Date().getTime();
    }
  }
})

// 设置按钮 - 修改为直接设置总功德数
setting.onclick = () => {
  const input = prompt("修改投喂次数:", totalMerits);
  if (input !== null && !isNaN(input) && input.trim() !== '') {
    totalMerits = parseInt(input);
    totalMeritsElement.innerText = `总投喂次数: ${totalMerits}`;
    saveMeritsToStorage();
  }
};