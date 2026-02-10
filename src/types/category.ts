export type Category = {
  id: string;
  name: string;
  slug: string;
  parentSlug?: string | null;
  measurementSystem?: string | null;
  children?: Category[];
};
