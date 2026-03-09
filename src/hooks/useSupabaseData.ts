import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Personnel
export const usePersonnel = () =>
  useQuery({
    queryKey: ["personnel"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("personnel")
        .select("*")
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

export const useUpsertPersonnel = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (item: {
      id?: string;
      name: string;
      role: string;
      bio?: string;
      photo_url?: string;
      display_order?: number;
      email?: string;
      linkedin_url?: string;
    }) => {
      const { error } = item.id
        ? await supabase.from("personnel").update(item as any).eq("id", item.id)
        : await supabase.from("personnel").insert(item as any);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["personnel"] });
      toast.success("Personnel sauvegardé !");
    },
    onError: () => toast.error("Erreur lors de la sauvegarde"),
  });
};

export const useDeletePersonnel = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("personnel").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["personnel"] });
      toast.success("Personnel supprimé !");
    },
  });
};

// Blog articles
export const useBlogArticles = (publishedOnly = false) =>
  useQuery({
    queryKey: ["blog_articles", publishedOnly],
    queryFn: async () => {
      let q = supabase.from("blog_articles").select("*").order("published_at", { ascending: false });
      if (publishedOnly) q = q.eq("published", true);
      const { data, error } = await q;
      if (error) throw error;
      return data;
    },
  });

export const useUpsertBlogArticle = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (item: {
      id?: string;
      title: string;
      excerpt?: string;
      content?: string;
      category?: string;
      author?: string;
      image_url?: string;
      published?: boolean;
    }) => {
      const { error } = item.id
        ? await supabase.from("blog_articles").update(item).eq("id", item.id)
        : await supabase.from("blog_articles").insert(item);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["blog_articles"] });
      toast.success("Article sauvegardé !");
    },
    onError: () => toast.error("Erreur lors de la sauvegarde"),
  });
};

export const useDeleteBlogArticle = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("blog_articles").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["blog_articles"] });
      toast.success("Article supprimé !");
    },
  });
};

// Blog comments
export const useComments = (articleId: string) =>
  useQuery({
    queryKey: ["blog_comments", articleId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_comments" as any)
        .select("*")
        .eq("article_id", articleId)
        .order("created_at", { ascending: true });
      if (error) throw error;
      return data as any[];
    },
  });

export const useAddComment = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (item: { article_id: string; author_name: string; content: string; author_email?: string }) => {
      const { error } = await supabase.from("blog_comments" as any).insert(item);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["blog_comments"] });
      toast.success("Commentaire ajouté !");
    },
    onError: () => toast.error("Erreur lors de l'ajout du commentaire"),
  });
};

// Gallery
export const useGallery = () =>
  useQuery({
    queryKey: ["gallery"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("gallery")
        .select("*")
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

export const useUpsertGallery = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (item: {
      id?: string;
      title: string;
      description?: string;
      image_url: string;
      category?: string;
      display_order?: number;
    }) => {
      const { error } = item.id
        ? await supabase.from("gallery").update(item).eq("id", item.id)
        : await supabase.from("gallery").insert(item);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["gallery"] });
      toast.success("Image sauvegardée !");
    },
    onError: () => toast.error("Erreur lors de la sauvegarde"),
  });
};

export const useDeleteGallery = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("gallery").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["gallery"] });
      toast.success("Image supprimée !");
    },
  });
};

// College posts
export const useCollegePosts = (publishedOnly = false) =>
  useQuery({
    queryKey: ["college_posts", publishedOnly],
    queryFn: async () => {
      let q = supabase.from("college_posts").select("*").order("created_at", { ascending: false });
      if (publishedOnly) q = q.eq("published", true);
      const { data, error } = await q;
      if (error) throw error;
      return data;
    },
  });

export const useUpsertCollegePost = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (item: {
      id?: string;
      title: string;
      content?: string;
      author?: string;
      image_url?: string;
      published?: boolean;
    }) => {
      const { error } = item.id
        ? await supabase.from("college_posts").update(item).eq("id", item.id)
        : await supabase.from("college_posts").insert(item);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["college_posts"] });
      toast.success("Publication sauvegardée !");
    },
    onError: () => toast.error("Erreur lors de la sauvegarde"),
  });
};

export const useDeleteCollegePost = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("college_posts").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["college_posts"] });
      toast.success("Publication supprimée !");
    },
  });
};

