import { CollectionConfig } from "payload/types";

const Brands: CollectionConfig = {
  slug: "brands",
  auth: false,
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
