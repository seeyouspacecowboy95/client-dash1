import React, { useState, useEffect, lazy, Suspense } from 'react';

const Chart = lazy(() => import('react-apexcharts'));

interface DemographicData {
  ageGroups: { name: string; value: number }[];
  geographicData: { category: string; Accounts: number; 'Book Value': number }[];
  servicePreferences: { name: string; value: number }[];
}

const DISTRIBUTION_INDICATORS = [
  { name: 'Accounts', color: '#3b82f6' },
  { name: 'Book Value', color: '#10b981' },
];

export default function DemographicsView() {
  const [demographics, setDemographics] = useState<DemographicData>({
    ageGroups: [],
    geographicData: [],
    servicePreferences: [],
  });

  useEffect(() => {
    setDemographics({
      ageGroups: [
        { name: '18-24', value: 15 },
        { name: '25-34', value: 30 },
        { name: '35-44', value: 25 },
        { name: '45-54', value: 20 },
        { name: '55+', value: 10 },
      ],
      geographicData: [
        {
          category: 'Distribution',
          Accounts: 65,
          'Book Value': 78,
        },
      ],
      servicePreferences: [
        { name: 'Online Services', value: 45 },
        { name: 'In-Person', value: 30 },
        { name: 'Mobile App', value: 25 },
      ],
    });
  }, []);

  const ageChartOptions = {
    chart: { type: 'donut', height: 350 },
    labels: demographics.ageGroups.map(item => item.name),
    colors: ['#64748b', '#8b5cf6', '#4f46e5', '#f43f5e', '#06b6d4'],
    legend: { position: 'bottom' },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: { width: 200 },
          legend: { position: 'bottom' },
        },
      },
    ],
  };

  const distributionChartOptions = {
    chart: { type: 'bar', height: 350, toolbar: { show: false } },
    plotOptions: { bar: { horizontal: false, columnWidth: '55%' } },
    dataLabels: { enabled: false },
    stroke: { show: true, width: 2, colors: ['transparent'] },
    xaxis: { categories: ['Distribution'] },
    yaxis: {
      title: { text: 'Percentage (%)' },
      min: 0,
      max: 100,
      tickAmount: 10,
    },
    fill: { opacity: 1 },
    colors: ['#3b82f6', '#10b981'],
    tooltip: { y: { formatter: (val: number) => `${val}%` } },
  };

  const serviceChartOptions = {
    chart: { type: 'donut', height: 350 },
    labels: demographics.servicePreferences.map(item => item.name),
    colors: ['#3b82f6', '#06b6d4', '#4f46e5'],
    legend: { position: 'bottom' },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: { width: 200 },
          legend: { position: 'bottom' },
        },
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Suspense fallback={<div>Loading charts...</div>}>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Age Distribution</h3>
          <Chart
            options={ageChartOptions}
            series={demographics.ageGroups.map(item => item.value)}
            type="donut"
            height={350}
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold text-center">
              Accounts VS Book Value
            </h3>
            <div className="flex items-center justify-center space-x-8">
              {DISTRIBUTION_INDICATORS.map(indicator => (
                <div key={indicator.name} className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: indicator.color }}
                  ></div>
                  <span className="text-sm font-medium">{indicator.name}</span>
                </div>
              ))}
            </div>
          </div>
          <Chart
            options={distributionChartOptions}
            series={[
              {
                name: 'Accounts',
                data: [demographics.geographicData[0]?.Accounts || 0],
              },
              {
                name: 'Book Value',
                data: [demographics.geographicData[0]?.['Book Value'] || 0],
              },
            ]}
            type="bar"
            height={350}
          />
          <div className="flex justify-around mt-4">
            <div className="text-center">
              <span
                className="text-sm font-semibold"
                style={{ color: '#3b82f6' }}
              >
                {demographics.geographicData[0]?.Accounts}%
              </span>
              <p className="text-xs text-gray-600">Accounts</p>
            </div>
            <div className="text-center">
              <span
                className="text-sm font-semibold"
                style={{ color: '#10b981' }}
              >
                {demographics.geographicData[0]?.['Book Value']}%
              </span>
              <p className="text-xs text-gray-600">Book Value</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Service Preferences</h3>
          <Chart
            options={serviceChartOptions}
            series={demographics.servicePreferences.map(item => item.value)}
            type="donut"
            height={350}
          />
        </div>
      </Suspense>
    </div>
  );
}