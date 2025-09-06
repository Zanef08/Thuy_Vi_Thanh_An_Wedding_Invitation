import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isModalOpen: false,
  modalType: null,
  selectedItem: null,
  countdown: {
    days: 246,
    hours: 12,
    minutes: 5,
    seconds: 34,
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isModalOpen = true;
      state.modalType = action.payload.type;
      state.selectedItem = action.payload.item || null;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.modalType = null;
      state.selectedItem = null;
    },
    updateCountdown: (state, action) => {
      state.countdown = action.payload;
    },
  },
});

export const { openModal, closeModal, updateCountdown } = uiSlice.actions;
export default uiSlice.reducer;
