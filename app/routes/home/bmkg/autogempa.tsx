import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getAutoGempa, autoGempa } from "~/servers/bmkg.server";

const imgPath = "https://data.bmkg.go.id/DataMKG/TEWS/";

export const loader: LoaderFunction = async ({ request }) => {
  const dataGempa = await getAutoGempa();

  return json(dataGempa);
};

export default function LatestGempa() {
  const dataGempa: autoGempa = useLoaderData();
  return (
    <main className="flex py-5">
      <div className="flex flex-wrap gap-2 m-auto">
        <div className="w-fit px-2 text-skin-base text-lg">
          <div>Tanggal : {dataGempa.Tanggal}</div>
          <div>Jam : {dataGempa.Jam}</div>
          <div>Waktu : {dataGempa.DateTime}</div>
          <div>Coordinates : {dataGempa.Coordinates}</div>
          <div>Lintang : {dataGempa.Lintang}</div>
          <div>Bujur : {dataGempa.Bujur} </div>
          <div>Magnitude : {dataGempa.Magnitude} </div>
          <div>Kedalaman : {dataGempa.Kedalaman} </div>
          <div>Wilayah : {dataGempa.Wilayah} </div>
          <div>Potensi : {dataGempa.Potensi} </div>
          <div>Dirasakan : {dataGempa.Dirasakan} </div>
        </div>
        <img
          src={imgPath + dataGempa.Shakemap}
          className="object-cover overflow-hidden rounded-lg"
        />
      </div>
    </main>
  );
}
