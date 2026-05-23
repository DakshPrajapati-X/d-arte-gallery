import ArtworkForm from "@/app/admin/components/ArtworkForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewArtworkPage() {
  return (
    <div>
      <div className="mb-8">
        <Link href="/admin" className="inline-flex items-center space-x-2 text-xs tracking-widest uppercase text-muted hover:text-foreground transition-colors">
          <ArrowLeft size={14} />
          <span>Back to Dashboard</span>
        </Link>
      </div>
      <h1 className="font-serif text-3xl mb-10">Add New Artwork</h1>
      <ArtworkForm />
    </div>
  );
}
