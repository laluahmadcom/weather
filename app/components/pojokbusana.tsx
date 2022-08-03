import { useFetcher } from "@remix-run/react";
import { useState } from "react";
import { Button } from "./button";

const listTema = [
  { title: "Rose", value: "", bg: "bg-rose-700" },
  { title: "Zinc", value: "theme-zinc", bg: "bg-zinc-800" },
  { title: "Amber", value: "theme-amber", bg: "bg-amber-500" },
];

export default function PojokBusana() {
  const [showTema, setShowTema] = useState(false);
  const fetchTheme = useFetcher();

  return (
    <div className="absolute right-2 top-0">
      <label
        className="absolute right-2 flex items-center text-skin-reverse
        font-semibold cursor-pointer"
      >
        <Button
          btnSkin="none"
          textSkin="reverse"
          btnLabel=""
          btnIcon="BsFillSunFill"
          otherStyle={`${showTema ? "rotate-180" : "rotate-0"}`}
          onClick={(e) => setShowTema(!showTema)}
        />
        Tema
      </label>

      <div className="absolute right-0 top-9">
        <fetchTheme.Form method="post">
          {showTema && (
            <div className="flex-row bg-skin-bold/70 rounded-b-[4px] p-2 shadow-md">
              {listTema.map((item, index) => (
                <Button
                  key={index}
                  name="TemaGue"
                  type="submit"
                  value={item.value}
                  onClick={(e) =>
                    fetchTheme.submit({ TemaGue: e.currentTarget.value })
                  }
                  btnSkin="none"
                  btnColor={item.bg}
                  textSkin="reverse"
                  btnLabel={item.title}
                  otherStyle="min-h-[20px] min-w-[100px]"
                />
              ))}
            </div>
          )}
        </fetchTheme.Form>
      </div>
    </div>
  );
}
