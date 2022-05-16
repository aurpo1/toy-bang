import { dailyChart } from "./chart";

//swiper

const swiper = new Swiper('.mySwiper', {
  noSwipingSelector: "input",
});

// history detail

const historyEl = document.querySelector('.history');
const historyBarEl = historyEl.querySelector('.history_detail-bar');
const histroyDetailEl = historyEl.querySelector('.history_details');

historyBarEl.addEventListener('click', () => {
  historyEl.classList.toggle('up');
  histroyDetailEl.classList.toggle('up');
})


// expense click

const expenseEl = document.querySelector('.expense');
const expenseBtn = document.querySelector('.account_stats-btn');
// [0] is expense close, [1] is transfer close
const closeBtn = document.querySelectorAll('.close-btn');

expenseBtn.addEventListener('click', () => {
  expenseEl.classList.add('up');
})

closeBtn[0].addEventListener('click', () => {
  expenseEl.classList.remove('up');
})


// transfer click

const transferEl = document.querySelector('.transfer');
const transferBtnEl = document.querySelector('.account_btn');

transferBtnEl.addEventListener('click', () => {
  transferEl.classList.add('up');
})

closeBtn[1].addEventListener('click', () => {
  transferEl.classList.remove('up');
})


// json

fetch('https://s3.us-west-2.amazonaws.com/secure.notion-static.com/b2f477c8-ea05-4ad8-ad1b-ecdf5d06e7c6/banking.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220516%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220516T150119Z&X-Amz-Expires=86400&X-Amz-Signature=a03c3af7ce667742f49282cdd36055c803593a19573c42bab31084ff456e8e63&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22banking.json%22&x-id=GetObject')
.then( res => {
  // 받은 애를 json화 시키고 걔를 그 다음 리턴
  //그 다음 then에게
  return res.json();
})
.then( obj => {
  // console.log(obj);
  historyData(obj);
})

// 날짜를 YYYY-MM-DD로 만드는 함수
// timezone 문제로 대한민국 offset 설정
function makeDate (date) {
  let offset = date.getTimezoneOffset() * 60000; 
  let dateOffset = new Date(date.getTime() - offset);
  let newDate = dateOffset.toISOString().substring(0,10);

  return newDate;
}

function historyData(obj) {
  const detailData = obj.bankList;
  
  // 오늘 날짜
  const today = new Date();

  // 과거 데이터 추출하는 함수
  function selectData(selectDate) {
    let result = detailData.filter((date) => {
      return date.date == selectDate;
    });
    return result;
  }

  for (let i=0; i<today.getDate(); i++) {
    const tempToday = new Date();

    // 오늘로부터 과거로 내려가기
    let past = new Date(tempToday.setDate(tempToday.getDate() - i));
    past = makeDate(past);

    // 오늘 기준으로 과거 내역의 객체 데이터
    let isPast = selectData(past);

    const newDetailEl = document.createElement('div');
    newDetailEl.className = 'history_detail';

    const newDetailHeadEl = document.createElement('div');
    newDetailHeadEl.className = 'history_detail-header';

    const newSpanEl = document.createElement('span');
    const newSumEl = document.createElement('span');

    const newDetailLiEl = document.createElement('ul');
    newDetailLiEl.className = 'history_detail-list';

    // 하루 총 지출
    let daySum = 0;

    for (let j=0; j < isPast.length; j++) {
      // history_detail-header-day
      switch (i) {
        case 0: 
          newSpanEl.textContent = "오늘";
          newDetailHeadEl.appendChild(newSpanEl);
          break;
        case 1: 
          newSpanEl.textContent = '어제';
          newDetailHeadEl.appendChild(newSpanEl);
          break;
        case 2: 
          newSpanEl.textContent = `${i}일전`;
          newDetailHeadEl.appendChild(newSpanEl);
          break;
        default: 
          newSpanEl.textContent = isPast[j].date;
          newDetailHeadEl.appendChild(newSpanEl);
      }

      
      // history_detail-header-sum
      if (isPast[j].income === 'out') {
        daySum += isPast[j].price;
      }
      if (j == (isPast.length-1)) {
        newSumEl.textContent = `${daySum.toLocaleString()}원 지출`;
        newDetailHeadEl.appendChild(newSumEl);
      }

      // history_detail-list
      const detailLi = document.createElement('li');
      const what = document.createElement('span');
      const price = document.createElement('span');

      what.textContent = isPast[j].history;
      price.textContent = isPast[j].price.toLocaleString();
  
      if (isPast[j].income === 'in') {
        price.textContent = '+ ' + price.textContent;
        price.style.color = '#FF5F00';
      }
  
      detailLi.appendChild(what);
      detailLi.appendChild(price);
      newDetailLiEl.appendChild(detailLi); // ul > li
    }

    newDetailEl.appendChild(newDetailHeadEl);
    newDetailEl.appendChild(newDetailLiEl); 

    histroyDetailEl.appendChild(newDetailEl);

  }

}

