import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    id: uuid(),
    category: "Men's Fashion",
  },
  {
    id: uuid(),
    category: "Women's Fashion",
  },
  {
    id: uuid(),
    category: "Kids' Fashion",
  },
  {
    id: uuid(),
    category: "Beauty",
  },
];
