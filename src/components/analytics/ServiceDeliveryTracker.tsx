import React, { useState, useEffect } from 'react';
import { Card, Title, BarChart, DonutChart, Grid } from '@tremor/react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

interface ServiceMetrics {
  name: string;
  completed: number;
  pending: number;
  delayed: number;
}

export default function ServiceDeliveryTracker() {
  const [serviceMetrics, setServiceMetrics] = useState<ServiceMetrics[]>([]);
  const [utilityStats, setUtilityStats] = useState<any[]>([]);

  useEffect(() => {
    // Real-time service delivery metrics
    const servicesRef = collection(db, 'serviceDelivery');
    const unsubscribe = onSnapshot(servicesRef, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        name: doc.data().name,
        completed: doc.data().completed,
        pending: doc.data().pending,
        delayed: doc.data().delayed,
      }));
      setServiceMetrics(data);
    });

    // Real-time utility consumption stats
    const utilityRef = collection(db, 'utilityConsumption');
    const utilityUnsubscribe = onSnapshot(utilityRef, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        name: doc.data().utility,
        value: doc.data().consumption,
      }));
      setUtilityStats(data);
    });

    return () => {
      unsubscribe();
      utilityUnsubscribe();
    };
  }, []);

  return (
    <Grid numItems={1} numItemsSm={2} numItemsLg={2} className="gap-6">
      <Card>
        <Title>Service Delivery Status</Title>
        <BarChart
          className="mt-6"
          data={serviceMetrics}
          index="name"
          categories={["completed", "pending", "delayed"]}
          colors={["emerald", "amber", "red"]}
          stack={true}
        />
      </Card>

      <Card>
        <Title>Utility Consumption Distribution</Title>
        <DonutChart
          className="mt-6"
          data={utilityStats}
          category="value"
          index="name"
          colors={["blue", "cyan", "indigo"]}
        />
      </Card>
    </Grid>
  );
}