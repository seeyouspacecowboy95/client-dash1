import React, { useState, useEffect } from 'react';
import { Card, Title, DonutChart } from '@tremor/react';
import MessageDistributionChart from './MessageDistributionChart';

interface MessageMetrics {
  name: string;
  sms: number;
  email: number;
  whatsapp: number;
}

const valueFormatter = (number: number) => 
  Intl.NumberFormat("en-ZA").format(number).toString();

const CHANNEL_INDICATORS = [
  { name: 'SMS', color: 'bg-blue-500' },
  { name: 'Email', color: 'bg-emerald-500' },
  { name: 'WhatsApp', color: 'bg-purple-500' },
];

export default function ServiceDeliveryTracker() {
  const [messageMetrics, setMessageMetrics] = useState<MessageMetrics[]>([]);
  const [utilityStats, setUtilityStats] = useState<any[]>([]);

  useEffect(() => {
    // Simulated data for demonstration
    setMessageMetrics([
      {
        name: 'SMS',
        sms: 245,
        email: 50,
        whatsapp: 12,
      },
      {
        name: 'Email',
        sms: 320,
        email: 45,
        whatsapp: 8,
      },
      {
        name: 'WhatsApp',
        sms: 180,
        email: 30,
        whatsapp: 15,
      },
    ]);

    setUtilityStats([
      { name: 'Water', value: 35 },
      { name: 'Electricity', value: 45 },
      { name: 'Waste', value: 20 },
    ]);
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="p-6">
        <div className="flex flex-col space-y-4">
          <Title className="text-center">Distribution Stats (current month)</Title>
          <div className="flex items-center justify-center space-x-8">
            {CHANNEL_INDICATORS.map((channel) => (
              <div key={channel.name} className="flex items-center">
                <div className={`w-3 h-3 rounded-full ${channel.color} mr-2`}></div>
                <span className="text-sm font-medium">{channel.name}</span>
              </div>
            ))}
          </div>
        </div>
        <MessageDistributionChart data={messageMetrics} />
      </Card>

      <Card className="p-6">
        <Title>Utility Consumption Distribution</Title>
        <DonutChart
          className="mt-6 h-72"
          data={utilityStats}
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