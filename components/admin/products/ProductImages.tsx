"use client";

import { useRef, useState } from "react";

import type {
  ProductImage,
} from "@/app/admin/products/types";

type ProductImagesProps = {
  productId: string;
  images: ProductImage[];
};

export default function ProductImages({
  productId,
  images,
}: ProductImagesProps) {
  const fileInputRef =
    useRef<HTMLInputElement>(null);

  const [uploading, setUploading] =
    useState(false);

  async function handleFileSelected(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    try {
      setUploading(true);

      const formData = new FormData();

      formData.append("productId", productId);
      formData.append("file", file);

      const response = await fetch(
        "/api/admin/products/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(
          "Upload failed."
        );
      }

      alert("Image uploaded successfully.");

      // Reload page to refresh gallery
      window.location.reload();
    } catch (error) {
      console.error(error);

      alert(
        "Unable to upload image."
      );
    } finally {
      setUploading(false);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }

  return (
    <section className="rounded-2xl bg-white p-10 shadow-sm">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        className="hidden"
        onChange={handleFileSelected}
      />

      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">
            Product Images
          </h2>

          <p className="mt-2 text-gray-500">
            Upload and manage images for this product.
          </p>
        </div>

        <button
          type="button"
          disabled={uploading}
          onClick={() =>
            fileInputRef.current?.click()
          }
          className="rounded-lg bg-black px-6 py-3 text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-500"
        >
          {uploading
            ? "Uploading..."
            : "+ Upload Image"}
        </button>
      </div>

      {images.length === 0 ? (
        <div className="rounded-xl border-2 border-dashed border-gray-300 p-12 text-center">
          <div className="text-5xl">
            🖼️
          </div>

          <h3 className="mt-6 text-lg font-medium">
            No images uploaded yet
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            Supported formats:
            JPG, PNG and WEBP.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {images.map((image) => (
            <div
              key={image.id}
              className="overflow-hidden rounded-xl border bg-white shadow-sm"
            >
              <img
                src={image.image_url}
                alt={
                  image.alt_text ?? ""
                }
                className="aspect-square w-full object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}