// Calendar events
export const useCalendarEvents = () =>
  useQuery({
    queryKey: ["calendar_events"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("calendar_events")
        .select("*")
        .order("event_date", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

export const useUpsertCalendarEvent = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (item: {
      id?: string;
      title: string;
      description?: string;
      event_date: string;
      end_date?: string;
      category?: string;
    }) => {
      const { error } = item.id
        ? await supabase.from("calendar_events").update(item).eq("id", item.id)
        : await supabase.from("calendar_events").insert(item);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["calendar_events"] });
      toast.success("Événement sauvegardé !");
    },
    onError: () => toast.error("Erreur lors de la sauvegarde"),
  });
};

export const useDeleteCalendarEvent = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("calendar_events").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["calendar_events"] });
      toast.success("Événement supprimé !");
    },
  });
};

// Fees
export const useFees = () =>
  useQuery({
    queryKey: ["fees"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("fees")
        .select("*")
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

export const useUpsertFee = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (item: {
      id?: string;
      faculty: string;
      cycle: string;
      amount: number;
      currency?: string;
      description?: string;
      display_order?: number;
      pdf_url?: string;
    }) => {
      const { error } = item.id
        ? await supabase.from("fees").update(item).eq("id", item.id)
        : await supabase.from("fees").insert(item);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["fees"] });
      toast.success("Frais sauvegardés !");
    },
    onError: () => toast.error("Erreur lors de la sauvegarde"),
  });
};

export const useDeleteFee = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("fees").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["fees"] });
      toast.success("Frais supprimés !");
    },
  });
};

// Faculty content
export const useFacultyContent = (slug?: string) =>
  useQuery({
    queryKey: ["faculty_content", slug],
    queryFn: async () => {
      if (slug) {
        const { data, error } = await supabase
          .from("faculty_content" as any)
          .select("*")
          .eq("slug", slug)
          .maybeSingle();
        if (error) throw error;
        return data;
      }
      const { data, error } = await supabase
        .from("faculty_content" as any)
        .select("*")
        .order("name", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

export const useAllFacultyContent = () =>
  useQuery({
    queryKey: ["faculty_content"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("faculty_content" as any)
        .select("*")
        .order("name", { ascending: true });
      if (error) throw error;
      return data as any[];
    },
  });

export const useUpsertFacultyContent = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (item: {
      id?: string;
      slug: string;
      name: string;
      full_name: string;
      description?: string;
      long_description?: string;
      departments?: string[];
      image_url?: string;
    }) => {
      const { error } = item.id
        ? await supabase.from("faculty_content" as any).update(item).eq("id", item.id)
        : await supabase.from("faculty_content" as any).insert(item);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["faculty_content"] });
      toast.success("Faculté sauvegardée !");
    },
    onError: () => toast.error("Erreur lors de la sauvegarde"),
  });
};

export const useDeleteFacultyContent = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("faculty_content" as any).delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["faculty_content"] });
      toast.success("Faculté supprimée !");
    },
  });
};

// Library books
export const useLibraryBooks = (publishedOnly = false) =>
  useQuery({
    queryKey: ["library_books", publishedOnly],
    queryFn: async () => {
      let q = supabase.from("library_books" as any).select("*").order("display_order", { ascending: true });
      if (publishedOnly) q = q.eq("published", true);
      const { data, error } = await q;
      if (error) throw error;
      return data as any[];
    },
  });

export const useUpsertLibraryBook = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (item: {
      id?: string;
      title: string;
      author?: string;
      description?: string;
      category?: string;
      pdf_url?: string;
      cover_url?: string;
      published?: boolean;
      display_order?: number;
    }) => {
      const { error } = item.id
        ? await supabase.from("library_books" as any).update(item).eq("id", item.id)
        : await supabase.from("library_books" as any).insert(item);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["library_books"] });
      toast.success("Livre sauvegardé !");
    },
    onError: () => toast.error("Erreur lors de la sauvegarde"),
  });
};

export const useDeleteLibraryBook = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("library_books" as any).delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["library_books"] });
      toast.success("Livre supprimé !");
    },
  });
};

// Image upload
export const uploadImage = async (file: File, folder: string): Promise<string> => {
  const ext = file.name.split(".").pop();
  const path = `${folder}/${Date.now()}.${ext}`;
  const { error } = await supabase.storage.from("images").upload(path, file);
  if (error) throw error;
  const { data } = supabase.storage.from("images").getPublicUrl(path);
  return data.publicUrl;
};
