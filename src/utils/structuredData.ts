const SITE_URL = "https://www.aaratech.com";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "AaraTech",
    url: SITE_URL,
    logo: `${SITE_URL}/og-image.jpg`,
    description:
      "Enterprise technology solutions including legacy modernization, banking software, lending & leasing platforms, and digital transformation services.",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      url: `${SITE_URL}/contact`,
    },
    sameAs: [],
  };
}

export function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "AaraTech",
    url: SITE_URL,
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      ...items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: item.name,
        item: `${SITE_URL}${item.path}`,
      })),
    ],
  };
}

export function serviceSchema(name: string, description: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: name,
    provider: {
      "@type": "Organization",
      name: "AaraTech",
    },
    description,
    url: `${SITE_URL}${url}`,
  };
}

export function blogPostingSchema(blog: {
  title: string;
  excerpt: string;
  coverImageUrl?: string;
  author?: string;
  createdAt: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.excerpt,
    image: blog.coverImageUrl || `${SITE_URL}/og-image.jpg`,
    author: {
      "@type": "Person",
      name: blog.author || "AaraTech",
    },
    publisher: {
      "@type": "Organization",
      name: "AaraTech",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/og-image.jpg` },
    },
    datePublished: blog.createdAt,
    mainEntityOfPage: `${SITE_URL}/blog/${blog.slug}`,
  };
}

export function eventSchema(event: {
  title: string;
  excerpt: string;
  coverImageUrl?: string;
  eventDate: string;
  location?: string;
  registrationUrl?: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.excerpt,
    image: event.coverImageUrl || `${SITE_URL}/og-image.jpg`,
    startDate: event.eventDate,
    location: event.location
      ? { "@type": "Place", name: event.location }
      : undefined,
    url: `${SITE_URL}/events/${event.slug}`,
    ...(event.registrationUrl
      ? {
          offers: {
            "@type": "Offer",
            url: event.registrationUrl,
          },
        }
      : {}),
    organizer: {
      "@type": "Organization",
      name: "AaraTech",
    },
  };
}

export function contactPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact AaraTech",
    url: `${SITE_URL}/contact`,
    mainEntity: {
      "@type": "Organization",
      name: "AaraTech",
      url: SITE_URL,
    },
  };
}
