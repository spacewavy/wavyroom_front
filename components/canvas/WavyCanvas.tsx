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
    loadFile,
  } = useThree();
  const ref = useRef<HTMLDivElement>(null);
  const { setIsLoading } = useLoading();

  useEffect(() => {
    if (!isEditorLoaded || !ref || !ref?.current) {
      return;
    }

    setIsLoading(false);
    onWindowResize(false);
    console.log("ANIMATE");
    ref?.current?.appendChild(renderer.domElement);
    loadFile(FILE_EXTENSION.FBX, "../models/test.fbx");
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
    <div className="flex flex-1">
      <div ref={ref} style={{ flex: 1 }}></div>
    </div>
  );
};

export default WavyCanvas;
