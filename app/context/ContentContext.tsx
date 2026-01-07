"use client";

import React, { createContext, useContext } from "react";
import { headerContent, headerMenu } from "@/app/content";

const ContentContext = createContext({
  headerContent,
  headerMenu
});

export const ContentProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ContentContext.Provider value={{ headerContent, headerMenu }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => useContext(ContentContext);
