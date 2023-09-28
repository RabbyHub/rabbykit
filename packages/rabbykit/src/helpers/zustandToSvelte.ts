import { readable } from "svelte/store";
import { StoreApi } from "zustand";

export default function zustandToSvelte<T>(zustandStore: StoreApi<T>) {
  const svelteStore = readable(zustandStore.getState(), (set) => {
    return zustandStore.subscribe((value) => set(value));
  });

  return {
    ...svelteStore,
    subscribe: svelteStore.subscribe,
  };
}
