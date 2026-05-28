// builderStore — Zustand store with sections, selection, undo/redo, device mode
import { create } from "zustand";
import type { Section } from "@builder/types";

type DeviceMode = "desktop" | "tablet" | "mobile";

export interface BuilderState {
  sections: Section[];
  selectedComponentId: string | null;
  historyStack: Section[][];
  historyIndex: number;
  deviceMode: DeviceMode;
  canUndo: boolean;
  canRedo: boolean;
  isDirty: boolean;
  setSections: (sections: Section[]) => void;
  selectComponent: (id: string | null) => void;
  addSection: (section: Section, index?: number) => void;
  removeSection: (id: string) => void;
  updateComponent: (sectionId: string, componentId: string, props: Record<string, unknown>) => void;
  updateComponentInSection: (sectionId: string, componentId: string, props: Record<string, unknown>) => void;
  setDeviceMode: (mode: DeviceMode) => void;
  undo: () => void;
  redo: () => void;
  pushHistory: () => void;
  markClean: () => void;
}

export const useBuilderStore = create<BuilderState>((set, get) => ({
  sections: [],
  selectedComponentId: null,
  historyStack: [[]],
  historyIndex: 0,
  deviceMode: "desktop",
  canUndo: false,
  canRedo: false,
  isDirty: false,

  setSections: (sections) => {
    set({ sections });
    get().pushHistory();
  },

  selectComponent: (id) => set({ selectedComponentId: id }),

  addSection: (section, index) => {
    const { sections } = get();
    const updated = [...sections];
    if (index !== undefined) updated.splice(index, 0, section);
    else updated.push(section);
    set({ sections: updated, isDirty: true });
    get().pushHistory();
  },

  removeSection: (id) => {
    const state = get();
    set({
      sections: state.sections.filter((s) => s.id !== id),
      isDirty: true,
      selectedComponentId: null,
    });
    get().pushHistory();
  },

  updateComponent: (sectionId, componentId, props) => {
    get().updateComponentInSection(sectionId, componentId, props);
  },

  updateComponentInSection: (sectionId, componentId, props) => {
    const sections = get().sections.map((s) => {
      if (s.id !== sectionId) return s;
      return {
        ...s,
        components: s.components.map((c) =>
          c.id === componentId ? { ...c, props: { ...c.props, ...props } } : c
        ),
      };
    });
    set({ sections, isDirty: true });
    // Debounce history push for rapid edits (typing)
  },

  setDeviceMode: (mode) => set({ deviceMode: mode }),

  pushHistory: () => {
    const { sections, historyStack, historyIndex } = get();
    const newStack = historyStack.slice(0, historyIndex + 1);
    newStack.push(JSON.parse(JSON.stringify(sections)));
    // Keep max 50 history entries
    if (newStack.length > 50) newStack.shift();
    set({
      historyStack: newStack,
      historyIndex: newStack.length - 1,
      canUndo: newStack.length > 1,
      canRedo: false,
    });
  },

  undo: () => {
    const { historyStack, historyIndex } = get();
    if (historyIndex <= 0) return;
    const newIndex = historyIndex - 1;
    set({
      sections: JSON.parse(JSON.stringify(historyStack[newIndex])),
      historyIndex: newIndex,
      canUndo: newIndex > 0,
      canRedo: true,
      isDirty: true,
    });
  },

  redo: () => {
    const { historyStack, historyIndex } = get();
    if (historyIndex >= historyStack.length - 1) return;
    const newIndex = historyIndex + 1;
    set({
      sections: JSON.parse(JSON.stringify(historyStack[newIndex])),
      historyIndex: newIndex,
      canUndo: true,
      canRedo: newIndex < historyStack.length - 1,
      isDirty: true,
    });
  },

  markClean: () => set({ isDirty: false }),
}));
