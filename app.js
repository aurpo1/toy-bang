
console.log('ok');

const swiper = new Swiper('.mySwiper', {});

let itemSwiper = new Swiper('.history_sliderlist', {});



// Chart

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


const doughnutLabel = {
  labels: [
    '주유비',
    '건강관리비',
    '외식비',
    '장보기',
    '상점'
  ],
  datasets: [{
    label: 'expense pattern chart',
    data: [56000, 80000, 233000, 390000, 46000],
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

const expenseEl = document.querySelector('.expense');
const expenseBtn = document.querySelector('.account_stats-btn');
const closeBtn = document.querySelector('.close-btn');

expenseBtn.addEventListener('click', () => {
  expenseEl.classList.add('up');
})

closeBtn.addEventListener('click', () => {
  expenseEl.classList.remove('up');
})