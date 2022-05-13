// 1.獲取DOM
const obtainList = document.querySelector('.list');
const obtainButton = document.querySelector('.button');
const textBox = document.querySelector('#textId');
// 將事件從JSON資料轉成陣列，若無資料則回傳空陣列
const data = JSON.parse(localStorage.getItem('todoData')) || [];

// 2.監聽DOM
obtainButton.addEventListener('click', addList, false);
obtainList.addEventListener('click', deleteList, false);
updateList();

// 3.新增todo，將資料寫入localStorage
function addList() {
  const obtainText = document.querySelector('#textId').value;
  const todo = {  // 設定物件格式
    content: obtainText
  }

  if (obtainText === '') {
    alert('請輸入內容...');
  }else {
    data.push(todo);
    // setItem: 設定key, value 屬性
    localStorage.setItem('todoData', JSON.stringify(data));
    updateList();
  }
  textBox.value = '';
}

// 4.更新todo，把存在 localStorage 裡的資料渲染至網頁
function updateList() {
  let str = '';         // 用來儲存數值的資料
  for (let i = 0; i < data.length; i++) {
    str += `<li> 
              <span>${data[i].content}</span> 
              <a href = "#" class = "delet" data-num = ${i}> Ｘ </a> 
            </li>`;
  }
  obtainList.innerHTML = str;  
}

// 5.刪除todo，更新網頁跟 localstorage
function deleteList(e) {
  if (e.target.nodeName !== 'A') {  // 確認點到的元素
    return;
  }
  var num = e.target.dataset.num;  // dataset: 取得待辦事項編號
  data.splice(num, 1);  // 刪除點選的資料一筆
  localStorage.setItem('todoData', JSON.stringify(data));
  updateList();
}

// 使用enter輸入
textBox.addEventListener('keydown', function(event) {
  // console.log(event);
  const obtainEvent = window.event || event;
  if (obtainEvent.keyCode === 13) {
    addList();
  }
}, false);
