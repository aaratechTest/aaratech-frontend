export interface PageSEO {
  title: string;
  description: string;
}

export const seoDefaults: Record<string, PageSEO> = {
  home: {
    title: "AaraTech - Enterprise Technology Solutions & IT Services",
    description:
      "AaraTech delivers enterprise technology solutions including legacy modernization, banking software, lending & leasing platforms, and digital transformation services.",
  },
  about: {
    title: "About Us",
    description:
      "Learn about AaraTech's mission, vision, leadership team, and commitment to delivering innovative enterprise technology solutions worldwide.",
  },
  services: {
    title: "Services",
    description:
      "Explore AaraTech's comprehensive IT services: legacy modernization, IT outsourcing, digital solutions, quality assurance, and strategic consulting.",
  },
  industries: {
    title: "Industries",
    description:
      "AaraTech serves banking, financial services, logistics, retail, and government sectors with tailored enterprise technology solutions.",
  },
  contact: {
    title: "Contact Us",
    description:
      "Get in touch with AaraTech for enterprise technology solutions, product demos, partnerships, and career opportunities.",
  },
  "lending-solutions": {
    title: "Lending Solutions",
    description:
      "End-to-end lending management software for loan origination, processing, disbursement, and collections. Built for banks and financial institutions.",
  },
  leasing: {
    title: "Leasing Solutions",
    description:
      "Comprehensive leasing management platform for asset tracking, billing, compliance, and portfolio management across all lease types.",
  },
  "sdb-management": {
    title: "Safe Deposit Box Management",
    description:
      "Digital safe deposit box management system for banks. Automate locker allocation, billing, access control, and audit trails.",
  },
  "mobile-wallet": {
    title: "Mobile Wallet",
    description:
      "Secure mobile wallet platform with P2P transfers, bill payments, QR transactions, and multi-currency support for financial institutions.",
  },
  "assembler-cobol": {
    title: "Assembler to COBOL Conversion",
    description:
      "Automated Assembler to COBOL conversion tool for mainframe legacy modernization. Reduce risk, save time, and preserve business logic.",
  },
  culture: {
    title: "Our Culture",
    description:
      "Discover AaraTech's work culture, values, employee benefits, and career growth opportunities. Join a team that values innovation and collaboration.",
  },
  blog: {
    title: "Blog",
    description:
      "Read the latest insights, industry trends, technology updates, and company news from the AaraTech team.",
  },
  events: {
    title: "Events",
    description:
      "Join AaraTech at conferences, webinars, workshops, and meetups. Stay connected with the latest in enterprise technology.",
  },
};
