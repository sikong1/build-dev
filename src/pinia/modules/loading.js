import { defineStore } from "pinia";

const useMapStore = defineStore({
  id: "loading",
  state: () => ({
    loadingAll: false,
  }),
  actions: {
    setLoadingAll(loadingAll) {
      this.loadingAll = loadingAll;
    },
  }
});

export default useMapStore;
