import React, { useState, useEffect } from 'react';
import { Card, Title, BarList, DonutChart, Grid } from '@tremor/react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

interface DemographicGroup {
  name: string;
  value: number;
}

interface DemographicData {
  ageGroups: DemographicGroup[];
  locations: DemographicGroup[];
  servicePreferences: DemographicGroup[];
}

export default function DemographicsView() {
  const [demographics, setDemographics] = useState<DemographicData>({
    ageGroups: [],
    locations: [],
    servicePreferences: [],
  });

  useEffect(() => {
    const demographicsRef = collection(db, 'demographics');
    const unsubscribe = onSnapshot(demographicsRef, (snapshot) => {
      const data = snapshot.docs.reduce((acc, doc) => {
        const type = doc.id as keyof DemographicData; // Ensure doc.id matches a valid key
        const values = doc.data().values as DemographicGroup[]; // Type assertion for values
        if (type in acc) {
          acc[type] = values;
        }
        return acc;
      }, {
        ageGroups: [],
        locations: [],
        servicePreferences: [],
      } as DemographicData);

      setDemographics(data);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Grid numItems={1} numItemsSm={2} numItemsLg={3} className="gap-6">
      <Card>
        <Title>Age Distribution</Title>
        <DonutChart
          className="mt-6"
          data={demographics.ageGroups}
          category="value"
          index="name"
          colors={["slate", "violet", "indigo", "rose", "cyan", "amber"]}
        />
      </Card>

      <Card>
        <Title>Geographic Distribution</Title>
        <BarList
          data={demographics.locations}
          className="mt-6"
        />
      </Card>

      <Card>
        <Title>Service Preferences</Title>
        <DonutChart
          className="mt-6"
          data={demographics.servicePreferences}
          category="value"
          index="name"
          colors={["blue", "cyan", "indigo"]}
        />
      </Card>
    </Grid>
  );
}
