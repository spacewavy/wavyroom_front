"use client";

import React, { FC, useEffect, useRef } from "react";
import { useLoading } from "@/context/loadingContext";
import { useThree } from "@/context/threeContext";
import IntentRequest from "@/assets/icons/intent-request--scale-out 1.svg";
import { useTranslation } from "react-i18next";

import { CAMERA_VIEW_TYPE, FILE_EXTENSION } from "../../lib/utils";
import Image from "next/image";

interface WavyCanvasProps {
  openMenu?: boolean;
}

const WavyCanvas: FC<WavyCanvasProps> = ({ openMenu = false }) => {
  const {
    isEditorLoaded,
    scene,
    camera,
    cameraControls,
    renderer,
    clock,
    loadPercent,
    isModelLoading,
    cameraViewType,
    setCameraViewType,
    hasSecondFloor,
  } = useThree();
  const ref = useRef<HTMLDivElement>(null);
  const { setIsLoading } = useLoading();
  const { t } = useTranslation();

  // Linking with Next <> Threejs context
  useEffect(() => {
    if (!isEditorLoaded || !ref || !ref?.current) {
      return;
    }

    setIsLoading(false);
    onWindowResize(false);
    animate();

    window.addEventListener("resize", () => onWindowResize());

    return () => {
      window?.removeEventListener("resize", () => onWindowResize());
    };
  }, [ref, isEditorLoaded]);

  const animate = () => {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    cameraControls.update(delta);
    renderer.render(scene, camera);
  };

  const onWindowResize = (removeChild = true) => {
    if (removeChild) {
      ref?.current?.removeChild(renderer.domElement);
    }
    if (!ref || !ref.current) return;
    const { clientWidth, clientHeight } = ref.current;
    camera.aspect = clientWidth / clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(clientWidth, clientHeight);
    ref?.current?.appendChild(renderer.domElement);
  };

  return (
    <div
      className={`relative flex flex-1 group ${
        !isEditorLoaded || isModelLoading ? "show-loading" : ""
      }`}
    >
      <div
        ref={ref}
        className="z-10"
        style={{ flex: 1 }}
        onClick={() => {
          console.log(scene);
        }}
      />
      <div className="absolute z-10 bottom-[32px] left-0 right-0 flex flex-col items-center justify-center gap-4 px-4">
        <p className="transition-opacity ease-in duration-500 opacity-100 group-hover:opacity-0 text-[10px] md:text-[12px] lg:text-[14px]">
          {t("customization.canvas-text")}
        </p>
        <div className="flex flex-row bg-white p-[2px] rounded-full">
          <div
            className={`text-[10px] md:text-[12px] py-[4px] md:py-[8px] px-[10px] md:px-[28px] cursor-pointer rounded-full ${
              cameraViewType === CAMERA_VIEW_TYPE.OUTER ? "bg-gray" : ""
            }`}
            onClick={() => {
              setCameraViewType(CAMERA_VIEW_TYPE.OUTER);
            }}
          >
            {t("modeling.outer")}
          </div>
          <div
            className={`text-[10px] md:text-[12px] py-[4px] md:py-[8px] px-[10px] md:px-[28px] cursor-pointer rounded-full ${
              cameraViewType === CAMERA_VIEW_TYPE.INNER_1 ? "bg-gray" : ""
            }`}
            onClick={() => {
              setCameraViewType(CAMERA_VIEW_TYPE.INNER_1);
            }}
          >
            {t("modeling.inner")}
          </div>
          {hasSecondFloor ? (
            <div
              className={`text-[10px] md:text-[12px] py-[4px] md:py-[8px] px-[10px] md:px-[28px] cursor-pointer rounded-full ${
                cameraViewType === CAMERA_VIEW_TYPE.INNER_2 ? "bg-gray" : ""
              }`}
              onClick={() => {
                setCameraViewType(CAMERA_VIEW_TYPE.INNER_2);
              }}
            >
              {t("modeling.inner2")}
            </div>
          ) : null}
        </div>
      </div>
      <div className="absolute z-20 top-0 w-full h-full items-center justify-center bg-gray transition-all ease-in duration-500 hidden group-[.show-loading]:flex">
        <div className="relative w-40 h-40">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              className="text-white stroke-current"
              strokeWidth="5"
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
            ></circle>
            <circle
              className="text-orange progress-ring__circle stroke-current"
              strokeWidth="5"
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              strokeDashoffset={399 - (250 * loadPercent) / 100}
            ></circle>
            <text
              x="50"
              y="50"
              fontFamily="Verdana"
              fontSize="12"
              color="#b2b2b2"
              fill="#4d4d4d"
              textAnchor="middle"
              alignmentBaseline="middle"
            >
              {loadPercent}%
            </text>
          </svg>
        </div>
      </div>
      {openMenu && (
        <div className="absolute z-30 top-0 w-full h-full items-center justify-center bg-black bg-opacity-50"></div>
      )}
    </div>
  );
};

export default WavyCanvas;
