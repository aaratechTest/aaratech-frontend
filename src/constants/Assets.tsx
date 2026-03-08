// ─────────────────────────────────────────────
//  BRAND / GLOBAL
// ─────────────────────────────────────────────
import logo from "../assets/aaratech.png";
import searchIcon from "../assets/search.png";
import homeHero from "../assets/home-hero.jpg";

// Hero carousel banners
import banner1 from "../assets/banner1.jpeg";
import banner2 from "../assets/banner2.webp";
import banner3 from "../assets/banner3.png";
import banner4 from "../assets/banner4.jpeg";

export const BRAND = {
  logo,
  searchIcon,
  homeHero,
} as const;

export const BANNERS = [banner1, banner2, banner3, banner4] as const;

// ─────────────────────────────────────────────
//  PRODUCTS SECTION (HomePage)
// ─────────────────────────────────────────────
import cobolImg from "../assets/cobol.jpg";
import digitalImg from "../assets/digital.jpg";
import walletImg from "../assets/wallet.jpg";
import safeboxImg from "../assets/safebox.jpg";
import lendingImg from "../assets/lending.jpg";

export const PRODUCTS = {
  cobol: cobolImg,
  digital: digitalImg,
  wallet: walletImg,
  safebox: safeboxImg,
  lending: lendingImg,
} as const;

// ─────────────────────────────────────────────
//  ABOUT PAGE — Hero & Sections
// ─────────────────────────────────────────────
import aboutImg from "../assets/about.jpg";
import planImg from "../assets/plan.jpg";
import visionIcon from "../assets/vision-icon.png";
import missionIcon from "../assets/mission-icon.png";
import approachAboutImg from "../assets/Approch.jpg";
import personImg from "../assets/person.jpg";

export const ABOUT = {
  hero: aboutImg,
  plan: planImg,
  visionIcon,
  missionIcon,
  approach: approachAboutImg,
  person: personImg,
} as const;

// ─────────────────────────────────────────────
//  ABOUT PAGE — Commitment Icons
// ─────────────────────────────────────────────
import innovationImg from "../assets/innovation.png";
import qualityImg from "../assets/quality.png";
import collaborationImg from "../assets/Collaboration.png";
import customerImg from "../assets/customer.png";
import peopleImg from "../assets/people.png";

export const COMMITMENT = {
  innovation: innovationImg,
  quality: qualityImg,
  collaboration: collaborationImg,
  customer: customerImg,
  people: peopleImg,
} as const;

// ─────────────────────────────────────────────
//  ABOUT PAGE — Team Members
// ─────────────────────────────────────────────
import teamMember1 from "../assets/f-1.png";
import teamMember2 from "../assets/f-2.jpg";
import teamMember3 from "../assets/f-3.png";

export const TEAM = {
  balamurugan: teamMember1,
  ravi: teamMember2,
  chandra: teamMember3,
} as const;

// ─────────────────────────────────────────────
//  SERVICES PAGE
//  (serviceHeroImg is shared with Industries)
// ─────────────────────────────────────────────
import serviceHeroImg from "../assets/aara-1.jpg";
import approachPhoto from "../assets/aara-2.webp";
import chooseUsImg from "../assets/aara-5.jpg";

export const SERVICES = {
  heroImage: serviceHeroImg,
  approachPhoto,
  chooseUsImage: chooseUsImg,
} as const;

// ─────────────────────────────────────────────
//  INDUSTRIES PAGE
//  (uses SERVICES.heroImage for the shared img)
// ─────────────────────────────────────────────
import bankingImg from "../assets/i2.png";
import logisticsImg from "../assets/i3.png";
import ecommerceImg from "../assets/i4.png";
import postalImg from "../assets/f5.png";
import serviceimg from "../assets/aara-1.jpg";
import approachImg from "../assets/aara-2.webp";
import approachImgs from "../assets/aara-5.jpg";

export const INDUSTRIES = {
  banking: bankingImg,
  logistics: logisticsImg,
  ecommerce: ecommerceImg,
  postal: postalImg,
  service: serviceimg,
  approachImg: approachImg,
  approachImgs: approachImgs
} as const;