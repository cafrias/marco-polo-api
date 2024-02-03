import { round } from "./round";

export function toUnix(date: Date): number {
  return round(date.getTime() / 1000);
}
