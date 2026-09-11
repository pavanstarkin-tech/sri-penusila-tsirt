export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  iconName?: string;
  count?: number;
}

export const homeCategoryPills: CategoryItem[] = [
  { id: "trending", name: "Trending", slug: "trending" },
  { id: "college", name: "College", slug: "college" },
  { id: "birthday", name: "Birthday", slug: "birthday" },
  { id: "business", name: "Business", slug: "business" },
  { id: "couples", name: "Couples", slug: "couple" },
  { id: "events", name: "Events", slug: "events" },
];

export const storeSidebarCategories: CategoryItem[] = [
  { id: "all", name: "All T-Shirts", slug: "all", count: 48 },
  { id: "trending", name: "Trending Now", slug: "trending", count: 16 },
  { id: "birthday", name: "Birthday", slug: "birthday", count: 8 },
  { id: "college", name: "College Events", slug: "college", count: 12 },
  { id: "team", name: "Team & Group", slug: "team", count: 10 },
  { id: "couple", name: "Couple T-Shirts", slug: "couple", count: 7 },
  { id: "business", name: "Business / Corporate", slug: "business", count: 14 },
  { id: "festival", name: "Festival Special", slug: "festival", count: 6 },
  { id: "motivational", name: "Motivational", slug: "motivational", count: 18 },
  { id: "funny", name: "Funny & Quote", slug: "funny", count: 9 },
  { id: "custom", name: "Custom Design", slug: "custom", count: 5 },
];

export const designsCategoryTabs: CategoryItem[] = [
  { id: "all", name: "All Designs", slug: "all", iconName: "LayoutGrid" },
  { id: "trending", name: "Trending Now", slug: "trending", iconName: "Flame" },
  { id: "motivational", name: "Motivational", slug: "motivational", iconName: "TrendingUp" },
  { id: "funny", name: "Funny", slug: "funny", iconName: "Smile" },
  { id: "anime", name: "Anime", slug: "anime", iconName: "Gamepad2" },
  { id: "minimal", name: "Minimal", slug: "minimal", iconName: "Sparkles" },
  { id: "quotes", name: "Quotes", slug: "quotes", iconName: "Quote" },
  { id: "festival", name: "Festival", slug: "festival", iconName: "Gift" },
  { id: "couple", name: "Couple", slug: "couple", iconName: "Heart" },
  { id: "team", name: "Team / Group", slug: "team", iconName: "Users" },
  { id: "custom", name: "Custom Request", slug: "custom", iconName: "PenTool" },
];
