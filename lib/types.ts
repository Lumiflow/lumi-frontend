export interface IStream {
  claimed: number;
  endTime: number;
  startTime: number;
  total: number;
  receiver: string;
  sender: string;
  token?: string;
  velocity: number;
  out: boolean;
  uuid: string;
}
