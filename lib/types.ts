export interface IStream {
  claimed: number;
  endTime: number;
  startTime: number;
  total: number;
  receiver: string;
  token?: string;
  velocity: number;
  out: boolean;
}
