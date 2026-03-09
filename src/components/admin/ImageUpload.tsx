import { useState, useRef } from "react";
import { Upload, X, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { uploadImage } from "@/hooks/useSupabaseData";
import { toast } from "sonner";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  folder: string;
}

const ImageUpload = ({ value, onChange, folder }: ImageUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const url = await uploadImage(file, folder);
      onChange(url);
      toast.success("Image uploadée !");
    } catch {
      toast.error("Erreur lors de l'upload");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      {value && (
        <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-border">
          <img src={value} alt="" className="w-full h-full object-cover" />
          <button
            onClick={() => onChange("")}
            className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-1"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}
      <div className="flex gap-2">
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])}
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
        >
          <Upload className="w-4 h-4 mr-1" />
          {uploading ? "Upload..." : "Uploader"}
        </Button>
        <Input
          placeholder="Ou coller un lien d'image..."
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          className="text-sm h-9"
        />
      </div>
    </div>
  );
};

export default ImageUpload;
