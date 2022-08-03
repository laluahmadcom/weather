import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getCuaca } from "~/servers/bmkg.server";
import { parseString } from "xml2js";
import { useEffect, useState } from "react";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";

interface weather {
  datetime: string;
  desc: string;
  icon: string;
}

interface iDataCuaca {
  area: string;
  latlng: { lat: number; lng: number };
  weather: weather[];
}

export const loader: LoaderFunction = async ({ request }) => {
  const dataXmlCuaca = await getCuaca();
  const mapApi = process.env.GOOGLE_MAPS_APIKEY;

  return { mapApi, dataXmlCuaca };
};

export default function Cuaca() {
  const { mapApi, dataXmlCuaca } = useLoaderData();
  const [dataBMKG, setDataBMKG] = useState<any[]>([]);

  // Olah Data Cuaca BMKG
  useEffect(() => {
    parseString(dataXmlCuaca, { explicitArray: false }, function (err, result) {
      setDataBMKG(result.data.forecast.area);
    });
  }, [dataXmlCuaca]);

  let dataCuaca: iDataCuaca[] = [];
  {
    dataCuaca.length === 0 &&
      dataBMKG.map((area) => {
        for (let i in area.parameter) {
          {
            dataCuaca.findIndex((data) => {
              return data.area == area.name[1]._;
            }) === -1 &&
              dataCuaca.push({
                area: area.name[1]._,
                latlng: {
                  lat: Number(area.$.latitude),
                  lng: Number(area.$.longitude),
                },
                weather: [],
              });
          }

          const weather = area.parameter[i].$.id;
          if (weather === "weather") {
            for (let n in area.parameter[i].timerange) {
              let kodeCuaca = area.parameter[i].timerange[n].value._;

              dataCuaca[
                dataCuaca.findIndex((data) => {
                  return data.area == area.name[1]._;
                })
              ].weather.push({
                datetime: area.parameter[i].timerange[n].$.datetime,
                desc: getDescCuaca(kodeCuaca).desc,
                icon: getDescCuaca(kodeCuaca).icon,
              });
            }
          }
        }
      });
  }

  let datetimeList: string[] = [];
  {
    datetimeList.length === 0 &&
      dataCuaca.map((item) => {
        let weather = item.weather;
        for (let i in weather) {
          datetimeList.findIndex((tgl) => {
            return tgl === weather[i].datetime;
          }) === -1 && datetimeList.push(weather[i].datetime);
        }
      });
  }

  function formatMask(value: string, pattern: string) {
    let i = 0;
    const v = value.toString();
    return pattern.replace(/#/g, (_) => v[i++]);
  }

  const date = new Date();
  const tgl =
    String(date.getFullYear()) +
    ("0" + String(date.getMonth() + 1)).slice(-2) +
    ("0" + String(date.getDate())).slice(-2) +
    ("0" + String(date.getHours())).slice(-2) +
    "00";
  const defaultTgl =
    datetimeList[datetimeList.findIndex((date) => date > tgl) - 1];
  const [waktuPerkiraan, setWaktuPerkiraan] = useState("");

  function getDescCuaca(kode: string) {
    switch (kode) {
      case "0":
        return { desc: "Cerah", icon: "/images/weather/0.svg" };
      case "1" || "2":
        return { desc: "Cerah Berawan", icon: "/images/weather/1.svg" };
      case "3":
        return { desc: "Berawan", icon: "/images/weather/3.svg" };
      case "4":
        return { desc: "Berawan Tebal", icon: "/images/weather/4.svg" };
      case "5":
        return { desc: "Udara Kabur", icon: "/images/weather/5.svg" };
      case "10":
        return { desc: "Asap", icon: "/images/weather/10.svg" };
      case "45":
        return { desc: "Kabut", icon: "/images/weather/45.svg" };
      case "60":
        return { desc: "Hujan Ringan", icon: "/images/weather/60.svg" };
      case "61":
        return { desc: "Hujan Sedang", icon: "/images/weather/61.svg" };
      case "63":
        return { desc: "Hujan Lebat", icon: "/images/weather/63.svg" };
      case "80":
        return { desc: "Hujan Lokal", icon: "/images/weather/80.svg" };
      case "95" || "97":
        return { desc: "Hujan Petir", icon: "/images/weather/95.svg" };
      default:
        return { desc: "Unknown", icon: "" };
    }
  }

  function getMarkerAtt(item: iDataCuaca, datetime: string) {
    let desc = item.weather.find(
      (weather) => weather.datetime === datetime
    )?.desc;
    let icon = item.weather.find(
      (weather) => weather.datetime === datetime
    )?.icon;

    return { desc, icon };
  }

  // Google Maps
  const containerStyle = { width: "90%", height: "670px" };
  const MapOptions = { gestureHandling: "cooperative" };
  const [map, setMap] = useState(null);
  const [activeMarker, setActiveMarker] = useState("");

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: mapApi,
  });

  const onLoad = (map: any) => {
    const bounds = new window.google.maps.LatLngBounds();

    dataCuaca.map((item) => bounds.extend(item.latlng));
    map.fitBounds(bounds, containerStyle);
    setMap(map);
    setWaktuPerkiraan(defaultTgl);
  };

  return isLoaded ? (
    <main className="flex min-w-screen min-h-fit w-auto h-auto justify-center">
      <GoogleMap
        mapContainerStyle={containerStyle}
        onLoad={onLoad}
        options={MapOptions}
      >
        <div
          className="absolute flex m-1 top-[6px] right-12 w-fit h-10 bg-skin-bold/70 
          items-center text-skin-bold px-3 py-1 rounded-md"
        >
          <label className="font-semibold">
            Waktu Prakiraan
            <select
              className="h-9 w-fit outline-none px-[2px] bg-transparent"
              value={waktuPerkiraan}
              onChange={(e) => setWaktuPerkiraan(e.currentTarget.value)}
            >
              {datetimeList.map((dt, index) => (
                <option key={index} value={dt} className="bg-skin-bold/70">
                  {formatMask(dt, "Tanggal ####/##/## Pukul ##:##")}
                </option>
              ))}
            </select>
          </label>
        </div>

        {dataCuaca.map((item, index) => {
          return (
            <Marker
              key={index}
              position={item.latlng}
              onClick={(e) => setActiveMarker(item.area)}
              icon={getMarkerAtt(item, waktuPerkiraan).icon}
            >
              {activeMarker === item.area ? (
                <InfoWindow onCloseClick={() => setActiveMarker("")}>
                  <div className="flex-col">
                    <h1 className="font-semibold text-skin-bold mb-[2px]">
                      {item.area}
                    </h1>
                    <h1 className="mb-2">
                      {formatMask(
                        waktuPerkiraan,
                        "Tanggal ####/##/## Pukul ##:##"
                      )}
                    </h1>
                    <p className="text-skin-base font-semibold">
                      {getMarkerAtt(item, waktuPerkiraan).desc}
                    </p>
                  </div>
                </InfoWindow>
              ) : null}
            </Marker>
          );
        })}
      </GoogleMap>
    </main>
  ) : (
    <></>
  );
}
