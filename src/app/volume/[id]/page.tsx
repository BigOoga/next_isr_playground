import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // fetch data
  const volume: Volume = await fetch(
    `http://localhost:3000/volumes/${params.id}`
  ).then((res) => res.json());

  return {
    title: volume.name,
    description: volume.description,
  };
}

export async function generateStaticParams() {
  const stories = await fetch("http://localhost:3000/volumes").then((res) =>
    res.json()
  );

  return stories.map((volume: any) => ({
    id: volume.id,
  }));
}

interface Volume {
  id: string;
  name: string;
  description: string;
  content: string;
}

// Next.js will invalidate the cache when a
// request comes in, at most once every hour.
export const revalidate = 3600;

// We'll prerender only the params from `generateStaticParams` at build time.
// If a request comes in for a path that hasn't been generated,
// Next.js will server-render the page on-demand.
export const dynamicParams = true; // or false, to 404 on unknown paths

export default async function Page({ params }: { params: { id: string } }) {
  let volume: Volume = await fetch(
    `http://localhost:3000/volumes/${params.id}`,
    {
      next: { tags: ["volumes"] },
    }
  ).then((res) => res.json());

  return (
    <>
      <h1>Titolo: "{volume.name}"</h1>
      <p>Descrizione: {volume.content}</p>
      <p>Il tempo di rivalidazione è di <b>{revalidate}</b> secondi.</p>
      <p>
        dynamicParams è <b>{dynamicParams ? "attivo" : "inattivo"}</b>, se next riceve
        una richiesta per una pagina che non è stata generata alla build{" "}
        {dynamicParams
          ? "questa verrà generata alla prima richiesta"
          : "verrà restituito un 404"}
      </p>
    </>
  );
}
