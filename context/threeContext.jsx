"use client";

import { FILE_EXTENSION, OPERATING_SYSTEM } from "@/lib/utils";
import React, { createContext, useContext, useEffect, useState } from "react";
import * as THREE from "three";

import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { USDZLoader } from "three/examples/jsm/loaders/USDZLoader";
import { PLYLoader } from "three/examples/jsm/loaders/PLYLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import * as BufferGeometryUtils from "three/addons/utils/BufferGeometryUtils.js";
import {
  acceleratedRaycast,
  computeBoundsTree,
  disposeBoundsTree,
} from "three-mesh-bvh";
import { useLoading } from "./loadingContext";
// import Logger from "../utils/logger";

THREE.Mesh.prototype.raycast = acceleratedRaycast;
THREE.BufferGeometry.prototype.computeBoundsTree = computeBoundsTree;
THREE.BufferGeometry.prototype.disposeBoundsTree = disposeBoundsTree;

const ThreeContext = createContext();

export const useThree = () => useContext(ThreeContext);

export const ThreeProvider = ({ children }) => {
  const [os, setOs] = useState(OPERATING_SYSTEM.MAC);
  const [isEditorLoaded, setIsEditorLoaded] = useState(false);
  const [shortcutEnabled, setShortcutEnabled] = useState(true);

  const [scene, setScene] = useState(null);
  const [renderer, setRenderer] = useState(null);
  const [clock, setClock] = useState(null);

  const [camera, setCamera] = useState(null);
  const [cameraControls, setCameraControls] = useState(null);

  const { setIsLoading } = useLoading();

  // initialize
  useEffect(() => {
    console.log("Three Context initialized in Three Context");
    const _scene = new THREE.Scene();
    _scene.background = new THREE.Color(247 / 255, 247 / 255, 247 / 255, 1);
    // const _renderer = new THREE.WebGLRenderer();
    const _renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    _renderer.setClearColor(0xffffff, 0);
    _renderer.autoClear = false;
    _renderer.sortObjects = false;
    _renderer.shadowMap.enabled = true;
    _renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const _camera = new THREE.PerspectiveCamera(75, 25 / 16, 0.1, 1000);
    _camera.setFocalLength(35);
    const _cameraControls = new OrbitControls(_camera, _renderer.domElement);

    const _clock = new THREE.Clock();

    // lighting
    const _ambientLight = new THREE.AmbientLight();
    _ambientLight.intensity = 1;
    _scene.add(_ambientLight);

    // camera
    _camera.position.set(0, 3, 15);
    _camera.lookAt(new THREE.Vector3(0, 0, 0));

    setOperatingSystem();
    setScene(_scene);
    setRenderer(_renderer);
    setCamera(_camera);
    setCameraControls(_cameraControls);
    setClock(_clock);

    setIsEditorLoaded(true);
  }, []);

  // useEffect(() => {
  //   if (!isEditorPreLoaded) return;
  //   // loadFile(FILE_EXTENSION.FBX, "../models/WROOM-MAX-A.fbx");
  //   // loadFile(FILE_EXTENSION.OBJ, "../models/male02.obj");
  //   setIsEditorLoaded(true);
  // }, [isEditorPreLoaded]);

  const setOperatingSystem = () => {
    const _appVersion = window.navigator.appVersion;
    if (_appVersion.indexOf("Win") !== -1) {
      setOs(OPERATING_SYSTEM.WINDOW);
      return;
    } else if (_appVersion.indexOf("Mac") !== -1) {
      setOs(OPERATING_SYSTEM.MAC);
      return;
    } else if (_appVersion.indexOf("X11") !== -1) {
      setOs(OPERATING_SYSTEM.UNIX);
      return;
    } else if (_appVersion.indexOf("Linux") !== -1) {
      setOs(OPERATING_SYSTEM.LINUX);
      return;
    }
  };

  const shortCutHandler = (event) => {
    if (!shortcutEnabled) return;
    const isMac = os === OPERATING_SYSTEM.MAC;
    const { shiftKey, metaKey, ctrlKey, code } = event;
    const ctrlKeyByOs = isMac ? metaKey : ctrlKey;

    if (!shiftKey && ctrlKeyByOs && code === "KeyQ") {
      event.preventDefault();
    } else if (!shiftKey && ctrlKeyByOs && code === "KeyW") {
      event.preventDefault();
    } else if (!shiftKey && ctrlKeyByOs && code === "KeyD") {
      event.preventDefault();
    }
  };

  const deleteMeshByUuid = (_uuid) => {
    const _mesh = scene.getObjectByProperty("uuid", _uuid);
    if (!_mesh) return;
    deleteMeshByMesh(_mesh);
  };

  const deleteMeshByMesh = (_mesh) => {
    outlinePass.selectedObjects = [];
    _mesh?.traverse((child) => {
      if (child?.geometry) child?.geometry?.dispose();
      if (child?.material) {
        child?.material.length
          ? child?.material.map((item) => {
              item.dispose();
            })
          : child?.material?.dispose();
      }
    });
    setSelectedMeshUuidsForAction([
      ...selectedMeshUuidsForAction.filter((item) => {
        item !== _mesh.uuid;
      }),
    ]);
    if (_mesh.parent !== null) {
      _mesh.parent.remove(_mesh);
    } else {
      scene.remove(_mesh);
    }
  };

  const changeMeshColor = async (_mesh, _color) => {
    if (!_mesh) return;
    const newColor =
      typeof _color === "string"
        ? new THREE.Color(_color)
        : new THREE.Color(
            _color.rgba.r / 255,
            _color.rgba.g / 255,
            _color.rgba.b / 255
          );
    const material = _mesh.material;
    if (material.length) {
      material.map((item) => {
        item.color = newColor;
        // item.needsUpdate = true
      });
    } else {
      material.color = newColor;
      // material.needsUpdate = true
    }
    _mesh.material = material;
    _mesh.frustumCulled = false;
  };

  const loadFile = (extension, url) => {
    let loader;
    // setIsLoading(true);
    switch (extension) {
      case FILE_EXTENSION.OBJ:
        loader = new OBJLoader();
        break;
      case FILE_EXTENSION.FBX:
        loader = new FBXLoader();
        break;
      case FILE_EXTENSION.GLB:
      case FILE_EXTENSION.GLTF:
        loader = new GLTFLoader();
        break;
      case FILE_EXTENSION.USD:
      case FILE_EXTENSION.USDZ:
        loader = new USDZLoader();
        break;
      case FILE_EXTENSION.JSON:
        loader = new THREE.ObjectLoader();
        break;
      case FILE_EXTENSION.PLY:
        loader = new PLYLoader();
        break;
      default:
        loader = new FBXLoader();
        break;
    }

    loader.load(
      url,
      function (model) {
        let object;
        if (
          extension === FILE_EXTENSION.GLTF ||
          extension === FILE_EXTENSION.GLB
        ) {
          object = model.scene;
        } else {
          object = model;
        }

        if (object?.children.length) {
          object.children.map((_obj) => {
            _obj.traverse((child) => {
              child.receiveShadow = true;
              child.castShadow = true;
              child.visible = true;
              if (child.geometry) {
                let _geometry = child.geometry;
                _geometry = BufferGeometryUtils.mergeVertices(_geometry);
                child.geometry = _geometry;
              }
              child.frustumCulled = false;
              child.updateMatrixWorld();
            });
          });
        } else {
          object.receiveShadow = true;
          object.castShadow = true;
        }

        object.scale.x = 1 / 20;
        object.scale.y = 1 / 20;
        object.scale.z = 1 / 20;
        scene.add(object);
        // setIsLoading(false);
      },
      undefined,
      function (e) {
        // Logger.log("error", e);
        // setIsLoading(false);
      }
    );
  };

  return (
    <ThreeContext.Provider
      value={{
        isEditorLoaded,
        scene,
        camera,
        cameraControls,
        renderer,
        clock,
        changeMeshColor,
        deleteMeshByUuid,
        deleteMeshByMesh,
        loadFile,
        setShortcutEnabled,
      }}
    >
      {children}
    </ThreeContext.Provider>
  );
};
