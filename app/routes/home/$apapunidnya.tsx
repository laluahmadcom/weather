import { useParams } from "@remix-run/react";

export default function HalamanDinamis() {
  const { apapunidnya } = useParams();

  return (
    <main className="text-center text-5xl text-skin-bold p-5">
      Ini halaman dinamis dengan id : {apapunidnya}
    </main>
  );
}
