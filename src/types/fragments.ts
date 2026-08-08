export type HeaderDirective =
  | "LEFT_SIDE_HEADER"
  | "RIGHT_SIDE_HEADER"
  | "BRANDING_LEFT"
  | "NAVIGATION_RIGHT"
  | "CENTERED_HEADER";

export type FooterDirective =
  | "THREE_COLUMN_LAYOUT"
  | "TWO_COLUMN_LAYOUT"
  | "FOUR_COLUMN_LAYOUT"
  | "CENTERED_FOOTER";

export type SectionDirective =
  | "SPLIT_HERO_LAYOUT"
  | "TWO_COLUMN_SPLIT"
  | "FEATURE_GRID";

export type LayoutDirective = HeaderDirective | FooterDirective | SectionDirective;

export interface FragmentLink {
  text: string;
  href: string;
  isExternal: boolean;
  isAction: boolean;
  isDownload: boolean;
  isMailto: boolean;
  imageUrl?: string;
  imageAlt?: string;
}

export interface HeaderAST {
  layout: HeaderDirective;
  branding: FragmentLink[];
  navigation: FragmentLink[];
  actions: FragmentLink[];
  rawMarkdown: string;
}

export interface FooterColumnAST {
  title?: string;
  links: FragmentLink[];
  textBlocks: string[];
}

export interface FooterAST {
  layout: FooterDirective;
  columns: FooterColumnAST[];
  rawMarkdown: string;
}

export interface FragmentAST {
  header?: HeaderAST;
  footer?: FooterAST;
  layoutDirective: LayoutDirective;
}
