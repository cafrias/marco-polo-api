import { CollectionConfig } from "payload/types";

export const BRANDS_SLUG = "brands";

const Brands: CollectionConfig = {
  slug: BRANDS_SLUG,
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
  ],
};

export default Brands;
