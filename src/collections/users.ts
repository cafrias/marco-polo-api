import { CollectionConfig } from "payload/types";

export const USERS_SLUG = "users";

const Users: CollectionConfig = {
  slug: USERS_SLUG,
  auth: true,
  admin: {
    useAsTitle: "email",
  },
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
};

export default Users;
