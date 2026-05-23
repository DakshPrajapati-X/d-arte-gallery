"use client";

import { useEffect, useState } from "react";
import ArtworkForm from "@/app/admin/components/ArtworkForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useParams } from "next/navigation";

export default function EditArtworkPage() {
  const { id } = useParams();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [initialData, setInitialData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        const res = await fetch(`/api/artworks/${id}`);
        if (res.ok) {
          const data = await res.json();
          setInitialData(data);
        } else {
          setError(true);
        }
      } catch (e) {
        console.error(e);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchArtwork();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-3xl space-y-8 animate-pulse">
        <div className="h-4 bg-muted/10 w-40" />
        <div className="h-10 bg-muted/10 w-64" />
        <div className="grid grid-cols-2 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-12 bg-muted/10" />
          ))}
        </div>
        <div className="h-32 bg-muted/10" />
        <div className="h-32 bg-muted/10" />
      </div>
    );
  }

  if (error || !initialData) {
    return (
      <div className="text-center py-20">
        <p className="font-serif text-xl text-muted mb-4">Artwork not found</p>
        <Link href="/admin" className="text-xs tracking-widest uppercase text-muted hover:text-foreground transition-colors">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <Link href="/admin" className="inline-flex items-center space-x-2 text-xs tracking-widest uppercase text-muted hover:text-foreground transition-colors">
          <ArrowLeft size={14} />
          <span>Back to Dashboard</span>
        </Link>
      </div>
      <h1 className="font-serif text-3xl mb-10">Edit Artwork</h1>
      <ArtworkForm initialData={initialData} />
    </div>
  );
}
