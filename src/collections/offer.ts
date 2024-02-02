import { CollectionConfig } from "payload/types";
import { BRANDS_SLUG } from "./brands";
import { STORES_SLUG } from "./stores";
import { SearchService } from "../search/search-service";
import { Offer } from "../models/offer";
import { Brand } from "../models/brand";
import { parseIntOrUndefined } from "../utils/parse-int-or-undefined";

export const OFFERS_SLUG = "offers";

const Offer: CollectionConfig = {
  slug: OFFERS_SLUG,
  admin: {
    useAsTitle: "name",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "qty",
      type: "number",
      label: "Quantity",
      defaultValue: 1,
    },
    {
      name: "price",
      type: "group",
      fields: [
        {
          name: "currency",
          type: "select",
          options: ["ARS"],
          required: true,
          defaultValue: "ARS",
        },
        {
          name: "amount",
          type: "number",
          required: true,
        },
      ],
    },
    {
      name: "expirationDate",
      type: "date",
      required: true,
      label: "Expiration Date",
    },
    {
      name: "pictureURL",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "store",
      type: "relationship",
      required: true,
      relationTo: STORES_SLUG,
      hasMany: false,
      maxDepth: 1,
    },
    {
      name: "brand",
      type: "relationship",
      required: true,
      relationTo: BRANDS_SLUG,
      hasMany: false,
      maxDepth: 1,
    },
  ],
  endpoints: [
    {
      path: "/latest",
      method: "get",
      handler: async (req, res, next) => {
        const limit = parseIntOrUndefined(req.query.limit);
        const page = parseIntOrUndefined(req.query.page);

        res.status(200).send(
          await req.payload.find({
            collection: OFFERS_SLUG,
            sort: "expirationDate",
            where: {
              expirationDate: {
                greater_than_equal: new Date(),
              },
            },
            limit,
            page,
          })
        );
      },
    },
    {
      path: "/search",
      method: "get",
      handler: async (req, res, next) => {
        const limit = parseIntOrUndefined(req.query.limit);
        const page = parseIntOrUndefined(req.query.page);

        const term = req.query.q;
        if (!term) {
          return res.status(400).send({
            reason: "`q` query string param is missing",
          });
        }

        if (typeof term !== "string") {
          return res.status(400).send({
            reason: "`q` query string param must be a string",
          });
        }

        try {
          const indexedResults = await SearchService.search({
            term,
            limit,
            page,
          });

          const ids = indexedResults.hits.map(({ id }) => id);

          const results = await req.payload.find({
            collection: OFFERS_SLUG,
            limit,
            sort: "expirationDate",
            where: {
              id: {
                in: ids.join(","),
              },
            },
          });

          res.status(200).send(results);
        } catch (err) {
          console.error(err);
          res.status(500).send();
        }
      },
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {
        const brand = (await req.payload.findByID({
          collection: BRANDS_SLUG,
          id: (doc as Offer).brand,
        })) as unknown as Brand;
        try {
          if (operation === "create") {
            await SearchService.createOffer(doc as Offer, brand);
          } else {
            // TODO: update only when indexed fields are updated.
            await SearchService.updateOffer(doc as Offer, brand);
          }
        } catch (err) {
          console.error(err);
        }

        return doc;
      },
    ],
    afterDelete: [
      async ({ doc }) => {
        try {
          SearchService.deleteOffer(doc as Offer);
        } catch (err) {
          console.error(err);
        }

        return doc;
      },
    ],
  },
};

export default Offer;
