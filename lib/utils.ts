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
