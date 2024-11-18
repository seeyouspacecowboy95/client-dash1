import React from 'react';
import { BarChart } from '@tremor/react';

interface MessageMetrics {
  name: string;
  sms: number;
  email: number;
  whatsapp: number;
}

interface Props {
  data: MessageMetrics[];
}

const valueFormatter = (number: number) => 
  Intl.NumberFormat("en-ZA").format(number).toString();

const MessageDistributionChart: React.FC<Props> = ({ data }) => {
  return (
    <BarChart
      className="mt-6 h-72"
      data={data}
      index="name"
      categories={["sms", "email", "whatsapp"]}
      colors={["blue-500", "emerald-500", "purple-500"]}
      valueFormatter={valueFormatter}
      stack={false}
      showLegend={false}
      showGridLines={true}
      showYAxis={true}
      showXAxis={true}
    />
  );
};

export default MessageDistributionChart;