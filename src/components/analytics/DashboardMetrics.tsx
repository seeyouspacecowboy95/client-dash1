import React, { useEffect, useState } from 'react';
import {
  Card,
  Metric,
  Text,
  AreaChart,
  Title,
  TabGroup,
  TabList,
  Tab,
} from '@tremor/react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
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
    // Real-time metrics listener
    const metricsRef = collection(db, 'metrics');
    const unsubscribe = onSnapshot(metricsRef, (snapshot) => {
      const data = snapshot.docs[0]?.data() as MetricData;
      setMetrics(
        data || {
          newUsers: 0,
          totalCustomers: 0,
          activeServices: 0,
          revenueCollected: 0,
        }
      );
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Fetch time-series data based on selected range
    const range = timeRanges.find((r) => r.key === selectedRange)!;
    const startDate = subDays(new Date(), range.days);

    const timeseriesRef = collection(db, 'timeseries');
    const timeQuery = query(timeseriesRef, where('date', '>=', startDate));

    const unsubscribe = onSnapshot(timeQuery, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        date: format(doc.data().date.toDate(), 'MMM dd'),
        users: doc.data().users,
        services: doc.data().services,
        revenue: doc.data().revenue,
      }));
      setChartData(data);
    });

    return () => unsubscribe();
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
          <Metric>R {metrics.revenueCollected.toLocaleString()}</Metric>
        </Card>
      </div>

      <Card>
        <div className="flex justify-between items-center mb-4">
          <Title>Service Performance Trends</Title>
          <TabGroup>
            <TabList variant="solid">
              {timeRanges.map((range) => (
                <Tab
                  key={range.key}
                  onClick={() => setSelectedRange(range.key)}
                >
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
          categories={['users', 'services', 'revenue']}
          colors={['indigo', 'orange', 'blue']}
        />
      </Card>
    </div>
  );
}
