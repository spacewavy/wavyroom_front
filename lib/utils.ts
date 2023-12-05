import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const STATUS = {
  LOADING: "loading",
  AUTHENTICATED: "authenticated",
};

export const FILE_EXTENSION = {
  OBJ: "obj",
  FBX: "fbx",
  GLB: "glb",
  GLTF: "gltf",
  USD: "usd",
  USDZ: "usdz",
  JSON: "json",
  PLY: "ply",
};

export const OPERATING_SYSTEM = {
  WINDOW: "Window",
  MAC: "Mac",
  UNIX: "Unix",
  LINUX: "Linux",
};

export const WAVY_MODEL_PATHS = {
  MAX_RM: "WAVYROOM_MAX_RM.fbx",
  MAX_PLUS: "WAVYROOM_MAX+.fbx",
  MINI: "WAVYROOM_MINI.fbx",
  NOVA: "WAVYROOM_NOVA.fbx",
  STUDIO: "WAVYROOM_STUDIO.fbx",
  STUDIO_PLUS: "WAVYROOM_STUDIO+.fbx",
  EVO: "WROOM_EVO.fbx",
  MAX_A: "WROOM-MAX-A.fbx",
};
