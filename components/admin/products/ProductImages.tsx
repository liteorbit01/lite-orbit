"use client";

type ProductImagesProps = {
  productId: string;
};

export default function ProductImages({
  productId,
}: ProductImagesProps) {
  return (
    <section className="rounded-2xl bg-white p-10 shadow-sm">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold">
          Product Images
        </h2>

        <p className="mt-2 text-gray-500">
          Upload and manage images for this product.
        </p>
      </div>

      <div className="rounded-xl border-2 border-dashed border-gray-300 p-12 text-center">
        <div className="text-5xl">🖼️</div>

        <h3 className="mt-6 text-lg font-medium">
          No images uploaded yet
        </h3>

        <p className="mt-2 text-sm text-gray-500">
          Supported formats:
          JPG, PNG and WEBP.
        </p>

        <button
          type="button"
          className="mt-8 rounded-lg bg-black px-6 py-3 text-white transition hover:bg-gray-800"
          onClick={() =>
            console.log(
              "Upload image for:",
              productId
            )
          }
        >
          + Upload Image
        </button>
      </div>
    </section>
  );
}