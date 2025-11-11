"use client";

import { useEffect, useState } from "react";

type PointerState = {
  isCoarse: boolean;
  hasTouch: boolean;
};

const initialState: PointerState = {
  isCoarse: false,
  hasTouch: false,
};

export function usePointerType(): PointerState {
  const [state, setState] = useState<PointerState>(initialState);

  useEffect(() => {
    const compute = (): PointerState => {
      type LegacyNavigator = Navigator & { msMaxTouchPoints?: number };
      const nav = navigator as LegacyNavigator;
      const coarse =
        window.matchMedia?.("(pointer: coarse)")?.matches ?? false;
      const touch =
        "ontouchstart" in window ||
        (nav.maxTouchPoints ?? 0) > 0 ||
        (nav.msMaxTouchPoints ?? 0) > 0;
      return { isCoarse: coarse, hasTouch: touch };
    };

    const update = () => setState(compute());
    update();

    const mq = window.matchMedia?.("(pointer: coarse)");
    mq?.addEventListener?.("change", update);
    window.addEventListener("touchstart", update, { passive: true });
    window.addEventListener("pointerdown", update, { passive: true });

    return () => {
      mq?.removeEventListener?.("change", update);
      window.removeEventListener("touchstart", update);
      window.removeEventListener("pointerdown", update);
    };
  }, []);

  return state;
}
