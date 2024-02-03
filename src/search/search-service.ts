import MeiliSearch, { SearchResponse } from "meilisearch";
import { OFFERS_SLUG } from "../collections/offer";
import { Offer } from "../models/offer";
import { IndexedOffer, createFromOffer } from "./indexed-offer";
import { MEILI_MASTER_KEY, SETUP_MEILI } from "../config";
import { Brand } from "../models/brand";
import { getToday } from "../utils/get-today";
import { toUnix } from "../utils/to-unix";

export interface SearchOptions {
  term: string;
  limit?: number;
  page?: number;
}

export class SearchServiceImpl {
  private client: MeiliSearch | null = null;

  init() {
    this.client = new MeiliSearch({
      host: "http://127.0.0.1:7700",
      apiKey: MEILI_MASTER_KEY,
    });

    if (SETUP_MEILI) {
      this.setupOffersIndex();
    }
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

  async search({
    term,
    limit = 10,
    page = 1,
  }: SearchOptions): Promise<SearchResponse<IndexedOffer>> {
    const todayTimestamp = toUnix(getToday());
    return this.getOffersIndex().search(term, {
      limit,
      offset: page - 1,
      filter: [`expirationDate >= ${todayTimestamp}`],
    });
  }

  private setupOffersIndex() {
    this.getOffersIndex().updateFilterableAttributes(["expirationDate"]);
    this.getOffersIndex().updateSortableAttributes(["expirationDate"]);
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
}

export const SearchService = new SearchServiceImpl();
