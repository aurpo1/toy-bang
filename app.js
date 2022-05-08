
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

const labels = [
  '02', '04', '06', '08', '10',
  '12', '14', '16', '18', '20',
  '22', '24', '26', '28', '30'
];

const data = {
  labels: labels,
  datasets: [{
    label: 'daily report',
    backgroundColor: '#38C976',
    data: [
      65000, 54300, 45000, 48000, 67000,
      65000, 54300, 45000, 48000, 67000,
      65000, 54300, 45000, 48000, 67000
    ],
  }]
};

const config = {
  type: 'bar',
  data: data,
  options: {}
};

const dailyChart = new Chart(
  document.getElementById('dailyChart').getContext('2d'),
  config
);


