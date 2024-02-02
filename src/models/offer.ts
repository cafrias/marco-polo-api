import type { Money } from "./money";
import { Picture } from "./picture";
import type { Store } from "./store";

export interface Offer {
  id: string;

  name: string;

  price: Money;

  qty: number;

  /**
   * ID to the `brands` collection
   */
  brand: string;

  /**
   * Date in ISO string format
   */
  expirationDate: string;

  /**
   * ID to the `media` collection
   */
  pictureURL: string;

  /**
   * ID to the `stores` collection
   */
  store: string;
}
