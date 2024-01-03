"use client";

import {
  CAMERA_VIEW_TYPE,
  FILE_EXTENSION,
  OPERATING_SYSTEM,
  WAVY_MODEL_PATHS,
  hexToRgb,
  makeFullUrl,
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
import { useSelector } from "react-redux";
// import Logger from "../utils/logger";

THREE.Mesh.prototype.raycast = acceleratedRaycast;
THREE.BufferGeometry.prototype.computeBoundsTree = computeBoundsTree;
THREE.BufferGeometry.prototype.disposeBoundsTree = disposeBoundsTree;

const ThreeContext = createContext();
const WAVY_MODEL = "wavy_model";

export const useThree = () => useContext(ThreeContext);

export const ThreeProvider = ({ children }) => {
  const SCALE = 1 / 15;
  const [isEditorLoaded, setIsEditorLoaded] = useState(false);
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [loadPercent, setLoadPercent] = useState(0);

  const [scene, setScene] = useState(null);
  const [renderer, setRenderer] = useState(null);
  const [clock, setClock] = useState(new THREE.Clock());
  const [camera, setCamera] = useState(null);
  const [cameraControls, setCameraControls] = useState(null);

  const [localCenter, setLocalCenter] = useState(new THREE.Vector3());
  const [cameraViewType, setCameraViewType] = useState(CAMERA_VIEW_TYPE.OUTER);
  const [currentModelPath, setCurrentModelPath] = useState(null);

  const { data: optionData } = useSelector((state) => state.customization);

  // initialize
  useEffect(() => {
    // scene and backgorund
    const _scene = new THREE.Scene();
    _scene.background = new THREE.Color(0xe5e5e5);
    _scene.fog = new THREE.Fog(0xe5e5e5, 50, 1000);

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

    const _directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    _directionalLight.position.set(
      45 * 15 * SCALE,
      20 * 15 * SCALE,
      30 * 15 * SCALE
    );
    _directionalLight.castShadow = true;
    _directionalLight.frustumCulled = true;
    // deleting stripe shadow pattern
    _directionalLight.shadow.bias = -0.0001;

    const _hemisphereLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 1);
    _scene.add(_ambientLight, _hemisphereLight);

    // camera
    const _camera = new THREE.PerspectiveCamera(75, 25 / 16, 0.1, 1000);
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

    const planeGeometry = new THREE.PlaneGeometry(500, 500, 32, 32);
    const planeMaterial = new THREE.MeshStandardMaterial({
      color: 0xd5d5d5,
      side: THREE.DoubleSide,
      opacity: 0.2,
      transparent: true,
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotateX(-Math.PI / 2);
    plane.receiveShadow = true;
    _scene.add(plane);

    setScene(_scene);
    setRenderer(_renderer);
    setCamera(_camera);
    setCameraControls(_cameraControls);

    setIsEditorLoaded(true);
  }, []);

  // loading file
  useEffect(() => {
    if (!isEditorLoaded) return;
    if (!currentModelPath) return;
    loadFile(currentModelPath);
  }, [isEditorLoaded, currentModelPath]);

  // change camera view type
  useEffect(() => {
    if (!isEditorLoaded) return;
    switch (cameraViewType) {
      case CAMERA_VIEW_TYPE.INNER_1:
        setCameraInnerView();
        break;
      case CAMERA_VIEW_TYPE.INNER_2:
        setCameraInnerView();
        break;
      case CAMERA_VIEW_TYPE.OUTER:
        setCameraOuterView();
        break;
      default:
        break;
    }
  }, [isEditorLoaded, cameraViewType]);

  // change the mesh visibility from optionData
  useEffect(() => {
    handleOptionVisibility();
  }, [optionData]);

  const deleteCurrentModel = () => {
    const _models = scene.getObjectsByProperty("name", WAVY_MODEL);
    if (!_models.length) return;
    _models.map((_model) => {
      deleteMeshByMesh(_model);
    });
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

  const loadFile = (url) => {
    let loader;
    if (!url) return;
    if (isModelLoading) return;
    const extension = url.split(".")[url.split(".").length - 1];
    if (!extension) {
      return;
    }

    setIsModelLoading(true);
    setLoadPercent(0);

    deleteCurrentModel();
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
        //for identifying
        object.name = WAVY_MODEL;

        let deckObjList = [];
        let removeObjectList = [];
        if (object?.children.length) {
          object.children.reverse().map((_obj, _idx) => {
            const _receiveShadow =
              _obj.name.toLowerCase().includes("roof") ||
              _obj.name.toLowerCase().includes("deck") ||
              _obj.name.toLowerCase().includes("roof");

            _obj.traverse((child) => {
              child.castShadow = true;

              // setup receiveShadow by parent
              child.receiveShadow = _receiveShadow;

              // setting roof visiblity by cameraViewType
              if (
                (cameraViewType === CAMERA_VIEW_TYPE.INNER_1 ||
                  cameraViewType === CAMERA_VIEW_TYPE.INNER_2) &&
                _obj.name.toLowerCase().includes("roof")
              ) {
                _obj.visible = false;
              }

              // optimization
              if (child.geometry) {
                let _geometry = child.geometry.clone();
                _geometry = BufferGeometryUtils.mergeVertices(_geometry);
                child.geometry = _geometry;
              }

              child.frustumCulled = false;
              child.updateMatrixWorld();
            });

            // later, apply the deck seperatly
            if (
              _obj.name.toLowerCase().includes("floor") ||
              _obj.name.toLowerCase().includes("shade")
            ) {
              deckObjList = [...deckObjList, _obj];
            }

            // later, will remove lighting and camera in the data
            if (_obj.isLighting || _obj.isCamera) {
              removeObjectList = [...removeObjectList, _obj];
            }
          });
        }

        // remove the deck & lighting, camera
        [...deckObjList, ...removeObjectList].map((_obj) => {
          object.remove(_obj);
        });

        // do the scale
        object.scale.x = SCALE;
        object.scale.y = SCALE;
        object.scale.z = SCALE;
        object.receiveShadow = true;
        object.castShadow = true;

        // calculate center which doesn't include the deck
        const _localCenter = new THREE.Vector3();
        const _localSphere = new THREE.Sphere();
        const box3 = new THREE.Box3().setFromObject(object);
        box3.getCenter(_localCenter);
        box3.getBoundingSphere(_localSphere);
        const _localRadius = 1.2 * Math.ceil(_localSphere.radius);
        setLocalCenter(_localCenter);

        // setup the possible range of the camera movement (1x ~ 3x)
        cameraControls.minDistance = _localRadius;
        cameraControls.maxDistance = _localRadius * 3;

        // camera lookat center of obj
        cameraControls.target.set(
          _localCenter.x,
          _localCenter.y,
          _localCenter.z
        );
        const _cameraPosition = new THREE.Vector3(0, 2, 15)
          .normalize()
          .multiplyScalar(_localRadius)
          .add(_localCenter);

        // place the camera farthest place as possible, since we don't want to zoom out from the start position.
        camera.position.set(
          4 * _cameraPosition.x,
          4 * _cameraPosition.y,
          4 * _cameraPosition.z
        );
        camera.lookAt(_localCenter);

        setLoadPercent(80);

        // include the deck
        deckObjList.map((_obj) => {
          object.add(_obj);
        });

        // add the object to the scene
        scene.add(object);

        setTimeout(() => {
          setLoadPercent(100);
          setTimeout(() => {
            setIsModelLoading(false);
          }, [500]);
        }, [500]);
      },
      function (xhr) {
        // console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      function (e) {
        console.log("error", e);
        setLoadPercent(100);
        setIsModelLoading(false);
      }
    );
  };

  const changeModel = (modelPath) => {
    let _isSameFile = false;
    try {
      const newFileName = modelPath.split("/")[modelPath.split("/").length - 1];
      const currentFileName =
        currentModelPath.split("/")[currentModelPath.split("/").length - 1];
      _isSameFile = newFileName === currentFileName;
    } catch (e) {
      _isSameFile = false;
    }
    if (_isSameFile) return;
    setCurrentModelPath(modelPath);
  };

  const changeMeshVisibilityByName = (_name, _visible) => {
    if (!isEditorLoaded || !_name) return;
    const _model = scene.getObjectByName(_name);
    if (!_model) return;
    const visibility = !!_visible;
    if (_model.visible === visibility) return;
    console.log("change visibility", _name, _visible);
    _model.visible = visibility;
  };

  const changeRoofVisibility = (_visible) => {
    if (!isEditorLoaded) return;
    const _wavyModel = scene.getObjectByName(WAVY_MODEL);
    if (!_wavyModel) return;
    _wavyModel.traverse((_model) => {
      if (_model.name.toLowerCase().includes("roof")) {
        if (_model.visible !== _visible) {
          _model.visible = _visible;
        }
      }
    });
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

  const setCameraInnerView = () => {
    // set roof as invisible
    changeRoofVisibility(false);

    // calcaulate the camera's position
    const _cameraPosition = new THREE.Vector3(0, 1, 0)
      .normalize()
      .multiplyScalar(100)
      .add(localCenter);

    // place the camera
    camera.position.set(
      _cameraPosition.x,
      _cameraPosition.y,
      _cameraPosition.z
    );

    // set max angle for cameracontrol
    cameraControls.maxPolarAngle = Math.PI / 6;
  };

  const setCameraOuterView = () => {
    // set roof as visible
    changeRoofVisibility(true);

    // calcaulate the camera's initial position
    const _cameraPosition = new THREE.Vector3(0, 3, 15)
      .normalize()
      .multiplyScalar(100)
      .add(localCenter);

    // place the camera
    camera.position.set(
      _cameraPosition.x,
      _cameraPosition.y,
      _cameraPosition.z
    );

    // set max angle for cameracontrol
    cameraControls.maxPolarAngle = Math.PI / 2;
  };

  const handleOptionVisibility = () => {
    console.log("optionData", optionData);
    // read option changes
    if (!optionData.modelFloorOptions.length) return;
    const selectedFloor = optionData.modelFloorOptions.find(
      (_floorOption) => _floorOption.isSelected
    );
    if (!selectedFloor) return;

    const _modelSecondOptions = selectedFloor.modelSecondOptions;
    _modelSecondOptions.map((_option) => {
      const { optionDetails } = _option;
      if (!optionDetails.length) return;
      optionDetails.map((_optionDetail) => {
        changeMeshVisibilityByName(
          _optionDetail.meshName,
          _optionDetail.isSelected
        );
      });
    });

    const _modelKitchenTypes = selectedFloor.ModelKitchenTypes;
    _modelKitchenTypes.map((_kitchen) => {
      changeMeshVisibilityByName(_kitchen.meshName, _kitchen.isSelected);
      const { options } = _kitchen;
      if (!options.length) return;
      options.map((_option) => {
        const { optionDetails } = _option;
        if (!optionDetails || !optionDetails.length) return;
        optionDetails.map((_kitchenOptionDetail) => {
          changeMeshVisibilityByName(
            _kitchenOptionDetail.meshName,
            _kitchenOptionDetail.isSelected
          );
        });
      });
    });
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
        deleteMeshByMesh,
        loadFile,
        changeModel,
        deleteCurrentModel,
        changeMeshVisibilityByName,
        loadPercent,
        isModelLoading,
        setLoadPercent,
        changeModelColorFromHex,
        cameraViewType,
        setCameraViewType,
      }}
    >
      {children}
    </ThreeContext.Provider>
  );
};
