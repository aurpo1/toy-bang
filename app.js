//swiper

const swiper = new Swiper('.mySwiper', {
  noSwipingSelector: "input",
});

// Chart

// daily chart
const dailyLabels = [ //x축
  '02', '04', '06', '08', '10',
  '12', '14', '16', '18', '20',
  '22', '24', '26', '28', '30'
];

const dailyData = {
  labels: dailyLabels,
  datasets: [{
    type: 'bar',
    label: 'daily bar report',
    backgroundColor: '#38C976',
    barThickness: 4,
    barRadius: 10, 
    data: [ //y축 data
      65000, 54300, 45000, 48000, 67000,
      65000, 54300, 45000, 48000, 67000,
      65000, 54300, 45000, 48000, 67000
    ],
  }, {
    type: 'line',
    label: 'daily line report',
    borderColor: '#FF5F00',
    borderDash: [10, 5],
    pointStyle: 'line',
    data: [ //y축 data
    65000, 54300, 45000, 48000, 67000,
    65000, 54300, 45000, 48000, 67000,
    65000, 54300, 45000, 48000, 67000
  ],
  }],
};

const dailyConfig = {
  type: 'bar',
  data: dailyData,
  options: {
    responsive: false, //크기 조절할 수 있게
    plugins: {
      legend: {
        display: false, //label 숨기기
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        }
      },
      y: {
        grid: {
          borderDash: [5, 5],
        },
        ticks: { //단위 설정
          stepSize: 20000,
        }
      }
    },
  }
};

const dailyChart = new Chart(
  document.getElementById('dailyChart').getContext('2d'),
  dailyConfig
);

// pattern chart

let patternData = [
  ['주유비', '건강관리비', '외식비', '장보기', '상점'],
  [56000, 80000, 233000, 390000, 46000]
]

let patternData1 = [{
  'name': '주유비',
  'price': 56000
  },
  {
    'name': '건강관리비',
    'price': 80000
  },
  {
    'name': '외식비',
    'price': 233000
  },
  {
    'name': '장보기',
    'price': 390000
  },
  {
    'name': '상점',
    'price': 46000
  }]

// chart 밑에 list
const patternListEl = document.querySelector('.expense_pattern-list');

for (let i=0; i<patternData1.length; i++) {
  const patternLi = document.createElement('li');

  const itemName = document.createElement('strong');
  itemName.textContent = patternData1[i].name;

  const itemPrice = document.createElement('p');
  itemPrice.textContent = patternData1[i].price.toLocaleString();

  patternLi.appendChild(itemName);
  patternLi.appendChild(itemPrice);

  patternListEl.appendChild(patternLi);
}

const doughnutLabel = {
  labels: patternData[0],
  datasets: [{
    label: 'expense pattern chart',
    data: patternData[1],
    backgroundColor: [
      '#BD5B00',
      '#0057BD',
      '#00BDB2',
      '#FEC229',
      '#C4C4C4'
    ],
    hoverOffset: 4,
    borderWidth: 0,
  }]
};

const doughnutConfig = {
  type: 'doughnut',
  data: doughnutLabel,
  options: {
    cutout: 120, // 도넛 내부 원의 크기
    responsive: false,
    plugins: {
      legend: {
        display: false, //label 숨기기
      },
    },
  }
};

const doughnutChart = new Chart(
  document.getElementById('doughnutChart').getContext('2d'),
  doughnutConfig
);


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

fetch('https://s3.us-west-2.amazonaws.com/secure.notion-static.com/b2f477c8-ea05-4ad8-ad1b-ecdf5d06e7c6/banking.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220510%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220510T163431Z&X-Amz-Expires=86400&X-Amz-Signature=2219cb0871e19a03551dd64c3c58926cb00ec8dcbcef7faf71f0ac092215ace5&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22banking.json%22&x-id=GetObject')
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

  for (let i=0; i<today.getDate(); i++) {
    const tempToday = new Date();

    // 오늘로부터 과거로 내려가기
    let past = new Date(tempToday.setDate(tempToday.getDate() - i));
    past = makeDate(past);
    console.log(i + ' : ' + past);

    // 오늘 기준으로 과거 내역의 객체 데이터
    let isPast = detailData.filter((date) => {
      return date.date == past;
    });

    const newDetailEl = document.createElement('div');
    newDetailEl.classList.add('history_detail')

    const newDetailHeadEl = document.createElement('div');
    newDetailHeadEl.classList.add('history_detail-header');

    const newSpanEl = document.createElement('span');
    const newSumEl = document.createElement('span');

    const newDetailLiEl = document.createElement('ul');
    newDetailLiEl.classList.add('history_detail-list');

    // 하루 총 지출
    let daySum = 0;

    for (let j=0; j < isPast.length; j++) {
      // history_detail-header-day
      if (i == 0) {
        newSpanEl.textContent = "오늘";
        newDetailHeadEl.appendChild(newSpanEl);
      } else if (i == 1) {
        newSpanEl.textContent = '어제';
        newDetailHeadEl.appendChild(newSpanEl);
      } else if (i == 2) {
        newSpanEl.textContent = `${i}일전`;
        newDetailHeadEl.appendChild(newSpanEl);
      } else {
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

