import React, { useEffect, useState } from 'react';
import { Card, Metric, Text, AreaChart, Title, TabGroup, TabList, Tab } from '@tremor/react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { format, subDays, subMonths } from 'date-fns';

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
  `R ${Intl.NumberFormat("en-ZA").format(number).toString()}`;

export default function DashboardMetrics() {
  const [metrics, setMetrics] = useState<MetricData>({
    newUsers: 0,
    totalCustomers: 0,
    activeServices: 0,
    revenueCollected: 0,
  });
  const [selectedRange, setSelectedRange] = useState('7d');
  const [chartData, setChartData] = useState<any[]>([]);

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

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card decoration="top" decorationColor="indigo">
          <Text>New Users</Text>
          <Metric>{metrics.newUsers}</Metric>
        </Card>
        <Card decoration="top" decorationColor="green">
          <Text>Total Customers</Text>
          <Metric>{metrics.totalCustomers}</Metric>
        </Card>
        <Card decoration="top" decorationColor="orange">
          <Text>Active Services</Text>
          <Metric>{metrics.activeServices}</Metric>
        </Card>
        <Card decoration="top" decorationColor="blue">
          <Text>Revenue Collected</Text>
          <Metric>{valueFormatter(metrics.revenueCollected)}</Metric>
        </Card>
      </div>

      <Card>
        <div className="flex justify-between items-center mb-4">
          <Title>Service Performance Trends</Title>
          <TabGroup value={selectedRange} onValueChange={setSelectedRange}>
            <TabList variant="solid">
              {timeRanges.map((range) => (
                <Tab key={range.key} value={range.key}>
                  {range.label}
                </Tab>
              ))}
            </TabList>
          </TabGroup>
        </div>
        <AreaChart
          className="h-72 mt-4"
          data={chartData}
          index="date"
          categories={["Users", "Services", "Revenue"]}
          colors={["indigo", "orange", "blue"]}
          valueFormatter={valueFormatter}
          showLegend={true}
          showGridLines={true}
          showYAxis={true}
          showXAxis={true}
          startEndOnly={false}
        />
      </Card>
    </div>
  );
}