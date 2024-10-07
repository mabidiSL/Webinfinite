import { ChartType } from './dashboard.model'; 

export const CustomerRatingChart: ChartType = {
  series: [],
  chart: {
    type: 'donut',
    height: 240,
  },
  labels: ['Rating 5*', 'Rating 4*', 'Rating 3*', 'Rating 2*', 'Rating 1*'],
  colors: ["#DEB660", "#ADA7A1", "#A79065", "#A79065", "#B0B0B0"],
  legend: {
    show: true,
  },
  dataLabels: {
    enabled: true,
  },
  plotOptions: {
    pie: {
      donut: {
        size: '70%',
      }
    }
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: "bottom"
        }
      }
    }
  ]
};
export const MostPaymentMethodChart: ChartType = {
    series: [],
    chart: {
      type: 'donut',
      height: 240,
    },
    labels: ['Apple Pay', 'Bank', 'STC Pay', 'Wallet Point'],
    colors: ["#DEB660", "#ADA7A1", "#A79065", "#A79065"],
    legend: {
      show: true,
    },
    dataLabels: {
      enabled: true,
    },
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
        }
      }
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: "bottom"
          }
        }
      }
    ]
  };
  