import type { MetadataRoute } from "next";

const base = "https://prographr.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/projects", "/services", "/pricing", "/contact"].map((path) => ({
    url: `${base}${path}`,
  }));
}