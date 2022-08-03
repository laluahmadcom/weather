export interface iInfoGempa {
  Tanggal: string;
  Jam: string;
  DateTime: string;
  Coordinates: string;
  Lintang: string;
  Bujur: string;
  Magnitude: string;
  Kedalaman: string;
  Wilayah: string;
}

export interface autoGempa extends iInfoGempa {
  Potensi: string;
  Dirasakan: string;
  Shakemap: string;
}

export interface gempaTerkini extends iInfoGempa {
  Potensi: string;
}

export interface gempaDirasakan extends iInfoGempa {
  Dirasakan: string;
}

export async function getAutoGempa() {
  const fetchGempa = await fetch(
    "https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json"
  ).then((res) => res.json());

  const dataGempa: autoGempa = fetchGempa.Infogempa.gempa;

  return dataGempa;
}

export async function getGempaTerkini() {
  const fetchGempa = await fetch(
    "https://data.bmkg.go.id/DataMKG/TEWS/gempaterkini.json"
  ).then((res) => res.json());

  const dataGempa: gempaTerkini[] = await fetchGempa.Infogempa.gempa;

  return dataGempa;
}

export async function getGempadiRasakan() {
  const fetchGempa = await fetch(
    "https://data.bmkg.go.id/DataMKG/TEWS/gempadirasakan.json"
  ).then((res) => res.json());

  const dataGempa: gempaDirasakan[] = fetchGempa.Infogempa.gempa;

  return dataGempa;
}

export async function getCuaca() {
  const fetchCuaca = await fetch(
    "https://data.bmkg.go.id/DataMKG/MEWS/DigitalForecast/DigitalForecast-Indonesia.xml"
  ).then((res) => res.text());

  return fetchCuaca;
}
