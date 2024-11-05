/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  addChannelModal: { isOpen: false },
  removeChannelModal: { isOpen: false, channelId: null },
  renameChannelModal: { isOpen: false, channelId: null, name: '' },
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openAddChannelModal(state) {
      state.addChannelModal.isOpen = true;
    },
    closeAddChannelModal(state) {
      state.addChannelModal.isOpen = false;
    },
    openRemoveChannelModal(state, action) {
      state.removeChannelModal.isOpen = true;
      state.removeChannelModal.channelId = action.payload;
    },
    closeRemoveChannelModal(state) {
      state.removeChannelModal.isOpen = false;
      state.removeChannelModal.channelId = null;
    },
    openRenameChannelModal(state, action) {
      const { id, name } = action.payload;
      state.renameChannelModal.isOpen = true;
      state.renameChannelModal.channelId = id;
      state.renameChannelModal.name = name;
    },
    closeRenameChannelModal(state) {
      state.renameChannelModal.isOpen = false;
      state.renameChannelModal.channelId = null;
      state.renameChannelModal.name = '';
    },
  },
});

export const {
  openAddChannelModal,
  closeAddChannelModal,
  openRemoveChannelModal,
  closeRemoveChannelModal,
  openRenameChannelModal,
  closeRenameChannelModal,
} = modalsSlice.actions;

export default modalsSlice.reducer;
