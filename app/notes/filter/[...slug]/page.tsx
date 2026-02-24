import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import type { Tag } from "@/types/note"
import { getSingleNote } from "@/lib/api";
import { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const note = await getSingleNote(id)
  return {
    title: `Note: ${note.title}`,
    description: note.content.slice(0, 30),
    openGraph: {
      title: `Note: ${note.title}`,
      description: note.content.slice(0, 30),
      url: `https://notehub.com/notes/${id}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "NoteHub preview",
        },
      ],
    },
  };
}

export default async function NotesPage({ params }: { params: Promise<{ slug: string[] }> }) {
    const { slug } = await params;
  const tag: Tag | string = slug[0];
  const client = new QueryClient();

  await client.prefetchQuery({
    queryKey: ["notes", 1, "", tag], 
    queryFn: () =>
      fetchNotes({
        page: 1,
        perPage: 12,
        search: "",
        tag
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(client)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
