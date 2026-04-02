import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

const palette = ['#0f9d7a', '#0f172a', '#38bdf8', '#f59e0b', '#ef4444', '#8b5cf6'];

ChartJS.register(ArcElement, Tooltip, Legend);

export default function CategoryPieChart({ data }) {
  const chartData = {
    labels: data.map((entry) => entry.category),
    datasets: [
      {
        data: data.map((entry) => entry.total),
        backgroundColor: data.map((_, index) => palette[index % palette.length]),
        borderWidth: 0
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  };

  return (
    <div className="h-80 w-full">
      <Pie data={chartData} options={options} />
    </div>
  );
}