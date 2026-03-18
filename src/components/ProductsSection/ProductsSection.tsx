import React from "react";
import { Link } from "react-router-dom";
import "./ProductsSection.css";

import { PRODUCTS } from "../../constants/Assets";

type Product = {
  title: string;
  desc: string;
  img: string;
  url: string;
};

const defaultProducts: Product[] = [
  { title: "COBOL Conversion", desc: "Modernize legacy systems into secure, cloud-native, and future-proof your business.", img: PRODUCTS.cobol, url: "/assembler-cobol" },
  { title: "Digital Solutions", desc: "Build intelligent digital platforms that enhance customer experience and business efficiency.", img: PRODUCTS.digital, url: "/services" },
  { title: "Mobile Wallet", desc: "Secure mobile payment solutions for fast and seamless transactions.", img: PRODUCTS.wallet, url: "/mobile-wallet" },
  { title: "Safe Deposit Box", desc: "Smart management system ensuring secure handling of customer assets.", img: PRODUCTS.safebox, url: "/sdb-management" },
  { title: "Lending Solutions", desc: "End-to-end lending platforms with automation and compliance support.", img: PRODUCTS.lending, url: "/lending-solutions" },
];

const productUrlMap: Record<string, string> = {
  "COBOL Conversion": "/assembler-cobol",
  "Digital Solutions": "/services",
  "Mobile Wallet": "/mobile-wallet",
  "Safe Deposit Box": "/sdb-management",
  "Lending Solutions": "/lending-solutions",
};

const productImgFallbacks = [PRODUCTS.cobol, PRODUCTS.digital, PRODUCTS.wallet, PRODUCTS.safebox, PRODUCTS.lending];

interface ProductsData {
  heading?: string;
  items?: Array<{ title: string; description: string; image?: string }>;
}

type ProductCardProps = Product;

const ProductCard: React.FC<ProductCardProps> = ({ title, desc, img, url }) => {
  return (
    <Link to={url} className="product-card" style={{ textDecoration: "none", color: "inherit" }}>
      <img src={img} alt={title} loading="lazy" />
      <div className="card-content">
        <h3>{title}</h3>
        <div className="hover-content">
          <p>{desc}</p>
          <span className="explore">Explore more &rarr;</span>
        </div>
      </div>
    </Link>
  );
};

const ProductsSection: React.FC<{ data?: ProductsData }> = ({ data }) => {
  const products: Product[] = data?.items
    ? data.items.map((item, i) => ({
        title: item.title,
        desc: item.description,
        img: item.image || productImgFallbacks[i] || "",
        url: productUrlMap[item.title] || defaultProducts[i]?.url || "/services",
      }))
    : defaultProducts;

  return (
    <section className="products-section">
      <h2>{data?.heading ?? "Our Product Offerings"}</h2>
      <div className="products-grid">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            title={product.title}
            desc={product.desc}
            img={product.img}
            url={product.url}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductsSection;
