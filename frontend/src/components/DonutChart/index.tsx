import axios from 'axios';
import Chart from 'react-apexcharts';
import { SaleSum } from 'types/sale';
import { BASE_URL } from 'utils/request';


type ChartData = {
  labels: string[]; 
  series: number[];
}

export default function DonutChart() {
  let chartData : ChartData = { labels: [], series: [] };

  axios.get(`${BASE_URL}/sales/amount-by-seller`)
    .then(response => { //função para ser executada quando a respostas chegar
      const data = response.data as SaleSum[]; //conversão de tipos
      const myLabels = data.map(x => x.sellerName);
      const mySeries = data.map(x => x.sum);

      chartData = { labels: myLabels, series: mySeries };

      console.log(chartData);
    });

  /*const mockData = {
    series: [477138, 499928, 444867, 220426, 473088],
    labels: ['Anakin', 'Barry Allen', 'Kal-El', 'Logan', 'Padmé']
  }*/

  const options = {
    legend: {
      show: true
    }
  }

  return (
    <Chart 
      options={{ ...options, labels: chartData.labels }}
      series={ chartData.series }
      type="donut"
      height="240"
    />
  );
}