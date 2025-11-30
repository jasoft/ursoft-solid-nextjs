"use client";
import React, { useEffect, useRef } from "react";

export default function NewsletterEmbed({ uid, src, className = "" }: { uid: string; src: string; className?: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.innerHTML = "";
    const script = document.createElement("script");
    script.async = true;
    script.src = src;
    script.setAttribute("data-uid", uid);
    containerRef.current.appendChild(script);
  }, [uid, src]);

  return <div ref={containerRef} className={`seva-container ${className}`} />;
}
