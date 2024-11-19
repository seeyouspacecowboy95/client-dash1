import React, { useState, useEffect, lazy, Suspense } from 'react';

// Dynamically import react-apexcharts
const Chart = lazy(() => import('react-apexcharts'));

interface MessageMetrics {
  channel: string;
  value: number;
}

const CHANNEL_INDICATORS = [
  { name: 'SMS', color: '#3b82f6' },
  { name: 'Email', color: '#10b981' },
  { name: 'WhatsApp', color: '#8b5cf6' },
];

export default function ServiceDeliveryTracker() {
  const [messageMetrics, setMessageMetrics] = useState<MessageMetrics[]>([]);
  const [utilityStats, setUtilityStats] = useState<any[]>([]);

  useEffect(() => {
    setMessageMetrics([
      { channel: 'SMS', value: 245 },
      { channel: 'Email', value: 320 },
      { channel: 'WhatsApp', value: 180 },
    ]);

    setUtilityStats([
      { name: 'Water', value: 35 },
      { name: 'Electricity', value: 45 },
      { name: 'Waste', value: 20 },
    ]);
  }, []);

  const utilityChartOptions = {
    chart: {
      type: 'donut',
      height: 350,
    },
    labels: utilityStats.map(item => item.name),
    colors: ['#3b82f6', '#06b6d4', '#4f46e5'],
    legend: {
      position: 'bottom',
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex flex-col space-y-4">
          <h3 className="text-lg font-semibold text-center">Distribution Stats (current month)</h3>
          <div className="flex items-center justify-center space-x-8">
            {CHANNEL_INDICATORS.map((channel) => (
              <div key={channel.name} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: channel.color }}
                ></div>
                <span className="text-sm font-medium">{channel.name}</span>
              </div>
            ))}
          </div>
        </div>
        <Suspense fallback={<div>Loading chart...</div>}>
          <Chart
            options={{
              chart: {
                type: 'bar',
                height: 350,
                toolbar: {
                  show: false
                }
              },
              plotOptions: {
                bar: {
                  horizontal: false,
                  columnWidth: '55%',
                },
              },
              dataLabels: {
                enabled: false
              },
              xaxis: {
                categories: messageMetrics.map(item => item.channel),
              },
              yaxis: {
                title: {
                  text: 'Messages'
                }
              },
              colors: ['#3b82f6', '#10b981', '#8b5cf6'],
              tooltip: {
                y: {
                  formatter: (val: number) => val.toString()
                }
              }
            }}
            series={[{
              name: 'Messages',
              data: messageMetrics.map(item => item.value)
            }]}
            type="bar"
            height={350}
          />
        </Suspense>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Utility Consumption Distribution</h3>
        <Suspense fallback={<div>Loading chart...</div>}>
          <Chart
            options={utilityChartOptions}
            series={utilityStats.map(item => item.value)}
            type="donut"
            height={350}
          />
        </Suspense>
      </div>
    </div>
  );
}