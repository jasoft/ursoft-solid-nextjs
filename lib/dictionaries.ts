import "server-only";

const dictionaries = {
  en: () => import("@/app/content"),
  zh: () => import("@/app/content.zh"),
  // fr: () => import("@/app/content.fr"), // Future support
};

export const getDictionary = async (locale: string) => {
  const dictionary = dictionaries[locale as keyof typeof dictionaries] ?? dictionaries.en;
  const module = await dictionary();
  return { ...module };
};