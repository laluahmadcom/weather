import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Table, { headerProps } from "~/components/table";
import { getGempadiRasakan, gempaDirasakan } from "~/servers/bmkg.server";

export const loader: LoaderFunction = async ({ request }) => {
  const dataGempa: gempaDirasakan[] = await getGempadiRasakan();

  return json(dataGempa);
};

export default function GempaDiRasakan() {
  const dataGempa = useLoaderData();
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
    { header: "Dirasakan", field: "Dirasakan" },
  ];

  return (
    <main className="flex py-5">
      <div className="flex-col w-fit m-auto">
        <Table
          title="Informasi Gempa Dirasakan"
          headerProps={headerProps}
          tableData={dataGempa}
        />
      </div>
    </main>
  );
}
