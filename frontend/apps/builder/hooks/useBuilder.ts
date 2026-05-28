// useBuilder — builder state convenience hook wrapping builderStore
import { useBuilderStore } from "@/store/builderStore";

export function useBuilder() {
  return useBuilderStore();
}
