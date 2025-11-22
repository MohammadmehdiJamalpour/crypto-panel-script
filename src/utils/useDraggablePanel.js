import { useEffect, useRef, useState } from "react";

/**
 * Hook to make a panel draggable within the viewport.
 * Returns { offset, startDrag } where startDrag is meant for onPointerDown.
 */
export default function useDraggablePanel(targetRef) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragStateRef = useRef(null);

  useEffect(() => {
    if (!dragging) return;

    const handleMove = (e) => {
      if (!dragStateRef.current) return;
      const { startX, startY, startOffset, rect } = dragStateRef.current;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      const maxLeft = Math.max(0, window.innerWidth - rect.width);
      const maxTop = Math.max(0, window.innerHeight - rect.height);

      const targetLeft = Math.min(Math.max(0, rect.left + dx), maxLeft);
      const targetTop = Math.min(Math.max(0, rect.top + dy), maxTop);

      setOffset({
        x: startOffset.x + (targetLeft - rect.left),
        y: startOffset.y + (targetTop - rect.top),
      });
    };

    const endDrag = () => {
      setDragging(false);
      dragStateRef.current = null;
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", endDrag);
    window.addEventListener("pointercancel", endDrag);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", endDrag);
      window.removeEventListener("pointercancel", endDrag);
    };
  }, [dragging]);

  const startDrag = (e) => {
    if (e.button !== 0) return; // left click only
    const target = targetRef.current;
    if (!target) return;
    const rect = target.getBoundingClientRect();
    dragStateRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startOffset: offset,
      rect,
    };
    setDragging(true);
    e.preventDefault();
  };

  return { offset, startDrag, dragging };
}
