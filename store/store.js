// store.js
import {create} from 'zustand';

const useStore = create((set) => ({
  newTweetAdded: false,
  setNewTweetAdded: (status) => set({ newTweetAdded: status }),
}));

export { useStore };
