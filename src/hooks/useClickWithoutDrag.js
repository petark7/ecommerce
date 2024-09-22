import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

export function useClickWithoutDrag(threshold = 5) {
  const router = useRouter();
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  const handleMouseDown = useCallback((e) => {
    setStartPos({ x: e.clientX, y: e.clientY });
  }, []);

  const handleMouseUp = useCallback(
    (e, route) => {
      const endPos = { x: e.clientX, y: e.clientY };
      if (
        Math.abs(endPos.x - startPos.x) < threshold &&
        Math.abs(endPos.y - startPos.y) < threshold
      ) {
        if (route) {
          router.push(route);
        }
      }
    },
    [router, startPos, threshold]
  );

  return { handleMouseDown, handleMouseUp };
}
