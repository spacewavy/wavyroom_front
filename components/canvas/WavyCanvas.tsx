"use client";

import React, { useEffect, useRef } from "react";
import { useLoading } from "@/context/loadingContext";
import { useThree } from "@/context/threeContext";
import { FILE_EXTENSION } from "../../lib/utils";

const WavyCanvas = () => {
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
        className="z-10"
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
              stroke-width="5"
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
            ></circle>
            <circle
              className="text-orange progress-ring__circle stroke-current"
              stroke-width="5"
              stroke-linecap=""
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              stroke-dashoffset={399 - (250 * loadPercent) / 100}
            ></circle>
            <text
              x="50"
              y="50"
              font-family="Verdana"
              font-size="12"
              color="#b2b2b2"
              fill="#4d4d4d"
              text-anchor="middle"
              alignment-baseline="middle"
            >
              {loadPercent}%
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default WavyCanvas;
