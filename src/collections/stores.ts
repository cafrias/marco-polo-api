import { CollectionConfig } from "payload/types";

export const STORES_SLUG = "stores";

const Stores: CollectionConfig = {
  slug: STORES_SLUG,
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "location",
      type: "point",
      required: true,
    },
    {
      name: "address",
      type: "text",
    },
    {
      name: "phone",
      type: "text",
    },
    {
      name: "email",
      type: "email",
    },
    {
      name: "urls",
      type: "array",
      fields: [
        {
          name: "type",
          type: "select",
          options: ["facebook", "instagram", "website", "tiktok"],
          required: true,
        },
        {
          name: "url",
          type: "text",
          required: true,
        },
      ],
    },
  ],
};

export default Stores;
