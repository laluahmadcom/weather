import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Table, { headerProps } from "~/components/table";
import { getGempaTerkini, gempaTerkini } from "~/servers/bmkg.server";

export const loader: LoaderFunction = async ({ request }) => {
  const dataGempa = await getGempaTerkini();

  return json(dataGempa);
};

export default function GempaTerkini() {
  const dataGempa: gempaTerkini[] = useLoaderData();
  const headerProps: headerProps[] = [
    { header: "Tanggal", field: "Tanggal" },
    { header: "Jam", field: "Jam" },
    { header: "Waktu", field: "DateTime", hidden: true },
    { header: "Coordinates", field: "Coordinates" },
    { header: "Lintang", field: "Lintang", hidden: true },
    { header: "Bujur", field: "Bujur", hidden: true },
    { header: "Magnitude", field: "Magnitude" },
    { header: "Kedalaman", field: "Kedalaman" },
    { header: "Wilayah", field: "Wilayah" },
    { header: "Potensi", field: "Potensi" },
  ];

  return (
    <main className="flex py-5">
      <div className="flex-col w-fit m-auto">
        <Table
          title="Informasi Gempa Terkini Magnitudo 5+"
          headerProps={headerProps}
          tableData={dataGempa}
        />
      </div>
    </main>
  );
}
