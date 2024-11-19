import React, { useState, useEffect } from 'react';
import { Card, Title, DonutChart, BarChart } from '@tremor/react';

interface DemographicData {
  ageGroups: { name: string; value: number }[];
  geographicData: { category: string; Accounts: number; 'Book Value': number }[];
  servicePreferences: { name: string; value: number }[];
}

const valueFormatter = (number: number) => `${number}%`;

const DISTRIBUTION_INDICATORS = [
  { name: 'Accounts', color: 'bg-blue-500' },
  { name: 'Book Value', color: 'bg-emerald-500' },
];

export default function DemographicsView() {
  const [demographics, setDemographics] = useState<DemographicData>({
    ageGroups: [],
    geographicData: [],
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
      geographicData: [
        {
          category: 'Distribution',
          'Accounts': 65,
          'Book Value': 78,
        }
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
        <div className="flex flex-col space-y-4">
          <Title className="text-center">Accounts VS Book Value</Title>
          <div className="flex items-center justify-center space-x-8">
            {DISTRIBUTION_INDICATORS.map((indicator) => (
              <div key={indicator.name} className="flex items-center">
                <div className={`w-3 h-3 rounded-full ${indicator.color} mr-2`}></div>
                <span className="text-sm font-medium">{indicator.name}</span>
              </div>
            ))}
          </div>
        </div>
        <BarChart
          className="mt-6 h-72"
          data={demographics.geographicData}
          index="category"
          categories={["Accounts", "Book Value"]}
          colors={["blue", "emerald"]}
          valueFormatter={valueFormatter}
          showLegend={false}
          showGridLines={true}
          startEndOnly={false}
          minValue={0}
          maxValue={100}
          yAxisWidth={40}
        />
        <div className="flex justify-around mt-4">
          <div className="text-center">
            <span className="text-sm font-semibold text-blue-500">
              {demographics.geographicData[0]?.Accounts}%
            </span>
            <p className="text-xs text-gray-600">Accounts</p>
          </div>
          <div className="text-center">
            <span className="text-sm font-semibold text-emerald-500">
              {demographics.geographicData[0]?.['Book Value']}%
            </span>
            <p className="text-xs text-gray-600">Book Value</p>
          </div>
        </div>
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