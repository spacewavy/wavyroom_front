"use client";

import {
  FILE_EXTENSION,
  OPERATING_SYSTEM,
  WAVY_MODEL_PATHS,
} from "@/lib/utils";
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
const WAVY_MODEL = "wavy_model";

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
  const [currentModelPath, setCurrentModelPath] = useState(
    WAVY_MODEL_PATHS.EVO
  );

  const { setIsLoading } = useLoading();

  // initialize
  useEffect(() => {
    console.log("Three Context initialized in Three Context");
    const _scene = new THREE.Scene();
    _scene.background = new THREE.Color(247 / 255, 247 / 255, 247 / 255, 1);
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

  useEffect(() => {
    if (!isEditorLoaded) return;
    deleteCurrentModel();
    loadFile(FILE_EXTENSION.FBX, `../models/${currentModelPath}`);
  }, [isEditorLoaded, currentModelPath]);

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

  const deleteCurrentModel = () => {
    const _model = scene.getObjectByName(WAVY_MODEL);
    if (!_model) return;
    deleteMeshByMesh(_model);
  };

  const deleteMeshByUuid = (_uuid) => {
    const _mesh = scene.getObjectByProperty("uuid", _uuid);
    if (!_mesh) return;
    deleteMeshByMesh(_mesh);
  };

  const deleteMeshByMesh = (_mesh) => {
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
      });
    } else {
      material.color = newColor;
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
        //for identifying
        object.name = WAVY_MODEL;
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

  const changeModel = (model) => {
    setCurrentModelPath(model);
  };

  const changeMeshVisibilityByName = (_name, _visible) => {
    const _model = scene.getObjectByName(_name);
    if (!_model) return;
    _model.visible = _visible;
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
        changeModel,
        deleteCurrentModel,
        changeMeshVisibilityByName,
      }}
    >
      {children}
    </ThreeContext.Provider>
  );
};
