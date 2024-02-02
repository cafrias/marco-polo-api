import { parseStrBoolean } from "./utils/parse-str-boolean";

export const MEILI_MASTER_KEY = process.env.MEILI_MASTER_KEY;

export const SETUP_MEILI = parseStrBoolean(process.env.SETUP_MEILI);
