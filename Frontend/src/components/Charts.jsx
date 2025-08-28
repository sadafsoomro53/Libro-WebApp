import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Charts = ({ timePeriod = 'weekly' }) => {
  // Sample data for different time periods
  const dataByPeriod = {
    weekly: {
      sales: [12000, 19000, 3000, 5000, 2000, 3000, 8000],
      categories: ['Fiction', 'Non-Fiction', 'Educational', 'Children', 'Science', 'History', 'Biography'],
      transactions: [45, 78, 23, 56, 34, 67, 89],
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    monthly: {
      sales: [45000, 52000, 48000, 61000],
      categories: ['Fiction', 'Non-Fiction', 'Educational', 'Others'],
      transactions: [234, 345, 278, 412],
      weeks: ['Week 1', 'Week 2', 'Week 3', 'Week 4']
    },
    yearly: {
      sales: [1250000, 980000, 1560000, 890000, 1120000, 1450000],
      categories: ['Fiction', 'Non-Fiction', 'Educational', 'Children', 'Science', 'Others'],
      transactions: [1234, 987, 1567, 890, 1123, 1456],
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    }
  };

  const currentData = dataByPeriod[timePeriod];

  // Bar chart options
  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Sales by ${timePeriod === 'weekly' ? 'Day' : timePeriod === 'monthly' ? 'Week' : 'Month'} - ${timePeriod.charAt(0).toUpperCase() + timePeriod.slice(1)}`,
      },
    },
    maintainAspectRatio: false,
  };

  // Pie chart options
  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: `Category Distribution - ${timePeriod.charAt(0).toUpperCase() + timePeriod.slice(1)}`,
      },
    },
    maintainAspectRatio: false,
  };

  // Bar chart data
  const barData = {
    labels: timePeriod === 'weekly' ? currentData.days : 
            timePeriod === 'monthly' ? currentData.weeks : 
            currentData.months.slice(0, 6), // Show first 6 months for yearly
    datasets: [
      {
        label: 'Sales (PKR)',
        data: currentData.sales,
        backgroundColor: 'rgba(15, 150, 156, 0.8)',
        borderColor: 'rgba(15, 150, 156, 1)',
        borderWidth: 1,
      },
      {
        label: 'Transactions',
        data: currentData.transactions,
        backgroundColor: 'rgba(21, 40, 46, 0.8)',
        borderColor: 'rgba(21, 40, 46, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Pie chart data
  const pieData = {
    labels: currentData.categories,
    datasets: [
      {
        label: 'Sales Distribution',
        data: currentData.sales.slice(0, currentData.categories.length),
        backgroundColor: [
          'rgba(15, 150, 156, 0.8)',
          'rgba(21, 40, 46, 0.8)',
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
        ],
        borderColor: [
          'rgba(15, 150, 156, 1)',
          'rgba(21, 40, 46, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="row g-4">
      {/* Bar Chart */}
      <div className="col-12 col-lg-8">
        <div className="bg-white rounded p-4 shadow" style={{ height: '400px' }}>
          <Bar data={barData} options={barOptions} />
        </div>
      </div>

      {/* Pie Chart */}
      <div className="col-12 col-lg-4">
        <div className="bg-white rounded p-4 shadow" style={{ height: '400px' }}>
          <Pie data={pieData} options={pieOptions} />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="col-12">
        <div className="row g-3">
          <div className="col-6 col-md-3">
            <div className="bg-white rounded p-3 shadow text-center">
              <h6 className="text-muted mb-1">Total Sales</h6>
              <h4 className="fw-bold text-primary">
                PKR {currentData.sales.reduce((a, b) => a + b, 0).toLocaleString()}
              </h4>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="bg-white rounded p-3 shadow text-center">
              <h6 className="text-muted mb-1">Total Transactions</h6>
              <h4 className="fw-bold text-dark">
                {currentData.transactions.reduce((a, b) => a + b, 0)}
              </h4>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="bg-white rounded p-3 shadow text-center">
              <h6 className="text-muted mb-1">Avg. Sale</h6>
              <h4 className="fw-bold text-success">
                PKR {Math.round(currentData.sales.reduce((a, b) => a + b, 0) / currentData.sales.length).toLocaleString()}
              </h4>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="bg-white rounded p-3 shadow text-center">
              <h6 className="text-muted mb-1">Top Category</h6>
              <h4 className="fw-bold text-info">
                {currentData.categories[currentData.sales.indexOf(Math.max(...currentData.sales))]}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;
