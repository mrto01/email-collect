import { create } from "zustand";
import { produce } from "immer";

export const useStore = create((set, get) => ({
  storeSettings:  {
    enable_popup_template: false,

  },
}));

export const useStoreSettings = () => useStore( state => state.storeSettings);

export const setStoreSetting = ( key, value) => {
  useStore.setState(produce((state) => {
    if (typeof state.storeSettings === "undefined") {
      state.storeSettings = {};
    }
    state.storeSettings[key] = value;
  }));
};


const modalEditingStore = create((set, get) => ({
  open: false,
  src: null,
  title: '',
}));

export const setEditModalOpen = (value) => {
  modalEditingStore.setState(produce((state) => {
    state.open = value;
  }))
}

export const setEditModalSrc = (value) => {
  modalEditingStore.setState(produce((state) => {
    state.src = value;
  }))
}

export const setEditModalTitle = (value) => {
  modalEditingStore.setState(produce((state) => {
    state.title = value;
  }))
}

export const useEditEmailModal = () => modalEditingStore(s => s)
