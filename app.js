
console.log('ok');

const swiper = new Swiper('.mySwiper', {
  pagination: {
    el: ".swiper-pagination",
  },
  });

console.log(swiper);
let itemSwiper = new Swiper('.history_sliderlist', {});
console.log(itemSwiper);


// Chart

const labels = [ //x축
  '02', '04', '06', '08', '10',
  '12', '14', '16', '18', '20',
  '22', '24', '26', '28', '30'
];

const data = {
  labels: labels,
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

const config = {
  type: 'bar',
  data: data,
  options: {
    responsive: false,
    plugins: {
      legend: {
        display: false, //label 숨기기
      },
    },
    scales: {
      x: {
        base: 20000,
        grid: {
          display: false,
        }
      },
      y: {
        min: 20000,
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
  config
);


