export interface DefaultStat {
  id?: string;
  name: string;
  abv: string;
}
export interface Statistic extends DefaultStat {
  userId?: string;
  total: number;
  current: number;
}
