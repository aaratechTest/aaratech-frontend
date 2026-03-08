export type FieldType = "text" | "textarea" | "image" | "list" | "items";

export interface FieldDef {
  key: string;
  label: string;
  type: FieldType;
  subFields?: FieldDef[];
}

export interface SectionDef {
  key: string;
  label: string;
  fields: FieldDef[];
}

export interface PageDef {
  slug: string;
  title: string;
  description: string;
  icon: string;
  sections: SectionDef[];
}

export const pageDefinitions: PageDef[] = [
  {
    slug: "home",
    title: "Home",
    description: "Hero, Services, Products, Clients, Case Studies",
    icon: "Home",
    sections: [
      {
        key: "hero",
        label: "Hero Carousel",
        fields: [
          {
            key: "slides",
            label: "Slides",
            type: "items",
            subFields: [
              { key: "title", label: "Title", type: "text" },
              { key: "description", label: "Description", type: "textarea" },
              { key: "bulletPoints", label: "Bullet Points (one per line)", type: "textarea" },
              { key: "image", label: "Background Image", type: "image" },
              { key: "redirectUrl", label: "Redirect URL", type: "text" },
            ],
          },
        ],
      },
      {
        key: "products",
        label: "Products Section",
        fields: [
          { key: "heading", label: "Section Heading", type: "text" },
          {
            key: "items",
            label: "Products",
            type: "items",
            subFields: [
              { key: "title", label: "Title", type: "text" },
              { key: "description", label: "Description", type: "textarea" },
              { key: "image", label: "Image", type: "image" },
            ],
          },
        ],
      },
      {
        key: "services",
        label: "Services Section",
        fields: [
          { key: "heading", label: "Section Heading", type: "text" },
          {
            key: "items",
            label: "Services",
            type: "items",
            subFields: [
              { key: "title", label: "Title", type: "text" },
              { key: "description", label: "Description", type: "textarea" },
              { key: "icon", label: "Icon (emoji)", type: "text" },
            ],
          },
        ],
      },
      {
        key: "clients",
        label: "Our Clients",
        fields: [
          { key: "label", label: "Section Label", type: "text" },
          { key: "heading", label: "Heading", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
          {
            key: "stats",
            label: "Stats",
            type: "items",
            subFields: [
              { key: "value", label: "Value", type: "text" },
              { key: "label", label: "Label", type: "text" },
            ],
          },
          {
            key: "clients",
            label: "Client Logos",
            type: "items",
            subFields: [
              { key: "name", label: "Client Name", type: "text" },
              { key: "logo", label: "Logo Image", type: "image" },
            ],
          },
        ],
      },
      {
        key: "caseStudies",
        label: "Case Studies",
        fields: [
          { key: "heading", label: "Section Heading", type: "text" },
          { key: "subtitle", label: "Subtitle", type: "text" },
          {
            key: "items",
            label: "Case Studies",
            type: "items",
            subFields: [
              { key: "tag", label: "Tag", type: "text" },
              { key: "title", label: "Title", type: "text" },
              { key: "description", label: "Description", type: "textarea" },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "about",
    title: "About",
    description: "Hero, Vision & Mission, Commitments, Team, Approach, BTO, Delivery Model",
    icon: "Users",
    sections: [
      {
        key: "hero",
        label: "Hero Section",
        fields: [
          { key: "heading", label: "Heading", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
          { key: "image", label: "Hero Image", type: "image" },
        ],
      },
      {
        key: "visionMission",
        label: "Vision & Mission",
        fields: [
          { key: "vision.heading", label: "Vision Heading", type: "text" },
          { key: "vision.description", label: "Vision Description", type: "textarea" },
          { key: "mission.heading", label: "Mission Heading", type: "text" },
          { key: "mission.description", label: "Mission Description", type: "textarea" },
        ],
      },
      {
        key: "commitments",
        label: "Commitments",
        fields: [
          { key: "heading", label: "Section Heading", type: "text" },
          {
            key: "items",
            label: "Commitment Items",
            type: "items",
            subFields: [
              { key: "title", label: "Title", type: "text" },
              { key: "description", label: "Description", type: "textarea" },
            ],
          },
        ],
      },
      {
        key: "team",
        label: "Management Team",
        fields: [
          { key: "heading", label: "Section Heading", type: "text" },
          {
            key: "members",
            label: "Team Members",
            type: "items",
            subFields: [
              { key: "name", label: "Name", type: "text" },
              { key: "role", label: "Role", type: "text" },
              { key: "shortBio", label: "Short Bio", type: "textarea" },
              { key: "fullBio", label: "Full Bio", type: "textarea" },
              { key: "image", label: "Photo", type: "image" },
            ],
          },
        ],
      },
      {
        key: "approach",
        label: "Our Approach",
        fields: [
          { key: "heading", label: "Heading", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
          { key: "items", label: "Approach Items", type: "list" },
        ],
      },
      {
        key: "bto",
        label: "BTO Section",
        fields: [
          { key: "heading", label: "Heading", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
          { key: "items", label: "BTO Items", type: "list" },
          { key: "lifecycleHeading", label: "Lifecycle Heading", type: "text" },
          { key: "lifecycle", label: "Lifecycle Steps", type: "list" },
        ],
      },
      {
        key: "deliveryModel",
        label: "Delivery Model",
        fields: [
          { key: "heading", label: "Heading", type: "text" },
          { key: "subtitle", label: "Subtitle", type: "text" },
          {
            key: "models",
            label: "Delivery Models",
            type: "items",
            subFields: [
              { key: "name", label: "Name", type: "text" },
              { key: "description", label: "Description", type: "textarea" },
            ],
          },
        ],
      },
      {
        key: "cta",
        label: "Call to Action",
        fields: [
          { key: "heading", label: "Heading", type: "text" },
          { key: "buttonText", label: "Button Text", type: "text" },
        ],
      },
    ],
  },
  {
    slug: "services",
    title: "Services",
    description: "Hero, Legacy Modernization, IT Outsourcing, IT Strategy, Digital Solutions, Testing",
    icon: "Briefcase",
    sections: [
      {
        key: "hero",
        label: "Hero Section",
        fields: [
          { key: "heading", label: "Heading", type: "text" },
          {
            key: "tabs",
            label: "Service Tabs",
            type: "items",
            subFields: [
              { key: "title", label: "Title", type: "text" },
              { key: "description", label: "Description", type: "textarea" },
            ],
          },
        ],
      },
      {
        key: "legacyModernization",
        label: "Legacy Modernization",
        fields: [
          { key: "heading", label: "Heading", type: "text" },
        ],
      },
      {
        key: "itOutsourcing",
        label: "IT Outsourcing",
        fields: [
          { key: "heading", label: "Heading", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
        ],
      },
      {
        key: "itStrategy",
        label: "IT Strategy Consulting",
        fields: [
          { key: "heading", label: "Heading", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
        ],
      },
      {
        key: "digitalSolutions",
        label: "Digital Solutions",
        fields: [
          { key: "heading", label: "Heading", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
        ],
      },
      {
        key: "testingServices",
        label: "Testing Services",
        fields: [
          { key: "heading", label: "Heading", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
        ],
      },
      {
        key: "cta",
        label: "Call to Action",
        fields: [
          { key: "heading", label: "Heading", type: "text" },
          { key: "buttonText", label: "Button Text", type: "text" },
        ],
      },
    ],
  },
  {
    slug: "industries",
    title: "Industries",
    description: "Banking, Logistics, E-commerce, Postal",
    icon: "Building",
    sections: [
      {
        key: "hero",
        label: "Hero Section",
        fields: [
          { key: "heading", label: "Heading", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
        ],
      },
      {
        key: "tabs",
        label: "Industry Tabs",
        fields: [
          { key: "heading", label: "Section Heading", type: "text" },
          {
            key: "items",
            label: "Industries",
            type: "items",
            subFields: [
              { key: "title", label: "Title", type: "text" },
              { key: "description", label: "Description", type: "textarea" },
            ],
          },
        ],
      },
      {
        key: "cta",
        label: "Call to Action",
        fields: [
          { key: "heading", label: "Heading", type: "text" },
          { key: "buttonText", label: "Button Text", type: "text" },
        ],
      },
    ],
  },
  {
    slug: "contact",
    title: "Contact",
    description: "Hero, Office Locations",
    icon: "Mail",
    sections: [
      {
        key: "hero",
        label: "Hero Section",
        fields: [
          { key: "heading", label: "Heading", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
          { key: "badge", label: "Badge Text", type: "text" },
        ],
      },
      {
        key: "offices",
        label: "Office Locations",
        fields: [
          { key: "heading", label: "Section Heading", type: "text" },
          {
            key: "items",
            label: "Offices",
            type: "items",
            subFields: [
              { key: "country", label: "Country", type: "text" },
              { key: "address", label: "Address", type: "textarea" },
              { key: "phone", label: "Phone", type: "text" },
              { key: "email", label: "Email", type: "text" },
              { key: "mapUrl", label: "Map Embed URL", type: "text" },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "lending-solutions",
    title: "Lending Solutions",
    description: "Hero, Stats, Overview, Core Modules, Lifecycle, Features, Why Choose, CTA",
    icon: "DollarSign",
    sections: [
      {
        key: "hero",
        label: "Hero Section",
        fields: [
          { key: "badge", label: "Badge", type: "text" },
          { key: "heading", label: "Heading", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
          { key: "buttonPrimary", label: "Primary Button", type: "text" },
          { key: "buttonSecondary", label: "Secondary Button", type: "text" },
        ],
      },
      {
        key: "stats",
        label: "Stats",
        fields: [
          {
            key: "items",
            label: "Stats",
            type: "items",
            subFields: [
              { key: "value", label: "Value", type: "text" },
              { key: "label", label: "Label", type: "text" },
            ],
          },
        ],
      },
      {
        key: "overview",
        label: "Overview",
        fields: [
          { key: "tag", label: "Tag", type: "text" },
          { key: "heading", label: "Heading", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
        ],
      },
      {
        key: "coreModules",
        label: "Core Modules",
        fields: [
          {
            key: "items",
            label: "Modules",
            type: "items",
            subFields: [
              { key: "title", label: "Title", type: "text" },
              { key: "description", label: "Description", type: "textarea" },
              { key: "icon", label: "Icon Name", type: "text" },
            ],
          },
        ],
      },
      {
        key: "lifecycle",
        label: "Lifecycle",
        fields: [
          { key: "steps", label: "Steps", type: "list" },
        ],
      },
      {
        key: "whyChoose",
        label: "Why Choose Us",
        fields: [
          {
            key: "items",
            label: "Reasons",
            type: "items",
            subFields: [
              { key: "title", label: "Title", type: "text" },
              { key: "description", label: "Description", type: "textarea" },
            ],
          },
        ],
      },
      {
        key: "cta",
        label: "Call to Action",
        fields: [
          { key: "heading", label: "Heading", type: "text" },
          { key: "buttonText", label: "Button Text", type: "text" },
        ],
      },
    ],
  },
  {
    slug: "leasing",
    title: "Leasing System",
    description: "Hero, Overview, Core Modules, Features, Highlights, Industries, Why Choose, CTA",
    icon: "FileText",
    sections: [
      {
        key: "hero",
        label: "Hero Section",
        fields: [
          { key: "heading", label: "Heading", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
          { key: "badges", label: "Badges", type: "list" },
        ],
      },
      {
        key: "overview",
        label: "Overview",
        fields: [
          { key: "label", label: "Label", type: "text" },
          { key: "heading", label: "Heading", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
        ],
      },
      {
        key: "coreModules",
        label: "Core Modules",
        fields: [
          {
            key: "items",
            label: "Modules",
            type: "items",
            subFields: [
              { key: "title", label: "Title", type: "text" },
              { key: "description", label: "Description", type: "textarea" },
            ],
          },
        ],
      },
      {
        key: "highlights",
        label: "Key Highlights",
        fields: [
          {
            key: "items",
            label: "Highlights",
            type: "items",
            subFields: [
              { key: "title", label: "Title", type: "text" },
              { key: "description", label: "Description", type: "textarea" },
            ],
          },
        ],
      },
      {
        key: "industries",
        label: "Industries Served",
        fields: [
          {
            key: "items",
            label: "Industries",
            type: "items",
            subFields: [
              { key: "title", label: "Title", type: "text" },
              { key: "description", label: "Description", type: "textarea" },
            ],
          },
        ],
      },
      {
        key: "whyChoose",
        label: "Why Choose Us",
        fields: [
          {
            key: "items",
            label: "Reasons",
            type: "items",
            subFields: [
              { key: "title", label: "Title", type: "text" },
              { key: "description", label: "Description", type: "textarea" },
            ],
          },
        ],
      },
      {
        key: "cta",
        label: "Call to Action",
        fields: [
          { key: "heading", label: "Heading", type: "text" },
          { key: "buttonText", label: "Button Text", type: "text" },
        ],
      },
    ],
  },
  {
    slug: "sdb-management",
    title: "SDB Management",
    description: "Hero, Overview, Core Features, Highlights, Capabilities, Why Choose, CTA",
    icon: "Shield",
    sections: [
      {
        key: "hero",
        label: "Hero Section",
        fields: [
          { key: "heading", label: "Heading", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
          { key: "badges", label: "Badges", type: "list" },
        ],
      },
      {
        key: "overview",
        label: "Overview",
        fields: [
          { key: "label", label: "Label", type: "text" },
          { key: "heading", label: "Heading", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
        ],
      },
      {
        key: "coreFeatures",
        label: "Core Features",
        fields: [
          {
            key: "items",
            label: "Features",
            type: "items",
            subFields: [
              { key: "title", label: "Title", type: "text" },
              { key: "description", label: "Description", type: "textarea" },
            ],
          },
        ],
      },
      {
        key: "highlights",
        label: "Key Highlights",
        fields: [
          {
            key: "items",
            label: "Highlights",
            type: "items",
            subFields: [
              { key: "title", label: "Title", type: "text" },
              { key: "description", label: "Description", type: "textarea" },
            ],
          },
        ],
      },
      {
        key: "capabilities",
        label: "Additional Capabilities",
        fields: [
          {
            key: "items",
            label: "Capabilities",
            type: "items",
            subFields: [
              { key: "title", label: "Title", type: "text" },
              { key: "description", label: "Description", type: "textarea" },
            ],
          },
        ],
      },
      {
        key: "whyChoose",
        label: "Why Choose Us",
        fields: [
          {
            key: "items",
            label: "Reasons",
            type: "items",
            subFields: [
              { key: "title", label: "Title", type: "text" },
              { key: "description", label: "Description", type: "textarea" },
            ],
          },
        ],
      },
      {
        key: "cta",
        label: "Call to Action",
        fields: [
          { key: "heading", label: "Heading", type: "text" },
          { key: "buttonText", label: "Button Text", type: "text" },
        ],
      },
    ],
  },
  {
    slug: "mobile-wallet",
    title: "Mobile Wallet",
    description: "Hero, Overview, Core Services, Benefits, Deployment, Why Choose, CTA",
    icon: "Smartphone",
    sections: [
      {
        key: "hero",
        label: "Hero Section",
        fields: [
          { key: "heading", label: "Heading", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
          { key: "badges", label: "Badges", type: "list" },
        ],
      },
      {
        key: "overview",
        label: "Overview",
        fields: [
          { key: "label", label: "Label", type: "text" },
          { key: "heading", label: "Heading", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
        ],
      },
      {
        key: "coreServices",
        label: "Core Services",
        fields: [
          {
            key: "items",
            label: "Services",
            type: "items",
            subFields: [
              { key: "title", label: "Title", type: "text" },
              { key: "description", label: "Description", type: "textarea" },
            ],
          },
        ],
      },
      {
        key: "benefits",
        label: "Key Benefits",
        fields: [
          {
            key: "items",
            label: "Benefits",
            type: "items",
            subFields: [
              { key: "title", label: "Title", type: "text" },
              { key: "description", label: "Description", type: "textarea" },
            ],
          },
        ],
      },
      {
        key: "deployment",
        label: "Deployment Models",
        fields: [
          {
            key: "items",
            label: "Models",
            type: "items",
            subFields: [
              { key: "title", label: "Title", type: "text" },
              { key: "description", label: "Description", type: "textarea" },
            ],
          },
        ],
      },
      {
        key: "whyChoose",
        label: "Why Choose Us",
        fields: [
          {
            key: "items",
            label: "Reasons",
            type: "items",
            subFields: [
              { key: "title", label: "Title", type: "text" },
              { key: "description", label: "Description", type: "textarea" },
            ],
          },
        ],
      },
      {
        key: "cta",
        label: "Call to Action",
        fields: [
          { key: "heading", label: "Heading", type: "text" },
          { key: "buttonText", label: "Button Text", type: "text" },
        ],
      },
    ],
  },
  {
    slug: "assembler-cobol",
    title: "Assembler COBOL",
    description: "Overview, Key Features, How It Works, Benefits, Use Cases, Why Aara, Glossary",
    icon: "Code",
    sections: [
      {
        key: "overview",
        label: "Overview",
        fields: [
          { key: "badge", label: "Badge", type: "text" },
          { key: "heading", label: "Heading", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
          {
            key: "stats",
            label: "Stats",
            type: "items",
            subFields: [
              { key: "value", label: "Value", type: "text" },
              { key: "label", label: "Label", type: "text" },
            ],
          },
        ],
      },
      {
        key: "howItWorks",
        label: "How It Works",
        fields: [
          { key: "heading", label: "Heading", type: "text" },
          {
            key: "steps",
            label: "Steps",
            type: "items",
            subFields: [
              { key: "step", label: "Step Number", type: "text" },
              { key: "title", label: "Title", type: "text" },
              { key: "description", label: "Description", type: "textarea" },
            ],
          },
        ],
      },
      {
        key: "benefits",
        label: "Benefits",
        fields: [
          { key: "heading", label: "Heading", type: "text" },
          {
            key: "items",
            label: "Benefits",
            type: "items",
            subFields: [
              { key: "title", label: "Title", type: "text" },
              { key: "description", label: "Description", type: "textarea" },
            ],
          },
        ],
      },
      {
        key: "useCases",
        label: "Use Cases",
        fields: [
          { key: "heading", label: "Heading", type: "text" },
          {
            key: "industries",
            label: "Industries",
            type: "items",
            subFields: [
              { key: "title", label: "Title", type: "text" },
              { key: "description", label: "Description", type: "textarea" },
            ],
          },
        ],
      },
      {
        key: "whyAara",
        label: "Why Aara Tech",
        fields: [
          { key: "heading", label: "Heading", type: "text" },
          {
            key: "items",
            label: "Reasons",
            type: "items",
            subFields: [
              { key: "title", label: "Title", type: "text" },
              { key: "description", label: "Description", type: "textarea" },
            ],
          },
        ],
      },
      {
        key: "cta",
        label: "Call to Action",
        fields: [
          { key: "heading", label: "Heading", type: "text" },
          { key: "buttonPrimary", label: "Primary Button", type: "text" },
          { key: "buttonSecondary", label: "Secondary Button", type: "text" },
        ],
      },
    ],
  },
  {
    slug: "footer",
    title: "Footer",
    description: "Office addresses, contact info, social links — shared across all pages",
    icon: "LayoutGrid",
    sections: [
      {
        key: "offices",
        label: "Office Locations",
        fields: [
          {
            key: "items",
            label: "Offices",
            type: "items",
            subFields: [
              { key: "country", label: "Country / Label", type: "text" },
              { key: "address", label: "Address", type: "textarea" },
              { key: "phone", label: "Phone", type: "text" },
              { key: "email", label: "Email", type: "text" },
            ],
          },
        ],
      },
      {
        key: "social",
        label: "Social Links",
        fields: [
          { key: "facebook", label: "Facebook URL", type: "text" },
          { key: "twitter", label: "Twitter URL", type: "text" },
          { key: "linkedin", label: "LinkedIn URL", type: "text" },
        ],
      },
      {
        key: "bottom",
        label: "Bottom Bar",
        fields: [
          { key: "copyrightText", label: "Copyright Text", type: "text" },
        ],
      },
    ],
  },
];
