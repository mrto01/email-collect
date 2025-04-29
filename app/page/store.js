import { create } from "zustand";
import { produce } from "immer";
import {createContext, useContext} from "react";
import {v7 as uuidv7} from "uuid";

export const useStore = create((set, get) => ({
  storeSettings:  {},
}));

export const useSettings = create( (set, get) => ({
  tabs: {}
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
