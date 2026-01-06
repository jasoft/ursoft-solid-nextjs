"use client";

import React, { createContext, useContext } from "react";
// 使用 content.ts 作为类型定义的基准
import * as ContentSource from "@/app/content";

type ContentType = typeof ContentSource;

const ContentContext = createContext<ContentType | null>(null);

export const ContentProvider = ({
  content,
  children,
}: {
  content: ContentType;
  children: React.ReactNode;
}) => {
  return (
    <ContentContext.Provider value={content}>{children}</ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error("useContent must be used within a ContentProvider");
  }
  return context;
};
