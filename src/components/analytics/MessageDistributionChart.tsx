import React from 'react';
import { BarChart } from '@tremor/react';

interface MessageMetrics {
  channel: string;
  value: number;
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
      index="channel"
      categories={["value"]}
      colors={["blue-500", "emerald-500", "purple-500"]}
      valueFormatter={valueFormatter}
      showLegend={false}
      showGridLines={true}
      showYAxis={true}
      showXAxis={true}
    />
  );
};

export default MessageDistributionChart;