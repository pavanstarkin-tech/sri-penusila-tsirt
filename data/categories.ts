export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  iconName?: string;
  count?: number;
}

export const homeCategoryPills: CategoryItem[] = [
  { id: "new-collection", name: "✨ New Collection", slug: "new-collection" },
  { id: "kurta", name: "Kurtas", slug: "kurta" },
  { id: "kanduva", name: "Kanduvas", slug: "kanduva" },
  { id: "flag", name: "Flags", slug: "flag" },
  { id: "trending", name: "Trending", slug: "trending" },
  { id: "college", name: "College", slug: "college" },
  { id: "birthday", name: "Birthday", slug: "birthday" },
  { id: "business", name: "Business", slug: "business" },
  { id: "couples", name: "Couples", slug: "couple" }
];

export const storeSidebarCategories: CategoryItem[] = [
  { id: "all", name: "All Products", slug: "all", count: 76 },
  { id: "new-collection", name: "✨ New Collection", slug: "new-collection", count: 16 },
  { id: "kurta", name: "Kurtas", slug: "kurta", count: 8 },
  { id: "kanduva", name: "Kanduvas", slug: "kanduva", count: 4 },
  { id: "flag", name: "Flags", slug: "flag", count: 2 },
  { id: "trending", name: "Trending Now", slug: "trending", count: 24 },
  { id: "birthday", name: "Birthday", slug: "birthday", count: 12 },
  { id: "college", name: "College Events", slug: "college", count: 16 },
  { id: "team", name: "Team & Group", slug: "team", count: 14 },
  { id: "couple", name: "Couple T-Shirts", slug: "couple", count: 10 },
  { id: "business", name: "Business / Corporate", slug: "business", count: 18 },
  { id: "festival", name: "Festival Special", slug: "festival", count: 8 },
  { id: "motivational", name: "Motivational", slug: "motivational", count: 20 },
  { id: "funny", name: "Funny & Quote", slug: "funny", count: 12 },
  { id: "custom", name: "Custom Design", slug: "custom", count: 8 }
];

export const designsCategoryTabs: CategoryItem[] = [
  { id: "all", name: "All Designs", slug: "all", iconName: "LayoutGrid" },
  { id: "new-collection", name: "✨ New Collection", slug: "new-collection", iconName: "Sparkles" },
  { id: "kurta", name: "Kurtas", slug: "kurta", iconName: "Shirt" },
  { id: "kanduva", name: "Kanduvas", slug: "kanduva", iconName: "Sparkles" },
  { id: "flag", name: "Flags", slug: "flag", iconName: "Flag" },
  { id: "trending", name: "Trending Now", slug: "trending", iconName: "Flame" },
  { id: "motivational", name: "Motivational", slug: "motivational", iconName: "TrendingUp" },
  { id: "funny", name: "Funny", slug: "funny", iconName: "Smile" },
  { id: "anime", name: "Anime", slug: "anime", iconName: "Gamepad2" },
  { id: "minimal", name: "Minimal", slug: "minimal", iconName: "Sparkles" },
  { id: "quotes", name: "Quotes", slug: "quotes", iconName: "Quote" },
  { id: "festival", name: "Festival", slug: "festival", iconName: "Gift" },
  { id: "couple", name: "Couple", slug: "couple", iconName: "Heart" },
  { id: "team", name: "Team / Group", slug: "team", iconName: "Users" },
  { id: "custom", name: "Custom Request", slug: "custom", iconName: "PenTool" }
];
