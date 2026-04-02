import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function FinanceTrendChart({ data }) {
  const chartData = {
    labels: data.map((entry) => entry.label),
    datasets: [
      {
        label: 'Income',
        data: data.map((entry) => entry.income),
        borderColor: '#10b981',
        backgroundColor: '#10b981',
        tension: 0.35
      },
      {
        label: 'Expense',
        data: data.map((entry) => entry.expense),
        borderColor: '#f97316',
        backgroundColor: '#f97316',
        tension: 0.35
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top'
      }
    },
    scales: {
      x: {
        grid: {
          color: '#e2e8f0'
        }
      },
      y: {
        grid: {
          color: '#e2e8f0'
        }
      }
    }
  };

  return (
    <div className="h-80 w-full">
      <Line data={chartData} options={options} />
    </div>
  );
}