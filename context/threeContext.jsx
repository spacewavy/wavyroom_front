"use client";

import {
  FILE_EXTENSION,
  OPERATING_SYSTEM,
  WAVY_MODEL_PATHS,
  hexToRgb,
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
  const SCALE = 1 / 15;
  const [os, setOs] = useState(OPERATING_SYSTEM.MAC);
  const [isEditorLoaded, setIsEditorLoaded] = useState(false);
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [shortcutEnabled, setShortcutEnabled] = useState(true);

  const [scene, setScene] = useState(null);
  const [renderer, setRenderer] = useState(null);
  const [clock, setClock] = useState(null);

  const [camera, setCamera] = useState(null);
  const [cameraControls, setCameraControls] = useState(null);
  const [currentModelPath, setCurrentModelPath] = useState(
    WAVY_MODEL_PATHS.MAX_RM
  );

  const [loadPercent, setLoadPercent] = useState(0);

  // initialize
  useEffect(() => {
    // scene and backgorund
    const _scene = new THREE.Scene();
    _scene.background = new THREE.Color(0xe5e5e5);

    const _renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    _renderer.setClearColor(0xffffff, 0);
    _renderer.autoClear = false;
    _renderer.sortObjects = false;
    _renderer.shadowMap.enabled = true;
    _renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    _renderer.toneMapping = THREE.LinearToneMapping;
    _renderer.toneMappingExposure = 2;

    // lighting
    const _ambientLight = new THREE.AmbientLight();
    _ambientLight.intensity = 0.5;

    const _directionalLight = new THREE.DirectionalLight(0xffffff, 3);
    _directionalLight.position.set(
      45 * 15 * SCALE,
      20 * 15 * SCALE,
      30 * 15 * SCALE
    );
    _directionalLight.intensity = 1;
    _directionalLight.castShadow = true;
    _directionalLight.frustumCulled = true;
    // deleting stripe shadow pattern
    _directionalLight.shadow.bias = -0.0001;

    const _hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x000000, 1);
    _scene.add(_ambientLight, _hemisphereLight);

    const _camera = new THREE.PerspectiveCamera(75, 25 / 16, 0.1, 1000);
    // camera
    _camera.position.set(0, 3, 15);
    _camera.add(_directionalLight);
    _camera.lookAt(new THREE.Vector3(0, 0, 0));
    _camera.setFocalLength(35);
    _scene.add(_camera);

    const _cameraControls = new OrbitControls(_camera, _renderer.domElement);
    _cameraControls.enablePan = false;
    _cameraControls.enableDamping = true;
    _cameraControls.dampingFactor = 0.1;
    _cameraControls.screenSpacePanning = false;
    _cameraControls.rotateSpeed = 2;
    // _cameraControls.enableRotate = false;
    _cameraControls.minDistance = 5;
    _cameraControls.maxDistance = 20;
    _cameraControls.maxPolarAngle = Math.PI / 2;

    // const planeGeometry = new THREE.PlaneGeometry(10, 10, 1, 1);
    const planeGeometry = new THREE.BoxGeometry(30, 30, 0.1);
    const planeMaterial = new THREE.MeshBasicMaterial({
      color: 0xa9a9a9,
      // color: 0xffff00,
      side: THREE.DoubleSide,
      shadowSide: THREE.DoubleSide,
    });

    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotateX(-Math.PI / 2);
    plane.receiveShadow = true;

    _scene.add(plane);

    const _clock = new THREE.Clock();

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
    setIsModelLoading(true);
    setLoadPercent(0);

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

    setTimeout(() => {
      setLoadPercent(30);
    }, [350]);

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
              // child.receiveShadow = false;
              // child.castShadow = false;
              if (child.name.toLowerCase().includes("deck")) {
                child.removeFromParent();
              }
              child.visible = true;
              if (child.geometry) {
                let _geometry = child.geometry.clone();
                _geometry = BufferGeometryUtils.mergeVertices(_geometry);
                child.geometry = _geometry;
                // const edges = new THREE.EdgesGeometry(child.geometry);
                // const line = new THREE.LineSegments(
                //   edges,
                //   new THREE.LineBasicMaterial({
                //     color: 0x4e4e4e,
                //     linewidth: 0.5,
                //     opacity: 0.5,
                //   })
                // );
                // line.scale.x = SCALE;
                // line.scale.y = SCALE;
                // line.scale.z = SCALE;
                // scene.add(line);
              }
              child.frustumCulled = false;
              child.updateMatrixWorld();
            });
          });
        }
        object.scale.x = SCALE;
        object.scale.y = SCALE;
        object.scale.z = SCALE;
        object.receiveShadow = true;
        object.castShadow = true;
        // object.receiveShadow = false;
        // object.castShadow = false;

        //for identifying
        object.name = WAVY_MODEL;

        const _localObject = object.clone();
        _localObject.traverse((item) => {
          if (item.name.toLowerCase().includes("deck")) {
            // console.log("item", item);
            // item.parent.remove(item);
            // item.visible = false;
            // try {
            //   item?.removeFromParent();
            // } catch (e) {
            //   console.log("error", e);
            // }
          }
        });

        // calculate center
        const _localCenter = new THREE.Vector3();
        const _localSphere = new THREE.Sphere();
        const box3 = new THREE.Box3().setFromObject(_localObject);
        box3.getCenter(_localCenter);
        box3.getBoundingSphere(_localSphere);
        const _localRadius = Math.ceil(_localSphere.radius);

        console.log("_localCenter", _localCenter);
        // cameraControls.minDistance = _localRadius;

        // camera lookat center of obj
        cameraControls.target.set(
          _localCenter.x,
          _localCenter.y,
          _localCenter.z
        );
        const _cameraPosition = new THREE.Vector3(0, 3, 15)
          .normalize()
          .multiplyScalar(_localRadius);

        console.log("_cameraPosition", _cameraPosition);

        camera.position.set(
          1.5 * _cameraPosition.x,
          1.5 * _cameraPosition.y,
          1.5 * _cameraPosition.z
        );
        // console.log(camera.position);
        camera.lookAt(_localCenter);

        setLoadPercent(80);
        scene.add(object);

        setTimeout(() => {
          setLoadPercent(100);
          setTimeout(() => {
            setIsModelLoading(false);
          }, [500]);
        }, [500]);
      },
      function (xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      function (e) {
        console.log("error", e);
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

  const changeModelColorFromHex = (_color) => {
    try {
      const model = scene.getObjectByName(WAVY_MODEL);
      model.traverse((item) => {
        const name = item.name;
        if (name.includes("_color")) {
          // change all the colors
          item.traverse((obj) => {
            if (obj?.isMesh) {
              obj.material.color = new THREE.Color(
                hexToRgb(_color).r / 255,
                hexToRgb(_color).g / 255,
                hexToRgb(_color).b / 255
              );
            }
          });
        }
      });
    } catch (e) {
      console.error("e", e);
    }
  };

  const test = () => {
    console.log("test clicked", camera.uuid);
    camera.position.set(0, 3, 5);
    camera.position.setX(0);
    camera.position.setY(3);
    camera.position.setZ(5);
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
        loadPercent,
        isModelLoading,
        setLoadPercent,
        changeModelColorFromHex,
        test,
      }}
    >
      {children}
    </ThreeContext.Provider>
  );
};
