"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { needsOrientationPermission } from "@/utils/orientation";

type PermissionState = "prompt" | "granted" | "denied" | "unsupported";

interface OrientationState {
  beta: number | null;
  gamma: number | null;
  permission: PermissionState;
}

export function useDeviceOrientation() {
  const [state, setState] = useState<OrientationState>({
    beta: null,
    gamma: null,
    permission: "prompt",
  });
  const rafRef = useRef<number>(0);
  const latestRef = useRef<{ beta: number | null; gamma: number | null }>({ beta: null, gamma: null });

  const handleOrientation = useCallback((e: DeviceOrientationEvent) => {
    latestRef.current = { beta: e.beta, gamma: e.gamma };
  }, []);

  // Throttled state updates at ~10fps to avoid excessive re-renders
  useEffect(() => {
    if (state.permission !== "granted") return;

    const tick = () => {
      const { beta, gamma } = latestRef.current;
      setState((prev) => {
        if (prev.beta === beta && prev.gamma === gamma) return prev;
        return { ...prev, beta, gamma };
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [state.permission]);

  // Start listening once granted
  useEffect(() => {
    if (state.permission !== "granted") return;
    window.addEventListener("deviceorientation", handleOrientation);
    return () => window.removeEventListener("deviceorientation", handleOrientation);
  }, [state.permission, handleOrientation]);

  // Check support on mount
  useEffect(() => {
    if (!("DeviceOrientationEvent" in window)) {
      setState((s) => ({ ...s, permission: "unsupported" }));
    } else if (!needsOrientationPermission()) {
      // Chrome Android — permission is implicit
      setState((s) => ({ ...s, permission: "granted" }));
    }
  }, []);

  // Must be called from a user gesture (click handler) for Safari
  const requestPermission = useCallback(async () => {
    if (!needsOrientationPermission()) {
      setState((s) => ({ ...s, permission: "granted" }));
      return;
    }
    try {
      const DOE = DeviceOrientationEvent as unknown as { requestPermission: () => Promise<string> };
      const result = await DOE.requestPermission();
      setState((s) => ({ ...s, permission: result === "granted" ? "granted" : "denied" }));
    } catch {
      setState((s) => ({ ...s, permission: "denied" }));
    }
  }, []);

  return { ...state, requestPermission };
}
