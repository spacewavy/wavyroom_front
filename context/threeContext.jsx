"use client";

import { CAMERA_VIEW_TYPE, FILE_EXTENSION, hexToRgb } from "@/lib/utils";
import React, { createContext, useContext, useEffect, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";

import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { USDZLoader } from "three/examples/jsm/loaders/USDZLoader";
import { PLYLoader } from "three/examples/jsm/loaders/PLYLoader.js";
import { Rhino3dmLoader } from "three/addons/loaders/3DMLoader.js";

import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import * as BufferGeometryUtils from "three/addons/utils/BufferGeometryUtils.js";
import {
  acceleratedRaycast,
  computeBoundsTree,
  disposeBoundsTree,
} from "three-mesh-bvh";
import { useDispatch, useSelector } from "react-redux";
import { fetchModelData } from "../app/redux/actions/modelActions";
import axiosInstance from "../api/axioInstance";
import { customizationOptionChangeByMeshName } from "../app/redux/actions/customizationActions";
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
  const [roofMeshs, setRoofMeshs] = useState([]);
  const [hasSecondFloor, setHasSecondFloor] = useState(false);

  const dispatch = useDispatch();

  const { data: optionData } = useSelector((state) => state.customization);
  const { data: modelsData } = useSelector((state) => state.model);

  // initialize
  useEffect(() => {
    dispatch(fetchModelData());

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
    _scene.add(_ambientLight);
    _scene.add(_hemisphereLight);

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
    if (!modelsData.length) return;
    loadFile(currentModelPath);
  }, [isEditorLoaded, currentModelPath, modelsData]);

  // change camera view type
  useEffect(() => {
    if (!isEditorLoaded) return;
    onChangeCameraViewType();
  }, [isEditorLoaded, cameraViewType]);

  // change the mesh visibility from optionData
  useEffect(() => {
    handleOptionVisibility();
    handleModelColor();
    handleHasSecondFloor();
    console.log("optiondata", optionData);
  }, [optionData]);

  const getCurrentModelId = () => {
    if (!isEditorLoaded || !currentModelPath) return;

    const currentFileName =
      currentModelPath.split("/")[currentModelPath.split("/").length - 1];

    if (currentFileName.toLowerCase().includes("mini")) {
      return modelsData.find((_model) => _model.name === "Mini").id;
    } else if (currentFileName.toLowerCase().includes("studio")) {
      return modelsData.find((_model) => _model.name === "Studio").id;
    } else if (currentFileName.toLowerCase().includes("max")) {
      return modelsData.find((_model) => _model.name === "Max").id;
    } else if (currentFileName.toLowerCase().includes("evo")) {
      return modelsData.find((_model) => _model.name === "Evo").id;
    } else if (currentFileName.toLowerCase().includes("nova")) {
      return modelsData.find((_model) => _model.name === "Nova").id;
    }
  };

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

  const loadFile = async (url) => {
    let loader;
    if (!url || isModelLoading) return;

    const extension = url.split(".")[url.split(".").length - 1];
    if (!extension) {
      return;
    }
    setIsModelLoading(true);
    setLoadPercent(0);
    setRoofMeshs([]);

    const modelId = getCurrentModelId();

    let _modelOptionData;
    let _hideMeshNames = [];
    let _showMeshNames = [];
    try {
      // todo: default option은 끄면 안됨
      const response = await axiosInstance.get(
        `/model/${modelId}/custom-selections`,
        {
          headers: {
            language: "ko",
          },
        }
      );
      _modelOptionData = response.data.data;
      // model color part visibility
      _modelOptionData.modelColors.map((_modelColor) => {
        if (_modelColor.isDefault) {
          _modelColor?.meshNames.map((_meshName) => {
            _showMeshNames.push(_meshName);
          });
        } else {
          _modelColor?.meshNames.map((_meshName) => {
            _hideMeshNames.push(_meshName);
          });
        }
      });

      _modelOptionData.modelFloorOptions.map((_floor) => {
        // check normal options
        _floor.modelSecondOptions.map((_option) => {
          _option.optionDetails.map((_optionDetail) => {
            if (!_optionDetail.meshName || _optionDetail.meshName === "-")
              return;
            if (_optionDetail.isDefault) {
              _showMeshNames.push(_optionDetail.meshName);
            } else {
              _hideMeshNames.push(_optionDetail.meshName);
            }
          });
        });

        // check kitchen options and detail options
        _floor.ModelKitchenTypes.map((_kitchenType) => {
          if (!_kitchenType.meshName || _kitchenType.meshName === "-") return;
          _kitchenType.isDefault
            ? _showMeshNames.push(_kitchenType.meshName)
            : _hideMeshNames.push(_kitchenType.meshName);
          _kitchenType.options.map((_kitchenTypeOption) => {
            _kitchenTypeOption.optionDetails.map((_optionDetail) => {
              if (!_optionDetail.meshName || _optionDetail.meshName === "-")
                return;
              if (_kitchenType.isDefault && _optionDetail.isDefault) {
                _showMeshNames.push(_optionDetail.meshName);
              } else {
                _hideMeshNames.push(_optionDetail.meshName);
              }
            });
          });
        });
      });
    } catch (e) {
      console.log("e", e);
    }

    console.log(_hideMeshNames, _showMeshNames);

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
      case FILE_EXTENSION.RHINO:
        loader = new Rhino3dmLoader();
        loader.setLibraryPath("https://unpkg.com/rhino3dm@8.0.1/");
        break;
      default:
        loader = new FBXLoader();
        break;
    }

    setLoadPercent(30);

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

        // setup visibility for initial stage
        object.traverse((child) => {
          _hideMeshNames.map((_meshName) => {
            if (child.name === _meshName) {
              child.visible = false;
            }
          });
        });
        // setup visibility for initial stage
        object.traverse((child) => {
          _showMeshNames.map((_meshName) => {
            if (child.name === _meshName) {
              child.visible = true;
            }
          });
        });

        // add the object to the scene
        scene.add(object);

        // setting roof visiblity by cameraViewType
        onChangeCameraViewType();

        setLoadPercent(100);
        setTimeout(() => {
          setIsModelLoading(false);
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
    console.log("visibility changed", _model.name, visibility);
    _model.visible = visibility;
  };

  const changeRoofVisibility = async (_visible) => {
    if (!isEditorLoaded) return;
    const _wavyModel = scene.getObjectByName(WAVY_MODEL);
    if (!_wavyModel) return;
    if (_visible) {
      if (!roofMeshs.length) return;
      roofMeshs.map((_roof) => {
        changeMeshVisibilityByName(_roof.name, true);
      });
    } else {
      // turn off
      let _arr = [];
      _wavyModel.traverse((_model) => {
        if (
          _model.name.toLowerCase().includes("roof") ||
          _model.name.toLowerCase().includes("nova-rf") ||
          _model.name.toLowerCase().includes("mid")
        ) {
          if (_model.visible !== _visible) {
            _model.visible = _visible;
            _arr.push(_model);
          }
        }
      });
      setRoofMeshs([..._arr]);
    }
  };

  const onChangeCameraViewType = async () => {
    if (!isEditorLoaded) return;
    const _wavyModel = scene.getObjectByName(WAVY_MODEL);
    if (!_wavyModel) return;
    switch (cameraViewType) {
      case CAMERA_VIEW_TYPE.OUTER: {
        if (!roofMeshs.length) return;
        roofMeshs.map((_roof) => {
          changeMeshVisibilityByName(_roof.name, true);
        });
        // calcaulate the camera's initial position
        const _cameraPosition = new THREE.Vector3(0, 3, 15)
          .normalize()
          .multiplyScalar(100)
          .add(localCenter);

        // place the camera
        gsap.to(camera.position, {
          x: _cameraPosition.x,
          y: _cameraPosition.y,
          z: _cameraPosition.z,
          duration: 0.5,
        });

        setRoofMeshs([]);
        // set max angle for cameracontrol
        cameraControls.maxPolarAngle = Math.PI / 2;
        break;
      }
      case CAMERA_VIEW_TYPE.INNER_1: {
        // 뚜껑 하나만 까고
        let _arr = [];
        _wavyModel.traverse((_model) => {
          if (
            (_model.name.toLowerCase().includes("roof") ||
              _model.name.toLowerCase().includes("nova-rf")) &&
            !_model.name.toLowerCase().includes("group")
          ) {
            if (_model.visible !== false) {
              _model.visible = false;
              _arr.push(_model);
            }
          }
          if (
            _model.name.toLowerCase().includes("mid") &&
            !_model.name.toLowerCase().includes("group")
          ) {
            console.log("");
            if (_model.visible !== true) {
              if (
                _model.name ===
                optionData.modelColors.find(
                  (_modelColor) => _modelColor.isSelected
                ).meshNanme
              ) {
                _model.visible = true;
              }
              // _arr.push(_model);
            }
          }
        });
        setRoofMeshs([...roofMeshs, ..._arr]);
        // calcaulate the camera's position
        const _cameraPosition = new THREE.Vector3(0, 1, 0.1)
          .normalize()
          .multiplyScalar(100)
          .add(localCenter);

        // place the camera
        if (_cameraPosition.angleTo(camera.position) > 0.01) {
          gsap.to(camera.position, {
            x: _cameraPosition.x,
            y: _cameraPosition.y,
            z: _cameraPosition.z,
            duration: 0.5,
          });
        }

        // set max angle for cameracontrol
        cameraControls.maxPolarAngle = Math.PI / 6;
        break;
      }
      case CAMERA_VIEW_TYPE.INNER_2: {
        let _arr = [];
        _wavyModel.traverse((_model) => {
          if (
            (_model.name.toLowerCase().includes("roof") ||
              _model.name.toLowerCase().includes("nova-rf") ||
              _model.name.toLowerCase().includes("mid")) &&
            !_model.name.toLowerCase().includes("group")
          ) {
            if (_model.visible !== false) {
              _model.visible = false;
              _arr.push(_model);
            }
          }
        });
        _arr.map((_item) => console.log(_item.name));
        setRoofMeshs([...roofMeshs, ..._arr]);
        // calcaulate the camera's position
        const _cameraPosition = new THREE.Vector3(0, 1, 0.1)
          .normalize()
          .multiplyScalar(100)
          .add(localCenter);

        // place the camera
        if (_cameraPosition.angleTo(camera.position) > 0.01) {
          gsap.to(camera.position, {
            x: _cameraPosition.x,
            y: _cameraPosition.y,
            z: _cameraPosition.z,
            duration: 0.5,
          });
        }

        // set max angle for cameracontrol
        cameraControls.maxPolarAngle = Math.PI / 6;
        break;
      }

      default:
        break;
    }
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

  const handleModelColor = () => {
    if (!optionData.modelColors.length) return;
    const isSelected = optionData.modelColors.find(
      (_modelColor) => _modelColor.isSelected
    );
    optionData.modelColors.map((_modelColor) => {
      if (!_modelColor?.meshNames) return;
      _modelColor?.meshNames.map((_meshName) => {
        changeMeshVisibilityByName(
          _meshName,
          isSelected ? _modelColor.isSelected : _modelColor.isDefault
        );
      });
    });
  };

  const handleOptionVisibility = () => {
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
      const _isItemSelected = optionDetails.find(
        (_optionDetail) => _optionDetail.isSelected
      );
      optionDetails.map((_optionDetail) => {
        changeMeshVisibilityByName(
          _optionDetail.meshName,
          _isItemSelected ? _optionDetail.isSelected : _optionDetail.isDefault
        );
        if (_optionDetail.isSelected) {
          _optionDetail.blockMeshNames.map((_blockMeshName) => {
            dispatch(
              customizationOptionChangeByMeshName(_blockMeshName, false)
            );
          });
        }
      });
    });

    const _modelKitchenTypes = selectedFloor.ModelKitchenTypes;
    const _isKitchenSelected = _modelKitchenTypes.find(
      (_option) => _option.isSelected
    );
    _modelKitchenTypes.map((_kitchen) => {
      changeMeshVisibilityByName(
        _kitchen.meshName,
        _isKitchenSelected ? _kitchen.isSelected : _kitchen.isDefault
      );
      if (_kitchen.isSelected) {
        _kitchen.blockMeshNames.map((_blockMeshName) => {
          dispatch(customizationOptionChangeByMeshName(_blockMeshName, false));
        });
      }
      const { options } = _kitchen;
      if (!options.length) return;
      options.map((_option) => {
        const { optionDetails } = _option;
        const _isKitchenOptionDetailSelected = optionDetails.find(
          (_optionDetail) => _optionDetail.isSelected
        );
        if (!optionDetails || !optionDetails.length) return;
        optionDetails.map((_kitchenOptionDetail) => {
          changeMeshVisibilityByName(
            _kitchenOptionDetail.meshName,
            _kitchen.isSelected
              ? _isKitchenOptionDetailSelected
                ? _kitchenOptionDetail.isSelected
                : _kitchenOptionDetail.isDefault
              : false
          );
        });
      });
    });
  };

  const handleHasSecondFloor = () => {
    if (!optionData.modelFloorOptions.length) return;
    setHasSecondFloor(
      !!optionData.modelFloorOptions.find(
        (_floorOption) =>
          _floorOption.isSelected &&
          ["double", "복층"].includes(_floorOption.name)
      )
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
        hasSecondFloor,
      }}
    >
      {children}
    </ThreeContext.Provider>
  );
};
