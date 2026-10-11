"use client";

import Image, { type ImageProps } from "next/image";
import { cloudinaryLoader } from "@/lib/cloudinary";

// next/image-er moto-i, shudhu Cloudinary loader ager theke set kora
export function CloudImage(props: Omit<ImageProps, "loader">) {
  return <Image {...props} loader={cloudinaryLoader} />;
}