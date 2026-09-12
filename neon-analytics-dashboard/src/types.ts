export type MetricData = {
  id: string;
  title: string;
  value: string | number;
  unit?: string;
  trend: {
    direction: 'up' | 'down';
    value: string;
  };
  progress: number; // 0 to 100
  iconType: 'play' | 'target' | 'refresh' | 'activity';
};

export type SparklineData = {
  id: string;
  label: string;
  sublabel: string;
  topTrend: {
    direction: 'up' | 'down';
    value: string;
  };
  bottomTrend: {
    direction: 'up';
    value: string;
  };
  points: number[];
};

export type DayDataPoint = {
  day: number;
  points: number;
  heightRatio: number; // 0 to 1
  label: string;
  volume: number;
};
