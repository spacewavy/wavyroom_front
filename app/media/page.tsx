"use client";
// hmmm...

import Image from "next/image";
import React, { useEffect } from "react";
import PortfolioImage from "@/public/images/portfolio/portfolio_1.png";
import RightArrowBlack from "@/assets/icons/RightArrowBlack24.svg";
import Link from "next/link";
import WavyDropdown from "../../components/WavyDropdown";
import { useDispatch, useSelector } from "react-redux";
import { fetchMediaData } from "../redux/actions/mediaActions";
import { AnyAction } from "redux";
import { RootState } from "../redux/reducers";
import { NewsMediaItem } from "../redux/types";
import { makeFullUrl } from "../../lib/utils";
import { useTranslation } from "react-i18next";

const Media = () => {
  const dispatch = useDispatch();
  const { data, error } = useSelector((state: RootState) => state.media);
  const { language } = useSelector((state: any) => state.locale);

  const { t } = useTranslation();

  useEffect(() => {
    dispatch(fetchMediaData("news") as unknown as AnyAction);
  }, [language]);

  const OPTIONS = [
    // { value: "all", label: t("media.dropdown-opts.opt-1") },
    { value: "news", label: t("media.dropdown-opts.opt-2") },
    { value: "video", label: t("media.dropdown-opts.opt-3") },
  ];

  const MEDIA_TYPE: any = {
    news: "News",
    video: "Youtube",
  };

  const onDropdownChange = (option: any) => {
    dispatch(fetchMediaData(option.value) as unknown as AnyAction);
  };

  return (
    <main className="flex flex-col flex-1">
      <section className="px-4 pt-16 pb-4 md:px-8 md:pt-32 md:pb-8">
        <div className="flex flex-1 flex-col md:flex-row gap-4">
          <div className="flex flex-1 text-displaySM md:text-displayMD lg:text-displayLG font-light">
            {t("media.title")}
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <div className="text-[12px] text-midGray">
              {t("media.dropdown-title")}
            </div>
            <WavyDropdown
              options={OPTIONS}
              defaultValue={OPTIONS[0]}
              onChange={onDropdownChange}
            />
          </div>
        </div>
      </section>
      {!error && (
        <section className="flex flex-1 flex-col p-4">
          {data.map((item: NewsMediaItem) => (
            <Link
              href={item.link}
              className="flex flex-1 flex-col md:flex-row py-4 gap-4 border-t border-gray"
              key={item.id}
            >
              <div className="flex flex-1">
                <div className="w-full md:max-w-[455px]">
                  <Image
                    className="object-cover"
                    src={makeFullUrl(item.imageURL)}
                    alt="portfolio img"
                    width={1000}
                    height={1000}
                  />
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-4 justify-start">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-row items-start justify-between">
                    <div className="text-[18px] lg:text-[28px] max-w-[524px]">
                      {item.title}
                    </div>
                    <Image
                      className="object-cover ml-4"
                      src={RightArrowBlack}
                      alt="right-arrow"
                      height={24}
                      width={24}
                    />
                  </div>
                  <div className="flex flex-row items-center justify-start gap-2 md:gap-4">
                    <div className="text-[12px] text-darkGray">
                      {item.publisher}
                    </div>
                    <div className="text-[12px] text-darkGray">
                      {item.createdAt}
                    </div>
                  </div>
                </div>
                <div className="flex flex-row">
                  <Link
                    href={item.link}
                    className="text-[12px] bg-lightGray p-1"
                  >
                    {MEDIA_TYPE[item.type]}
                  </Link>
                </div>
              </div>
            </Link>
          ))}
        </section>
      )}
    </main>
  );
};

export default Media;
