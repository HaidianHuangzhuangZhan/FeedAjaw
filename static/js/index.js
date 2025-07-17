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

// 连续点击检测
let clickCount = 0;          // 点击计数
let lastClickTime = 0;       // 上次点击时间
const COMBO_TIMEOUT = 500;   // 连击间隔阈值（毫秒）
const ORIGINAL_IMG = "./static/img/normal.jpg";  // 原始图片路径
const IMG_5_COMBO = "./static/img/happy.jpg";       // 5连击图片路径
const IMG_10_COMBO = "./static/img/grin.jpg";      // 10连击图片路径

// 检测连击并更新图片
const checkCombo = () => {
  const now = Date.now();
  const timeDiff = now - lastClickTime;
  
  // 如果两次点击间隔小于阈值，视为连击
  if (timeDiff <= COMBO_TIMEOUT) {
    clickCount++;
  } else {
    clickCount = 1;  // 重置连击计数
  }
  
  lastClickTime = now;
  
  // 根据连击次数切换图片
  if (clickCount >= 10) {
    muyu.src = IMG_10_COMBO;
  } else if (clickCount >= 5) {
    muyu.src = IMG_5_COMBO;
  } else {
    muyu.src = ORIGINAL_IMG;
  }
  
  // 超过阈值时间后恢复原始图片
  clearTimeout(window.comboResetTimer);
  window.comboResetTimer = setTimeout(() => {
    clickCount = 0;
    muyu.src = ORIGINAL_IMG;
  }, COMBO_TIMEOUT);
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

  // 检测连击
  checkCombo();
}

// 木鱼缩放动画（优化快速点击时的流畅度）
const muyuScale = () => {
  // 移除现有动画类，强制重绘
  muyu.classList.remove('clickDown');
  // 触发重绘（解决快速点击时动画不生效的问题）
  void muyu.offsetWidth; 
  // 重新添加动画类
  muyu.classList.add('clickDown');
  // 缩短动画时长，避免卡顿（原200ms → 100ms）
  setTimeout(() => muyu.classList.remove('clickDown'), 100);
};
let lastTime = new Date().getTime();

// 木鱼图片点击事件（无500ms间隔限制）
muyu.onclick = () => {
  createAlert();
  muyuScale();
};

// 空格键点击事件（无500ms间隔限制）
window.addEventListener("keydown", (event) => {
  if (event.code === 'Space') {
    event.preventDefault(); // 阻止空格默认滚动行为
    createAlert();
    muyuScale();
  }
});

// 设置按钮功能
setting.onclick = () => {
  let input;
  let isValid = false;
  
  // 循环直到输入有效或用户取消
  while (!isValid) {
    input = prompt("请输入总投喂次数:", totalMerits);
    
    // 用户点击取消
    if (input === null) {
      return;
    }
    
    // 验证输入是否为自然数（非负整数）
    if (/^\d+$/.test(input.trim())) {
      isValid = true;
    } else {
      alert("输入无效，请重试");
    }
  }
  
  // 添加确认步骤
  const confirmMsg = `您确定要将总投喂次数设置为 ${input} 吗？`;
  if (confirm(confirmMsg)) {
    // 用户确认后更新功德数
    totalMerits = parseInt(input);
    totalMeritsElement.innerText = `总投喂次数: ${totalMerits}`;
    saveMeritsToStorage();
  }
};

// 获取元素
const menuIcon = document.querySelector('.menu-icon');
const menuBlock = document.querySelector('.menu-block');

// 点击图标显示弹窗（添加延迟以触发动画）
menuIcon.addEventListener('click', (e) => {
  e.stopPropagation();
  
  // 显示弹窗背景
  menuBlock.style.display = 'flex';
  
  // 延迟10ms添加show类，确保触发过渡动画
  setTimeout(() => {
    menuBlock.classList.add('show');
  }, 10);
});

// 点击背景关闭弹窗（添加淡出效果）
menuBlock.addEventListener('click', (e) => {
  if (e.target === menuBlock) {
    // 先移除show类触发淡出动画
    menuBlock.classList.remove('show');
    
    // 动画结束后隐藏弹窗
    setTimeout(() => {
      menuBlock.style.display = 'none';
    }, 300); // 与CSS过渡时间一致
  }
});

// ESC键关闭弹窗（添加淡出效果）
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && menuBlock.classList.contains('show')) {
    menuBlock.classList.remove('show');
    setTimeout(() => {
      menuBlock.style.display = 'none';
    }, 300);
  }
});