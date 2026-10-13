"use client";

import Image, { type ImageProps } from "next/image";
import { cloudinaryLoader, cloudinaryTrimLoader } from "@/lib/cloudinary";

// next/image-er moto-i, shudhu Cloudinary loader ager theke set kora.
// trim = true hole Cloudinary charpashe-r faka ongsho kete dey (Figma export-er jonno)
export function CloudImage({ trim = false, ...props }: Omit<ImageProps, "loader"> & { trim?: boolean }) {
  return <Image {...props} loader={trim ? cloudinaryTrimLoader : cloudinaryLoader} />;
}