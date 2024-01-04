import i18n from "@/i18n/i18n";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction } from "redux";
import { changeLanguage } from "@/app/redux/actions/localeActions";

const SelectLang = () => {
  const { language } = useSelector((state: any) => state.locale);
  const dispatch = useDispatch();

  const setLanguage = useCallback(
    (lang: "ko" | "en") => {
      i18n.changeLanguage(lang);
      dispatch(changeLanguage(lang) as unknown as AnyAction);
    },
    [i18n]
  );
  return (
    <section className="flex justify-between w-[63px] h-[22px]">
      <span
        className={`w-[27px] h-[22px] text-sm cursor-pointer ${
          language == "ko" ? "border-black border-b-2" : "opacity-50"
        }`}
        onClick={() => {
          setLanguage("ko");
        }}
      >
        KOR
      </span>
      <span
        className={`w-[27px] h-[22px] text-sm cursor-pointer ${
          language == "en" ? "border-black border-b-2" : "opacity-50"
        }`}
        onClick={() => {
          setLanguage("en");
        }}
      >
        ENG
      </span>
    </section>
  );
};

export default SelectLang;
