import { useState, useEffect, useRef } from 'react';

export function useZoomPan(canvasRef, width, height) {
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const dragging = useRef(false);
  const last = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const onMouseDown = (e) => {
      if (e.button !== 0) return;
      dragging.current = true;
      last.current = { x: e.clientX, y: e.clientY };
    };
    const onMouseMove = (e) => {
      if (!dragging.current) return;
      setOffset(prev => ({
        x: prev.x + (e.clientX - last.current.x),
        y: prev.y + (e.clientY - last.current.y)
      }));
      last.current = { x: e.clientX, y: e.clientY };
    };
    const onMouseUp = () => { dragging.current = false; };
    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      canvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [canvasRef]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const onWheel = (e) => {
      e.preventDefault();
      const delta = e.deltaY < 0 ? 1.1 : 0.9;
      setZoom(z => Math.max(0.3, Math.min(2.5, z * delta)));
    };
    canvas.addEventListener('wheel', onWheel, { passive: false });
    return () => canvas.removeEventListener('wheel', onWheel);
  }, [canvasRef]);

  const reset = () => {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };

  return { zoom, setZoom, offset, setOffset, reset };
} 