import type { URLTypes } from "./url-types";

export interface Store {
  id: string;
  name: string;
  location: [number, number];
  address?: string;
  phone?: string;
  email?: string;
  urls: Array<{ type: URLTypes; url: string }>;
}
