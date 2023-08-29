import React, { useRef } from "react";
import { Bar, getElementAtEvent } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
export default function MonthlyPayment({ labels, data, navigation }) {
  const chartRef = useRef();

  const avgLabels = ["평균", ...labels.map((month) => `${Number(month)}월`)];
  const avgData = [
    data.reduce((acc, value) => acc + value, 0) / data.length,
    ...data,
  ];

  const backgroundColors = ["#F29B0C", "#056CF2", "#056CF2", "#056CF2"];
  const borderColors = ["#F29B0C", "#056CF2", "#056CF2", "#056CF2"];
  const chartData = {
    labels: avgLabels,
    datasets: [
      {
        data: avgData,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ],
  };
  const onClick = (event) => {
    const activeElement = getElementAtEvent(chartRef.current, event);
    if (activeElement.length > 0) {
      const dataIndex = activeElement[0].index;
      const clickedLabel = chartData.labels[dataIndex].slice(0, -1);
      //나중에 수정해라이
      if (clickedLabel == "평") {
        return true;
      } else {
        navigation("/PaymentDetail", {
          state: { month: clickedLabel },
        });
      }
    }
  };

  const chartOptions = {
    scales: {
      y: {
        display: false, // y축 표시하지 않음
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  return (
    <Bar
      ref={chartRef}
      data={chartData}
      options={chartOptions}
      onClick={onClick}
    />
  );
}
