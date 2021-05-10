import React from 'react';
import { Bar } from 'react-chartjs-2';

export const BarChart = ({ datasets }) => {
  return (
    <Bar
      data={datasets}
      width={600}
      height={400}
      options={{
        maintainAspectRatio: false,
      }}
    />
  );
};

export default BarChart;
