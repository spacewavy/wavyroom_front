"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import jsPDF from "jspdf";
import axiosInstance from "../../api/axioInstance";
import { useSearchParams } from "next/navigation";
import CallInquery from "../../components/CallInquery";
import { makeFullUrl } from "../../lib/utils";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import * as htmlToImage from "html-to-image";

const Completion = () => {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const pdfRefElement = useRef<HTMLDivElement>(null);

  const [result, setResult] = useState<any>(null);
  const { language } = useSelector((state: any) => state.locale);

  useEffect(() => {
    if (!id) return;
    fetchReservation(id);
  }, [id, language]);

  const fetchReservation = async (id: string) => {
    try {
      const {
        data: { data },
      } = await axiosInstance.get(`/reservation/${id}`, {
        headers: {
          Accept: "application/json",
          language: language,
        },
      });
      setResult(data);
      console.log("<<<", data);
    } catch (e) {
      console.error("e", e);
    }
  };

  const handlePdfExport = () => {
    const pdfComponent = document.getElementById("pdf");
    if (!pdfComponent) return;

    pdfComponent.style.display = "flex";
    htmlToImage.toCanvas(pdfComponent).then(function (canvas) {
      document.body.appendChild(canvas);
      const pdfWidth = 210;
      const pdfHeight = 297;

      const pdf = new jsPDF({
        orientation: "p",
        unit: "mm",
        format: [pdfWidth, pdfHeight],
      });

      let imgWidth, imgHeight;
      if (canvas.height / canvas.width > pdfHeight / pdfWidth) {
        imgHeight = pdfHeight;
        imgWidth = imgHeight * (canvas.width / canvas.height);
      } else {
        imgWidth = pdfWidth;
        imgHeight = (canvas.height * imgWidth) / canvas.width;
      }

      const imgData = canvas.toDataURL("image/png");
      let position = 0;
      pdf.addImage(
        imgData,
        "PNG",
        (pdfWidth - imgWidth) / 2,
        position,
        imgWidth,
        imgHeight
      );

      pdf.save(`product-receipt.pdf`);
      pdfComponent.style.display = "none";
      canvas.remove();
    });
  };

  const CompletionComponent = ({ isPDfElement = false }) => {
    return (
      <div className="flex flex-col flex-1">
        {isPDfElement ? (
          <div className="bg-black py-8 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M16.5146 3.41637V4.48003e-07H13.2117H9.90879L6.60586 0V3.41637V13.6655V17.0819H9.90879H13.2117V20.5836H3.30294V4.48003e-07H0V20.5836V24H3.30294H13.2117H16.5146V20.5836V17.0819H19.8176H23.1205V13.6655V4.48003e-07H19.8176V13.6655H16.5146V3.41637ZM9.90879 3.41637V13.6655H13.2117V3.41637H9.90879Z"
                fill="white"
              />
            </svg>
          </div>
        ) : null}
        <div className="py-16 md:py-32 w-full px-4">
          <div className="flex flex-col justify-center items-center text-center w-full">
            <div className="text-[28px] md:text-[40px] font-light mb-4">
              <span>
                {t("customization.customization-completion.title")}
                <br />
                {result?.user?.name}
                {t("customization.customization-completion.customer")}{" "}
                {result?.model?.name}{" "}
                {t("customization.customization-completion.sub-title")}
              </span>
            </div>
            <div className="mb-16">
              <span className="text-[12px] md:text-[16px] font-light">
                {language === "ko" ? (
                  <>
                    {result?.user?.email}{" "}
                    {t("customization.customization-completion.mail")}
                  </>
                ) : (
                  <>
                    {t("customization.customization-completion.mail")}{" "}
                    {result?.user?.email}
                  </>
                )}
              </span>
            </div>
            <div className="flex flex-1 w-full md:px-8 items-center justify-center mb-16">
              <div className="relative aspect-[600/273] max-w-[600px] flex flex-1">
                <Image
                  src={makeFullUrl(result?.model?.imageURL)}
                  alt="img"
                  fill
                  objectFit="contain"
                />
              </div>
            </div>
            {!isPDfElement ? (
              <div className="mb-8 mt-16 md:my-16 py-8 border-y-[1px] flex justify-center w-full">
                <div className="flex gap-8">
                  <div className="py-2 flex flex-col gap-2 items-center cursor-pointer">
                    <div
                      className=" rounded-full border-[1px] p-[11px] flex justify-center items-center w-[42px] h-[42px]"
                      onClick={handlePdfExport}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="13"
                        viewBox="0 0 12 13"
                        fill="none"
                      >
                        <path
                          d="M11.25 8.58301V11.583H0.75V8.58301H0V12.333H12V8.58301H11.25Z"
                          fill="black"
                        />
                        <path
                          d="M9.63828 5.47051L9.11328 4.94551L6.37578 7.67551V0.333008H5.62578V7.67551L2.88828 4.94551L2.36328 5.47051L6.00078 9.11551L9.63828 5.47051Z"
                          fill="black"
                        />
                      </svg>
                    </div>
                    <span className="text-[12px] font-normal">
                      PDF {t("customization.section-2.download")}
                    </span>
                  </div>
                </div>
              </div>
            ) : null}
            <section className="cursol-pointer w-full ">
              <div className="px-8 py-4 flex justify-between">
                <span className="text-[14px] font-normal">
                  {t("customization.section-2.listItem-1")}
                </span>
                <span className="text-[12px] font-light">
                  {result?.model?.name}
                </span>
              </div>
              {(language === "ko" ? result?.optionsKO : result?.options) &&
                Object.keys(
                  language === "ko" ? result.optionsKO : result.options
                ).map((_option) => (
                  <div className="px-8 py-4 flex justify-between" key={_option}>
                    <span className="text-[14px] font-normal">{_option}</span>
                    <span className="text-[12px] font-light">
                      {typeof (language === "ko"
                        ? result.optionsKO[_option]
                        : result.options[_option]) === "string"
                        ? language === "ko"
                          ? result.optionsKO[_option]
                          : result.options[_option]
                        : language === "ko"
                        ? result.optionsKO[_option].join(" ")
                        : result.options[_option].join(" ")}
                    </span>
                  </div>
                ))}
            </section>
            <div className="w-full flex justify-between items-center border-y-[1px] mt-0 lg:mt-8 mb-16 p-8">
              <span className="text-[14px] font-normal">
                {t("customization.section-2.bottom-price")}
              </span>
              <span className="text-[24px] font-light">
                {result?.totalPrice.toLocaleString()}
                {t("customization.section-2.price-symbol")}
              </span>
            </div>
            {!isPDfElement ? (
              <div className="flex justify-center">
                <div className="px-4 py-2 flex items-center gap-[8px] bg-jetBlack rounded-full w-fit">
                  <span className="text-white text-[12px]">
                    {t("customization.section-2.button-text")}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="19"
                    height="19"
                    viewBox="0 0 19 19"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_3200_1508)">
                      <path
                        d="M10.52 4.57031L9.9875 5.10281L13.8425 8.95781H3.875V9.70781H13.85L9.9875 13.5703L10.5125 14.0953L15.2825 9.34031L10.52 4.57031Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_3200_1508">
                        <rect
                          width="18"
                          height="18"
                          fill="white"
                          transform="translate(0.5 0.333008)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>
            ) : null}
          </div>
        </div>
        {!isPDfElement ? (
          <div className="bg-lightGray py-16 px-4 md:p-16 flex flex-col items-center text-center justify-center">
            <div className="text-[28px] md:text-[40px] font-light">
              <span>{t("customization.section-3")}</span>
            </div>
            <div className="w-full md:w-[80%] lg:w-[33%] mt-4 mb-8">
              <span className="text-[12px] md:text-[16px] font-light">
                Every Wavyroom reservation goes through a careful review
                process. We’ll send an email when it’s time for next steps. We
                may also reach out to you to collect additional information
                about your property.
              </span>
            </div>
            <CallInquery />
          </div>
        ) : null}
      </div>
    );
  };

  return (
    <>
      <div className="relative">
        <div className="relative top-0 z-10 bg-white">
          <CompletionComponent isPDfElement={false} />
        </div>
        <div id="pdf" ref={pdfRefElement} className="z-0 w-[1200px] hidden">
          <CompletionComponent isPDfElement={true} />
        </div>
      </div>
    </>
  );
};

export default Completion;
