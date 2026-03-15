// ── Block data types ──

export interface HeroData {
  heading: string;
  subtitle: string;
  description: string;
  backgroundImage: string;
  buttons: { label: string; link: string }[];
}

export interface CardItem {
  title: string;
  description: string;
  image: string;
  link: string;
  icon: string;
}

export interface CardsGridData {
  sectionTitle: string;
  cards: CardItem[];
}

export interface SplitSectionData {
  heading: string;
  content: string;
  image: string;
  imagePosition: "left" | "right";
  button: { label: string; link: string };
}

export interface TextBlockData {
  content: string;
}

export interface ImageBlockData {
  src: string;
  alt: string;
  caption: string;
}

export interface CtaBannerData {
  heading: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  backgroundColor: string;
}

export interface ContactFormData {
  heading: string;
  description: string;
}

export interface StatItem {
  label: string;
  value: string;
}

export interface StatsSectionData {
  heading: string;
  stats: StatItem[];
}

export interface TabItem {
  title: string;
  content: string;
  image: string;
}

export interface TabsSectionData {
  heading: string;
  tabs: TabItem[];
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
}

export interface TeamGridData {
  heading: string;
  members: TeamMember[];
}

export interface IconCardItem {
  icon: string;
  title: string;
  description: string;
}

export interface IconCardsData {
  sectionTitle: string;
  subtitle: string;
  cards: IconCardItem[];
  columns: 2 | 3 | 4;
}

export interface CarouselSlide {
  title: string;
  description: string;
  image: string;
  buttonLabel: string;
  buttonLink: string;
}

export interface CarouselSliderData {
  sectionTitle: string;
  slides: CarouselSlide[];
  autoPlay: boolean;
  autoPlayInterval: number;
  animation: "fade" | "slide";
}

// ── Block types union ──

export type BlockType =
  | "hero"
  | "cards_grid"
  | "split_section"
  | "text_block"
  | "image_block"
  | "cta_banner"
  | "contact_form"
  | "stats_section"
  | "tabs_section"
  | "team_grid"
  | "icon_cards"
  | "carousel_slider";

export type BlockData =
  | HeroData
  | CardsGridData
  | SplitSectionData
  | TextBlockData
  | ImageBlockData
  | CtaBannerData
  | ContactFormData
  | StatsSectionData
  | TabsSectionData
  | TeamGridData
  | IconCardsData
  | CarouselSliderData;

export interface Block {
  id: string;
  type: BlockType;
  order: number;
  data: BlockData;
}

// ── Page ──

export interface Page {
  id: string;
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  blocks: Block[];
  status: "draft" | "published";
  createdAt: number;
  updatedAt: number;
  createdBy?: string;
}

export interface PageListItem {
  id: string;
  slug: string;
  title: string;
  status: "draft" | "published";
  createdAt: number;
  updatedAt: number;
}

// ── Menu (hierarchical) ──

export interface MenuChild {
  id: string;
  label: string;
  url: string;
  order: number;
  visible: boolean;
  openInNewTab?: boolean;
}

export interface MenuGroup {
  id: string;
  label: string;
  url: string;
  order: number;
  visible: boolean;
  children: MenuChild[];
}

export interface HierarchicalMenu {
  groups: MenuGroup[];
  updatedAt?: number;
}
