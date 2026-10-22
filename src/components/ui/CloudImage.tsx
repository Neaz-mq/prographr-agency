"use client";

import Image, { type ImageProps } from "next/image";
import { cloudinaryLoader, cloudinaryTrimLoader, cloudinaryTrimLoaderWith } from "@/lib/cloudinary";

// next/image-er moto-i, shudhu Cloudinary loader ager theke set kora.
// trim = true hole Cloudinary charpashe-r faka ongsho kete dey (Figma export-er jonno)
// trim = number (0-100) hole oi tolerance-e kate, jemon soft shadow-shoho image-e trim={30}
export function CloudImage({ trim = false, ...props }: Omit<ImageProps, "loader"> & { trim?: boolean | number }) {
  const loader = typeof trim === "number" ? cloudinaryTrimLoaderWith(trim) : trim ? cloudinaryTrimLoader : cloudinaryLoader;
  return <Image {...props} loader={loader} />;
}