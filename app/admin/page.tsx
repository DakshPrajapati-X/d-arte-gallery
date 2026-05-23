"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Edit2, Trash2, Plus, Eye, EyeOff } from "lucide-react";

type Artwork = {
  id: string;
  slug: string;
  title: string;
  artist: string;
  price: number;
  published: boolean;
  imageUrl: string;
};

export default function AdminDashboard() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchArtworks = async () => {
    try {
      const res = await fetch("/api/artworks");
      if (res.ok) {
        const data = await res.json();
        setArtworks(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtworks();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this artwork?")) return;
    
    try {
      const res = await fetch(`/api/artworks/${id}`, { method: "DELETE" });
      if (res.ok) {
        setArtworks((prev) => prev.filter((a) => a.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleTogglePublish = async (id: string) => {
    try {
      const artwork = artworks.find((a) => a.id === id);
      if (!artwork) return;

      const res = await fetch(`/api/artworks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...artwork, published: !artwork.published }),
      });

      if (res.ok) {
        setArtworks((prev) =>
          prev.map((a) =>
            a.id === id ? { ...a, published: !a.published } : a
          )
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="flex justify-between items-center mb-10">
          <div className="h-8 bg-muted/10 w-40" />
          <div className="h-10 bg-muted/10 w-36" />
        </div>
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-16 bg-muted/10 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <h1 className="font-serif text-3xl">Artworks</h1>
        <Link
          href="/admin/artworks/new"
          className="flex items-center space-x-2 border border-border/50 px-4 py-2 hover:bg-foreground hover:text-background transition-colors text-xs tracking-widest uppercase"
        >
          <Plus size={16} />
          <span>New Artwork</span>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border/50 text-xs tracking-widest uppercase text-muted">
              <th className="py-4 font-normal">Title</th>
              <th className="py-4 font-normal">Artist</th>
              <th className="py-4 font-normal">Price</th>
              <th className="py-4 font-normal">Status</th>
              <th className="py-4 font-normal text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {artworks.map((artwork) => (
              <tr key={artwork.id} className="border-b border-border/10 hover:bg-muted/5 transition-colors group">
                <td className="py-4 font-serif text-lg">{artwork.title}</td>
                <td className="py-4 text-sm text-muted">{artwork.artist}</td>
                <td className="py-4 text-sm">${artwork.price.toLocaleString()}</td>
                <td className="py-4 text-sm">
                  <span className={`px-2 py-1 text-[10px] uppercase tracking-widest ${artwork.published ? 'bg-green-500/10 text-green-700' : 'bg-yellow-500/10 text-yellow-700'}`}>
                    {artwork.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="py-4 flex justify-end space-x-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleTogglePublish(artwork.id)} className="text-muted hover:text-foreground" title={artwork.published ? "Unpublish" : "Publish"}>
                    {artwork.published ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                  <Link href={`/admin/artworks/${artwork.id}/edit`} className="text-muted hover:text-foreground">
                    <Edit2 size={16} />
                  </Link>
                  <button onClick={() => handleDelete(artwork.id)} className="text-muted hover:text-red-500">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {artworks.length === 0 && (
              <tr>
                <td colSpan={5} className="py-20 text-center">
                  <p className="font-serif text-xl text-muted mb-2">No artworks yet</p>
                  <p className="text-sm text-muted/60 mb-6">Start building your collection</p>
                  <Link
                    href="/admin/artworks/new"
                    className="inline-flex items-center space-x-2 border border-border/50 px-4 py-2 hover:bg-foreground hover:text-background transition-colors text-xs tracking-widest uppercase"
                  >
                    <Plus size={16} />
                    <span>Add First Artwork</span>
                  </Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
