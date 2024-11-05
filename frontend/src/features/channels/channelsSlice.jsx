import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import paths from '../../serverRoutes';
import fetchStatus from '../../utils/fetchStatus';
import axios from 'axios';

const fetchChannels = createAsyncThunk('channels/fetchChannels', async () => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get(paths.channelsPath(), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (fetchChannelsError) {
    console.error('fetchChannelsError', fetchChannelsError);
  }
});

const addChannel = createAsyncThunk('channels/addChannel', async (newChannel) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(paths.channelsPath(), newChannel, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
});

const removeChannel = createAsyncThunk('channels/removeChannel', async (id) => {
  const token = localStorage.getItem('token');

  try {
    const response = await axios.delete(`${paths.channelsPath()}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (removeChannelError) {
    console.error('removeChannelError', removeChannelError);
  }
});

const renameChannel = createAsyncThunk('channels/renameChannel', async ({ id, name }) => {
  const token = localStorage.getItem('token');

  try {
    const response = await axios.patch(`${paths.channelsPath()}/${id}`, name, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (renameChannelError) {
    console.error('renameChannelError', renameChannelError);
  }
});

/* eslint-disable-next-line no-param-reassign */

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    byId: {},
    allIds: [],
    activeChannelId: '1',
    status: fetchStatus.Idle,
    error: null,
  },
  reducers: {
    setActiveChannel: (state, action) => {
      state.activeChannelId = action.payload;
    },
    handleAddChannel: (state, action) => {
      const newChannel = action.payload;
      if (!state.byId[newChannel.id]) {
        state.byId[newChannel.id] = newChannel;
        state.allIds.push(newChannel.id);
      }
    },
    handleRemoveChannel: (state, action) => {
      const { id } = action.payload;
      if (state.byId[id]) {
        delete state.byId[id];
        state.allIds = state.allIds.filter((channelId) => channelId !== id);
        if (state.activeChannelId === id) {
          state.activeChannelId = state.allIds[0] || null;
        }
      }
    },
    handleRenameChannel: (state, action) => {
      const { id, name } = action.payload;
      const channel = state.byId[id];
      channel.name = name;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.pending, (state) => {
        state.status = fetchStatus.Loading;
      })
      .addCase(fetchChannels.fulfilled, (state, action) => {
        state.status = fetchStatus.Success;
        action.payload.forEach((channel) => {
          state.byId[channel.id] = channel;
        });
        state.allIds = action.payload.map((channel) => channel.id);
      })
      .addCase(fetchChannels.rejected, (state, action) => {
        state.status = fetchStatus.Failed;
        state.error = action.error.message;
      })
      .addCase(addChannel.fulfilled, (state, action) => {
        const channel = action.payload;
        if (!state.byId[channel.id]) {
          state.byId[channel.id] = channel;
          state.allIds.push(channel.id);
        }

        state.activeChannelId = channel.id;
      })
      .addCase(removeChannel.fulfilled, (state, action) => {
        const { id } = action.payload;
        if (state.byId[id]) {
          delete state.byId[id];
          state.allIds = state.allIds.filter((channelId) => channelId !== id);
          if (state.activeChannelId === id) {
            state.activeChannelId = state.allIds[0] || null;
          }
        }
      })
      .addCase(renameChannel.fulfilled, (state, action) => {
        const { id, name } = action.payload;
        const channel = state.byId[id];
        channel.name = name;
      });
  },
});
export const getActiveChannel = (state) => {
  const { byId, activeChannelId } = state.channels;
  return byId[activeChannelId]?.name;
};

export const { setActiveChannel, handleAddChannel, handleRemoveChannel, handleRenameChannel } =
  channelsSlice.actions;

export { fetchChannels, addChannel, removeChannel, renameChannel };
export default channelsSlice.reducer;
