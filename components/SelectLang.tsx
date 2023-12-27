import i18n from "@/i18n/i18n";
import { useCallback, useState } from "react";

const SelectLang = () => {
  const [lang, setLang] = useState("ENG");
  const setLanguage = useCallback(
    (lang: "ko" | "en") => {
      i18n.changeLanguage(lang);
    },
    [i18n]
  );
  return (
    <section className="flex justify-between w-[63px] h-[22px]">
      <span
        className={`w-[27px] h-[22px] text-sm cursor-pointer ${lang=='KOR' ? 'border-black border-b-2' : 'opacity-50'}`}
        onClick={() => {
          setLanguage("ko");
          setLang("KOR");
        }}
      >
        KOR
      </span>
      <span
        className={`w-[27px] h-[22px] text-sm border-b-2 border-transparent  cursor-pointer ${lang=='ENG' ? 'border-black border-b-2' : 'opacity-50'}`}
        onClick={() => {
          setLanguage("en");
          setLang("ENG");
        }}
      >
        ENG
      </span>
    </section>
  );
};

export default SelectLang;
