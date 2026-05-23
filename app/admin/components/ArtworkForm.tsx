"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";

type ArtworkFormFields = {
  id?: string;
  title: string;
  artist: string;
  price: number;
  dimensions: string;
  medium: string;
  year: string;
  framed: boolean;
  description: string;
  story: string;
  imageUrl: string;
  featured: boolean;
  published: boolean;
};

export default function ArtworkForm({ initialData }: { initialData?: ArtworkFormFields }) {
  const router = useRouter();
  const [formData, setFormData] = useState<ArtworkFormFields>(
    initialData || {
      title: "",
      artist: "",
      price: 0,
      dimensions: "",
      medium: "",
      year: "",
      framed: false,
      description: "",
      story: "",
      imageUrl: "",
      featured: false,
      published: false,
    }
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const method = initialData?.id ? "PUT" : "POST";
      const url = initialData?.id ? `/api/artworks/${initialData.id}` : "/api/artworks";
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Failed to save artwork");
      }
    } catch (e) {
      console.error(e);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 px-4 py-3 text-red-500 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs tracking-widest uppercase text-muted mb-2">Title</label>
          <input required type="text" name="title" value={formData.title} onChange={handleChange} className="w-full bg-transparent border border-border/50 p-3 outline-none" />
        </div>
        <div>
          <label className="block text-xs tracking-widest uppercase text-muted mb-2">Artist</label>
          <input required type="text" name="artist" value={formData.artist} onChange={handleChange} className="w-full bg-transparent border border-border/50 p-3 outline-none" />
        </div>
        <div>
          <label className="block text-xs tracking-widest uppercase text-muted mb-2">Price</label>
          <input required type="number" name="price" value={formData.price} onChange={handleChange} className="w-full bg-transparent border border-border/50 p-3 outline-none" />
        </div>
        <div>
          <label className="block text-xs tracking-widest uppercase text-muted mb-2">Dimensions</label>
          <input required type="text" name="dimensions" value={formData.dimensions} onChange={handleChange} placeholder="e.g. 120 x 160 cm" className="w-full bg-transparent border border-border/50 p-3 outline-none" />
        </div>
        <div>
          <label className="block text-xs tracking-widest uppercase text-muted mb-2">Medium</label>
          <input required type="text" name="medium" value={formData.medium} onChange={handleChange} className="w-full bg-transparent border border-border/50 p-3 outline-none" />
        </div>
        <div>
          <label className="block text-xs tracking-widest uppercase text-muted mb-2">Year</label>
          <input required type="text" name="year" value={formData.year} onChange={handleChange} className="w-full bg-transparent border border-border/50 p-3 outline-none" />
        </div>
      </div>

      <div>
        <label className="block text-xs tracking-widest uppercase text-muted mb-2">Description</label>
        <textarea required name="description" value={formData.description} onChange={handleChange} rows={4} className="w-full bg-transparent border border-border/50 p-3 outline-none"></textarea>
      </div>

      <div>
        <label className="block text-xs tracking-widest uppercase text-muted mb-2">Story (Curatorial Note)</label>
        <textarea required name="story" value={formData.story} onChange={handleChange} rows={4} className="w-full bg-transparent border border-border/50 p-3 outline-none"></textarea>
      </div>

      <div>
        <label className="block text-xs tracking-widest uppercase text-muted mb-2">Image</label>
        <div className="flex items-center space-x-6">
          {formData.imageUrl && (
            <div className="relative w-32 h-40 border border-border/50">
              <Image src={formData.imageUrl} alt="Preview" fill className="object-cover" />
            </div>
          )}
          <CldUploadWidget 
            uploadPreset="ml_default"
            options={{
              maxFiles: 1,
              resourceType: 'image',
              sources: ['local', 'url', 'camera'],
            }}
            onSuccess={(result: unknown) => {
              const res = result as { info: { secure_url: string } };
              setFormData({ ...formData, imageUrl: res.info.secure_url });
            }}
          >
            {({ open }) => (
              <button type="button" onClick={() => open()} className="border border-border/50 px-4 py-2 hover:bg-muted/10 transition-colors text-xs tracking-widest uppercase">
                {formData.imageUrl ? "Change Image" : "Upload Image"}
              </button>
            )}
          </CldUploadWidget>
        </div>
        {!formData.imageUrl && (
          <p className="text-xs text-muted/60 mt-2">Upload an image via Cloudinary to continue</p>
        )}
      </div>

      <div className="flex space-x-8">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input type="checkbox" name="framed" checked={formData.framed} onChange={handleChange} />
          <span className="text-sm">Framed</span>
        </label>
        <label className="flex items-center space-x-2 cursor-pointer">
          <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} />
          <span className="text-sm">Featured</span>
        </label>
        <label className="flex items-center space-x-2 cursor-pointer">
          <input type="checkbox" name="published" checked={formData.published} onChange={handleChange} />
          <span className="text-sm">Published</span>
        </label>
      </div>

      <div className="pt-6">
        <button type="submit" disabled={loading} className="bg-foreground text-background px-8 py-3 hover:bg-muted transition-colors text-xs tracking-widest uppercase">
          {loading ? "Saving..." : "Save Artwork"}
        </button>
      </div>
    </form>
  );
}
