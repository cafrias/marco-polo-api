import { CollectionConfig } from "payload/types";
import { BRANDS_SLUG } from "./brands";
import { STORES_SLUG } from "./stores";
import { SearchService } from "../search/search-service";
import { Offer } from "../models/offer";
import { Brand } from "../models/brand";

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
        const limit = parseInt(`${req.query.limit}`, 10);
        const page = parseInt(`${req.query.page}`, 10);

        res.status(200).send(
          await req.payload.find({
            collection: OFFERS_SLUG,
            sort: "-expirationDate",
            where: {
              expirationDate: {
                greater_than_equal: new Date(),
              },
            },
            limit: isNaN(limit) ? undefined : limit,
            page: isNaN(page) ? undefined : page,
          })
        );
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
