import MeiliSearch from "meilisearch";
import { OFFERS_SLUG } from "../collections/offer";
import { Offer } from "../models/offer";
import { createFromOffer } from "./indexed-offer";
import { MEILI_MASTER_KEY } from "../config";
import { Brand } from "../models/brand";

export class SearchServiceImpl {
  private client: MeiliSearch | null = null;

  init() {
    this.client = new MeiliSearch({
      host: "http://127.0.0.1:7700",
      apiKey: MEILI_MASTER_KEY,
    });
  }

  private getClient() {
    if (!this.client) {
      throw new Error("Not initialized");
    }

    return this.client;
  }

  private getOffersIndex() {
    return this.getClient().index(OFFERS_SLUG);
  }

  async createOffer(offer: Offer, brand: Brand) {
    this.getOffersIndex().addDocuments([createFromOffer(offer, brand)]);
  }

  async updateOffer(offer: Offer, brand: Brand) {
    this.getOffersIndex().updateDocuments([createFromOffer(offer, brand)]);
  }

  async deleteOffer(offer: Offer) {
    this.getOffersIndex().deleteDocument(offer.id);
  }
}

export const SearchService = new SearchServiceImpl();
