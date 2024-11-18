import React, { useState, useEffect } from 'react';
import { Card, Title, BarList, DonutChart } from '@tremor/react';

interface DemographicData {
  ageGroups: { name: string; value: number }[];
  locations: { name: string; value: number }[];
  servicePreferences: { name: string; value: number }[];
}

const valueFormatter = (number: number) => 
  Intl.NumberFormat("en-ZA").format(number).toString();

export default function DemographicsView() {
  const [demographics, setDemographics] = useState<DemographicData>({
    ageGroups: [],
    locations: [],
    servicePreferences: [],
  });

  useEffect(() => {
    // Simulated data for demonstration
    setDemographics({
      ageGroups: [
        { name: '18-24', value: 15 },
        { name: '25-34', value: 30 },
        { name: '35-44', value: 25 },
        { name: '45-54', value: 20 },
        { name: '55+', value: 10 },
      ],
      locations: [
        { name: 'Central District', value: 456 },
        { name: 'Northern Region', value: 351 },
        { name: 'Southern Area', value: 271 },
        { name: 'Eastern Zone', value: 191 },
        { name: 'Western District', value: 178 },
      ],
      servicePreferences: [
        { name: 'Online Services', value: 45 },
        { name: 'In-Person', value: 30 },
        { name: 'Mobile App', value: 25 },
      ],
    });
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card>
        <Title>Age Distribution</Title>
        <DonutChart
          className="mt-6 h-72"
          data={demographics.ageGroups}
          category="value"
          index="name"
          valueFormatter={valueFormatter}
          colors={["slate", "violet", "indigo", "rose", "cyan"]}
          showLabel={true}
          showAnimation={true}
        />
      </Card>

      <Card>
        <Title>Geographic Distribution</Title>
        <BarList
          data={demographics.locations}
          className="mt-6"
          valueFormatter={valueFormatter}
        />
      </Card>

      <Card>
        <Title>Service Preferences</Title>
        <DonutChart
          className="mt-6 h-72"
          data={demographics.servicePreferences}
          category="value"
          index="name"
          valueFormatter={valueFormatter}
          colors={["blue", "cyan", "indigo"]}
          showLabel={true}
          showAnimation={true}
        />
      </Card>
    </div>
  );
}