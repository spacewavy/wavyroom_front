"use client";

import React, { FC, useEffect, useRef } from "react";
import { useLoading } from "@/context/loadingContext";
import { useThree } from "@/context/threeContext";
import { FILE_EXTENSION } from "../../lib/utils";

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
    changeModel,
    deleteCurrentModel,
    loadPercent,
    isModelLoading,
    setLoadPercent,
  } = useThree();
  const ref = useRef<HTMLDivElement>(null);
  const { setIsLoading } = useLoading();

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
        className="z-10 bg-black"
        style={{ flex: 1 }}
        onClick={() => {
          console.log(scene);
        }}
      ></div>
      <div className="absolute z-20 top-0 w-full h-full items-center justify-center bg-lightGray transition-all ease-in duration-500 hidden group-[.show-loading]:flex">
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
