import { Brand } from "../models/brand";
import { Offer } from "../models/offer";
import { toUnix } from "../utils/to-unix";

export interface IndexedOffer {
  id: string;
  name: string;
  brandName: string;
  /**
   * UNIX timestamp
   */
  expirationDate: number;
}

export function createFromOffer(offer: Offer, brand: Brand): IndexedOffer {
  return {
    id: offer.id,
    name: offer.name,
    brandName: brand.name,
    expirationDate: toUnix(new Date(offer.expirationDate)),
  };
}
