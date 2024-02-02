import { CollectionConfig } from "payload/types";
import { BRANDS_SLUG } from "./Brands";
import { STORES_SLUG } from "./Stores";

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
};

export default Offer;
