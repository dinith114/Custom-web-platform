// siteStore — Zustand store for currentSite, currentPage, pages list
import { create } from "zustand";
import type { Site, Page } from "@builder/types";

interface SiteState {
  currentSite: Site | null;
  currentPage: Page | null;
  pages: Page[];
  setCurrentSite: (site: Site | null) => void;
  setCurrentPage: (page: Page | null) => void;
  setPages: (pages: Page[]) => void;
}

export const useSiteStore = create<SiteState>((set) => ({
  currentSite: null,
  currentPage: null,
  pages: [],
  setCurrentSite: (site) => set({ currentSite: site }),
  setCurrentPage: (page) => set({ currentPage: page }),
  setPages: (pages) => set({ pages }),
}));
