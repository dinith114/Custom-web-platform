// uiStore — Zustand store for panel states, modals, UI preferences
import { create } from "zustand";

interface UIState {
  isSidebarOpen: boolean;
  isPaletteOpen: boolean;
  isPropertiesOpen: boolean;
  activeModal: string | null;
  toggleSidebar: () => void;
  togglePalette: () => void;
  toggleProperties: () => void;
  openModal: (modal: string) => void;
  closeModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isSidebarOpen: true,
  isPaletteOpen: true,
  isPropertiesOpen: true,
  activeModal: null,
  toggleSidebar: () => set((s) => ({ isSidebarOpen: !s.isSidebarOpen })),
  togglePalette: () => set((s) => ({ isPaletteOpen: !s.isPaletteOpen })),
  toggleProperties: () => set((s) => ({ isPropertiesOpen: !s.isPropertiesOpen })),
  openModal: (modal) => set({ activeModal: modal }),
  closeModal: () => set({ activeModal: null }),
}));
