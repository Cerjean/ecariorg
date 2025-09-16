import React from 'react';
import ReactECharts from 'echarts-for-react';
import { motion } from 'framer-motion';

interface InscriptionChartProps {
  data: number[];
  labels: string[];
}

const InscriptionChart: React.FC<InscriptionChartProps> = ({ data, labels }) => {
  const option = {
    grid: { top: 40, right: 30, bottom: 30, left: 50 },
    xAxis: {
      type: 'category',
      data: labels,
      axisLine: {
        lineStyle: {
          color: '#A1A1AA'
        }
      },
      axisLabel: {
        color: '#71717A'
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: '#71717A'
      },
      splitLine: {
        lineStyle: {
          color: '#E4E4E7'
        }
      }
    },
    tooltip: {
      trigger: 'axis',
      formatter: '{b}: <strong>{c} inscriptions</strong>'
    },
    series: [
      {
        data: data,
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        itemStyle: {
          color: '#0A2D6E' // ucao-blue
        },
        lineStyle: {
          width: 3,
          color: '#0A2D6E'
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: 'rgba(10, 45, 110, 0.3)' // ucao-blue with opacity
            }, {
              offset: 1, color: 'rgba(10, 45, 110, 0)'
            }]
          }
        }
      },
    ],
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white p-6 rounded-lg shadow-md h-full"
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Évolution des inscriptions</h3>
      <div style={{ height: '350px' }}>
        <ReactECharts option={option} style={{ height: '100%' }} notMerge={true} lazyUpdate={true} />
      </div>
    </motion.div>
  );
};

export default InscriptionChart;
