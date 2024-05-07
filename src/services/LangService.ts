import { Lang } from "@/types";

export const getLangFromStorage = () => {
  const result: string | null = localStorage.getItem('lang') ;
  return (result !== null) ? result as Lang : 'en' ;
}

export const setLangToStorage = (response: Lang) => {
  localStorage.setItem('lang', response);
}

export const removeLangFromStorage = () => {
  localStorage.removeItem('lang');
}