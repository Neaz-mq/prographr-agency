import { useEffect, useRef } from "react";

export default function CustomScrollbar() {
  const thumbRef = useRef(null);
  const trackRef = useRef(null);
  const isDragging = useRef(false);
  const dragStartY = useRef(0);
  const dragStartScroll = useRef(0);

  useEffect(() => {
    const thumb = thumbRef.current;
    const track = trackRef.current;
    if (!thumb || !track) return;

    const updateThumb = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY;
      const scrollHeight = doc.scrollHeight - doc.clientHeight;
      const trackHeight = track.clientHeight;

      const thumbHeight = Math.max(
        (doc.clientHeight / doc.scrollHeight) * trackHeight,
        40
      );
      const thumbTop =
        scrollHeight > 0
          ? (scrollTop / scrollHeight) * (trackHeight - thumbHeight)
          : 0;

      thumb.style.height = `${thumbHeight}px`;
      thumb.style.transform = `translateY(${thumbTop}px)`;
    };

    // Mouse drag on thumb
    const onMouseDown = (e) => {
      isDragging.current = true;
      dragStartY.current = e.clientY;
      dragStartScroll.current = window.scrollY;
      document.body.style.userSelect = "none";
      e.preventDefault();
    };

    const onMouseMove = (e) => {
      if (!isDragging.current) return;
      const doc = document.documentElement;
      const trackHeight = track.clientHeight;
      const thumbHeight = thumb.clientHeight;
      const scrollHeight = doc.scrollHeight - doc.clientHeight;

      const delta = e.clientY - dragStartY.current;
      const scrollDelta = (delta / (trackHeight - thumbHeight)) * scrollHeight;
      window.scrollTo(0, dragStartScroll.current + scrollDelta);
    };

    const onMouseUp = () => {
      isDragging.current = false;
      document.body.style.userSelect = "";
    };

    // Click on track to jump
    const onTrackClick = (e) => {
      if (e.target === thumb) return;
      const doc = document.documentElement;
      const rect = track.getBoundingClientRect();
      const clickY = e.clientY - rect.top;
      const thumbHeight = thumb.clientHeight;
      const trackHeight = track.clientHeight;
      const scrollHeight = doc.scrollHeight - doc.clientHeight;
      const scrollTo =
        ((clickY - thumbHeight / 2) / (trackHeight - thumbHeight)) * scrollHeight;
      window.scrollTo({ top: scrollTo, behavior: "smooth" });
    };

    window.addEventListener("scroll", updateThumb, { passive: true });
    window.addEventListener("resize", updateThumb);
    thumb.addEventListener("mousedown", onMouseDown);
    track.addEventListener("click", onTrackClick);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    updateThumb();

    return () => {
      window.removeEventListener("scroll", updateThumb);
      window.removeEventListener("resize", updateThumb);
      thumb.removeEventListener("mousedown", onMouseDown);
      track.removeEventListener("click", onTrackClick);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  return (
    <div
      ref={trackRef}
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        width: "8px",
        height: "100vh",
        zIndex: 9999,
        padding: "2px",
      }}
    >
      <div
        ref={thumbRef}
        style={{
          width: "4px",
          marginLeft: "auto",
          marginRight: "auto",
          borderRadius: "999px",
          background: "rgba(150, 150, 150, 0.4)",
          cursor: "pointer",
          transition: "background 0.2s",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.background = "rgba(180, 180, 180, 0.7)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.background = "rgba(150, 150, 150, 0.4)")
        }
      />
    </div>
  );
}