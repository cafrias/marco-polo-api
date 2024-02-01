import { CollectionConfig } from "payload/types";

export type URLTypes = "facebook" | "instagram" | "website" | "tiktok";

export interface Stores {
  id: string;
  name: string;
  location: { lat: number; lng: number };
  address?: string;
  phone?: string;
  email?: string;
  urls: Array<{ type: URLTypes; url: string }>;
}

const Stores: CollectionConfig = {
  slug: "stores",
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
