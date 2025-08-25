"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast, { Toaster } from "react-hot-toast"; // ✅ Import toast

// -------------------------------
// Zod schema for validation
// -------------------------------
const productSchema = z.object({
  productName: z.string().min(1, "Product Name is required."),
  description: z.string().min(1, "Description is required."),
  price: z
    .string()
    .min(1, "Price is required.")
    .refine((val) => !isNaN(Number(val)), { message: "Price must be a number." }),
  category: z.string().min(1, "Category is required."),
  productImage: z
    .any()
    .refine(
      (fileList) => fileList && fileList.length > 0 && fileList[0] instanceof File,
      "Product Image is required."
    ),
});

// TypeScript type inferred from schema
type ProductFormData = z.infer<typeof productSchema>;

export default function ProductFormPage() {
  // -------------------------------
  // React states
  // -------------------------------
  const [preview, setPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // -------------------------------
  // Initialize react-hook-form
  // -------------------------------
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    mode: "onChange", // live validation
  });

  // -------------------------------
  // Watch file input for preview
  // -------------------------------
  const watchFile = watch("productImage");
  useEffect(() => {
    if (watchFile && watchFile.length > 0) {
      const file = watchFile[0];
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  }, [watchFile]);

  // -------------------------------
  // Form submission handler
  // -------------------------------
  const onSubmit = async (data: ProductFormData) => {
    setIsSubmitting(true);
    const loadingToast = toast.loading("Submitting product...");
    try {
      // Convert image file to base64
      const file = data.productImage[0];
      const toBase64 = (file: File) =>
        new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      const imageUrl = await toBase64(file);
      // Prepare product object
      const product = {
        productName: data.productName,
        description: data.description,
        price: data.price,
        category: data.category,
        imageUrl,
      };
      // Save to localStorage
      if (typeof window !== "undefined") {
        const prev = localStorage.getItem("products");
        const products = prev ? JSON.parse(prev) : [];
        products.push(product);
        localStorage.setItem("products", JSON.stringify(products));
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Product submitted successfully!", { id: loadingToast });
      reset();
      setPreview(null);
    } catch (error: any) {
      toast.error("Failed to submit product", { id: loadingToast });
    } finally {
      setIsSubmitting(false);
    }
  };

  // -------------------------------
  // Render form
  // -------------------------------
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      {/* ✅ Add Toaster component once in the page */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            fontSize: "14px",
            padding: "10px",
          },
        }}
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Add Product</h2>

        {/* Product Name */}
        <div className="mb-3">
          <label>
            Product Name <span className="text-red-500">*</span>
          </label>
          <input
            className="w-full border p-2 rounded mt-1"
            {...register("productName")}
          />
          {errors.productName && (
            <div className="text-red-500 text-xs">{errors.productName.message}</div>
          )}
        </div>

        {/* Description */}
        <div className="mb-3">
          <label>Description:</label>
          <textarea
            className="w-full border p-2 rounded mt-1"
            {...register("description")}
          />
          {errors.description && (
            <div className="text-red-500 text-xs">{errors.description.message}</div>
          )}
        </div>

        {/* Price */}
        <div className="mb-3">
          <label>
            Price <span className="text-red-500">*</span>
          </label>
          <input
            className="w-full border p-2 rounded mt-1"
            {...register("price")}
          />
          {errors.price && (
            <div className="text-red-500 text-xs">{errors.price.message}</div>
          )}
        </div>

        {/* Category */}
        <div className="mb-3">
          <label>Category:</label>
          <select
            className="w-full border p-2 rounded mt-1"
            {...register("category")}
          >
            <option value="">Select a category</option>
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="Home">Home</option>
            <option value="Other">Other</option>
          </select>
          {errors.category && (
            <div className="text-red-500 text-xs">{errors.category.message}</div>
          )}
        </div>

        {/* Product Image */}
        <div className="mb-4">
          <label>
            Product Image <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            accept="image/*"
            className="w-full border p-2 rounded mt-1"
            {...register("productImage")}
          />
          {errors.productImage && typeof errors.productImage.message === "string" && (
            <div className="text-red-500 text-xs">{errors.productImage.message}</div>
          )}
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-32 h-32 mt-2 object-cover border rounded"
            />
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full p-2 rounded mt-2 text-white ${
            isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500"
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
