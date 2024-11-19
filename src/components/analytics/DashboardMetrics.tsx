import React, { useEffect, useState } from 'react';
import ApexCharts from 'react-apexcharts';
import { format, subDays } from 'date-fns';

interface MetricData {
  newUsers: number;
  totalCustomers: number;
  activeServices: number;
  revenueCollected: number;
}

const timeRanges = [
  { key: '7d', label: '7D', days: 7 },
  { key: '30d', label: '30D', days: 30 },
  { key: '3m', label: '3M', days: 90 },
  { key: '6m', label: '6M', days: 180 },
  { key: '12m', label: '12M', days: 365 },
];

const valueFormatter = (number: number) =>
  `R ${Intl.NumberFormat('en-ZA').format(number).toString()}`;

export default function DashboardMetrics() {
  const [metrics, setMetrics] = useState<MetricData>({
    newUsers: 0,
    totalCustomers: 0,
    activeServices: 0,
    revenueCollected: 0,
  });
  const [selectedRange, setSelectedRange] = useState('7d');
  const [chartData, setChartData] = useState<{ date: string; Users: number; Services: number; Revenue: number }[]>([]);

  useEffect(() => {
    // Simulated data for demonstration
    const simulatedData = Array.from({ length: 30 }, (_, i) => ({
      date: format(subDays(new Date(), 29 - i), 'MMM dd'),
      Users: Math.floor(Math.random() * 100) + 50,
      Services: Math.floor(Math.random() * 200) + 100,
      Revenue: Math.floor(Math.random() * 50000) + 10000,
    }));

    setChartData(simulatedData);
    setMetrics({
      newUsers: 156,
      totalCustomers: 2489,
      activeServices: 1876,
      revenueCollected: 234567,
    });
  }, [selectedRange]);

  const areaChartOptions = {
    chart: {
      type: 'area',
      height: 350,
    },
    xaxis: {
      categories: chartData.map((data) => data.date),
      labels: {
        rotate: -45,
      },
    },
    yaxis: {
      title: {
        text: 'Values',
      },
    },
    colors: ['#6366F1', '#F97316', '#3B82F6'],
    tooltip: {
      y: {
        formatter: (val: number) => valueFormatter(val),
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.3,
      },
    },
  };

  const areaChartSeries = [
    {
      name: 'Users',
      data: chartData.map((data) => data.Users),
    },
    {
      name: 'Services',
      data: chartData.map((data) => data.Services),
    },
    {
      name: 'Revenue',
      data: chartData.map((data) => data.Revenue),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="p-4 bg-white rounded-lg shadow">
          <p className="text-sm font-medium text-gray-500">New Users</p>
          <p className="text-xl font-bold">{metrics.newUsers}</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <p className="text-sm font-medium text-gray-500">Total Customers</p>
          <p className="text-xl font-bold">{metrics.totalCustomers}</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <p className="text-sm font-medium text-gray-500">Active Services</p>
          <p className="text-xl font-bold">{metrics.activeServices}</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <p className="text-sm font-medium text-gray-500">Revenue Collected</p>
          <p className="text-xl font-bold">{valueFormatter(metrics.revenueCollected)}</p>
        </div>
      </div>

      <div className="p-6 bg-white rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Service Performance Trends</h3>
          <div className="flex space-x-4">
            {timeRanges.map((range) => (
              <button
                key={range.key}
                onClick={() => setSelectedRange(range.key)}
                className={`px-4 py-2 text-sm font-medium rounded ${
                  selectedRange === range.key ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>
        <ApexCharts options={areaChartOptions} series={areaChartSeries} type="area" height={350} />
      </div>
    </div>
  );
}