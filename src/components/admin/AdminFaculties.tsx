import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, Trash2, Plus, X } from "lucide-react";
import { useAllFacultyContent, useUpsertFacultyContent, useDeleteFacultyContent } from "@/hooks/useSupabaseData";
import ImageUpload from "./ImageUpload";

const defaultFaculties = [
  { slug: "polytechnique", name: "Polytechnique", full_name: "Faculté de Polytechnique" },
  { slug: "sciences-economiques", name: "Sciences Économiques", full_name: "Faculté de Sciences Économiques" },
  { slug: "sante-publique", name: "Santé Publique", full_name: "École de Santé Publique" },
  { slug: "management", name: "Management", full_name: "Faculté de Management" },
  { slug: "sciences-developpement", name: "Sciences de Développement", full_name: "Faculté de Sciences de Développement" },
  { slug: "sciences-agronomiques", name: "Sciences Agronomiques & Environnement", full_name: "Faculté de Sciences Agronomiques & Environnement" },
];

const AdminFaculties = () => {
  const { data: faculties } = useAllFacultyContent();
  const upsert = useUpsertFacultyContent();
  const remove = useDeleteFacultyContent();

  const [editing, setEditing] = useState<any | null>(null);
  const [deptInput, setDeptInput] = useState("");

  const startNew = () => {
    setEditing({
      slug: "",
      name: "",
      full_name: "",
      description: "",
      long_description: "",
      departments: [],
      image_url: "",
    });
    setDeptInput("");
  };

  const startEdit = (f: any) => {
    setEditing({ ...f, departments: f.departments || [] });
    setDeptInput("");
  };

  const addDept = () => {
    if (!deptInput.trim()) return;
    setEditing({ ...editing, departments: [...(editing.departments || []), deptInput.trim()] });
    setDeptInput("");
  };

  const removeDept = (i: number) => {
    const deps = [...editing.departments];
    deps.splice(i, 1);
    setEditing({ ...editing, departments: deps });
  };

  const handleSave = () => {
    if (!editing.slug || !editing.name || !editing.full_name) {
      toast.error("Veuillez remplir le slug, le nom court et le nom complet.");
      return;
    }
    // Remove empty id for new items to avoid insert issues
    const payload = { ...editing };
    if (!payload.id) delete payload.id;
    upsert.mutate(payload, { onSuccess: () => setEditing(null) });
  };


  const items = faculties && faculties.length > 0 ? faculties : [];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground">Gestion des Facultés</h2>
        <Button onClick={startNew} size="sm" className="gap-1">
          <Plus className="w-4 h-4" /> Ajouter
        </Button>
      </div>

      {editing && (
        <div className="bg-secondary border border-border rounded-lg p-4 mb-6 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input placeholder="Slug (ex: polytechnique)" value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} />
            <Input placeholder="Nom court" value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
          </div>
          <Input placeholder="Nom complet" value={editing.full_name} onChange={(e) => setEditing({ ...editing, full_name: e.target.value })} />
          <Textarea placeholder="Description courte" rows={2} value={editing.description || ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} />
          <Textarea placeholder="Description détaillée" rows={4} value={editing.long_description || ""} onChange={(e) => setEditing({ ...editing, long_description: e.target.value })} />
          
          <div>
            <p className="text-sm font-medium text-foreground mb-2">Départements</p>
            <div className="flex flex-wrap gap-2 mb-2">
              {(editing.departments || []).map((d: string, i: number) => (
                <span key={i} className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full flex items-center gap-1">
                  {d}
                  <button onClick={() => removeDept(i)} className="hover:text-destructive">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <Input placeholder="Nouveau département" value={deptInput} onChange={(e) => setDeptInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addDept())} />
              <Button type="button" variant="outline" size="sm" onClick={addDept}>+</Button>
            </div>
          </div>

          <ImageUpload value={editing.image_url} onChange={(url) => setEditing({ ...editing, image_url: url })} folder="faculties" />
          
          <div className="flex gap-2">
            <Button onClick={handleSave} disabled={upsert.isPending}>
              {upsert.isPending ? "Sauvegarde..." : "Sauvegarder"}
            </Button>
            <Button variant="outline" onClick={() => setEditing(null)}>Annuler</Button>
          </div>
        </div>
      )}

      {items.length === 0 && !editing && (
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">Aucune faculté configurée. Ajoutez-en à partir des modèles :</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {defaultFaculties.map((f) => (
              <Button key={f.slug} variant="outline" size="sm" onClick={() => setEditing({ ...f, description: "", long_description: "", departments: [], image_url: "" })}>
                {f.name}
              </Button>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-3">
        {items.map((f: any) => (
          <div key={f.id} className="flex items-center justify-between p-4 bg-card border border-border rounded-lg">
            <div className="flex items-center gap-3">
              {f.image_url && <img src={f.image_url} alt={f.name} className="w-12 h-12 rounded-lg object-cover" />}
              <div>
                <h3 className="font-bold text-foreground">{f.full_name}</h3>
                <p className="text-muted-foreground text-sm">{(f.departments || []).length} départements • /{f.slug}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={() => startEdit(f)}>
                <Pencil className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-destructive" onClick={() => remove.mutate(f.id)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminFaculties;
