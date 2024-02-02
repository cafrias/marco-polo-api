import type { SupportedCurrencies } from "./supported-currencies";

export interface Money {
  readonly currency: SupportedCurrencies;
  readonly amount: number;
}
