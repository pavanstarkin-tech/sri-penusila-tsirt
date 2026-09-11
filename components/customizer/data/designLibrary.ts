export interface PresetGraphic {
  id: string;
  category: "Trending" | "Typography" | "Badges" | "Events" | "Sports";
  title: string;
  previewUrl: string; // SVG data URI or image
  width: number;
  height: number;
}

export const presetGraphics: PresetGraphic[] = [
  {
    id: "graphic-vibes",
    category: "Trending",
    title: "Good Vibes Only",
    previewUrl: "/products/good-vibes-only.png",
    width: 300,
    height: 300
  },
  {
    id: "graphic-born",
    category: "Trending",
    title: "Born To Stand Out",
    previewUrl: "/products/born-to-stand-out.png",
    width: 300,
    height: 300
  },
  {
    id: "graphic-together",
    category: "Events",
    title: "Better Together",
    previewUrl: "/products/better-together.png",
    width: 300,
    height: 300
  },
  {
    id: "graphic-college",
    category: "Events",
    title: "College Life Memories",
    previewUrl: "/products/college-life.png",
    width: 300,
    height: 300
  },
  {
    id: "graphic-discipline",
    category: "Typography",
    title: "Discipline Creates Freedom",
    previewUrl: "/products/discipline-creates-freedom.png",
    width: 300,
    height: 300
  },
  {
    id: "graphic-never-give-up",
    category: "Typography",
    title: "Never Give Up",
    previewUrl: "/products/never-give-up.png",
    width: 300,
    height: 300
  },
  {
    id: "graphic-team07",
    category: "Sports",
    title: "Team 07 Champion",
    previewUrl: "/products/team-07.png",
    width: 300,
    height: 300
  },
  {
    id: "graphic-birthday-king",
    category: "Events",
    title: "Birthday King Crown",
    previewUrl: "/products/birthday-king.png",
    width: 300,
    height: 300
  }
];
