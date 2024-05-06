export interface DailyData {
    date: string;
    temperatures: number[]; // Explicitly define type as number array
    averageTemperature: number;
  }