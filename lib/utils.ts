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
  MAX_A: "WAVYROOM_MAX-A.fbx",
  MAX_PLUS: "WAVYROOM_MAX+.fbx",
  MINI: "WAVYROOM_MINI.fbx",
  NOVA: "WAVYROOM_NOVA.fbx",
  STUDIO: "WAVYROOM_STUDIO.fbx",
  STUDIO_PLUS: "WAVYROOM_STUDIO+.fbx",
  EVO: "WROOM_EVO.fbx",
};

export const hexToRgb = (hexType: string) => {
  const hex = hexType.trim().replace("#", "");
  if (!hexType || !hex) return;
  if (hex.length !== 6) return;
  const rgb = { r: 0, g: 0, b: 0 };
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  rgb.r = r;
  rgb.g = g;
  rgb.b = b;

  return rgb;
};
