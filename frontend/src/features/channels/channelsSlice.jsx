import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { serverPaths as paths } from '../../routes';
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

const addChannel = createAsyncThunk('channels/fetchChannels', async (newChannel) => {
  const token = localStorage.getItem('token');

  try {
    const response = await axios.get(paths.channelsPath(), newChannel, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (addChannelError) {
    console.error('addChannelError', addChannelError);
  }
});

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
      });
    // TODO: add channel logic
  },
});

export const { setActiveChannel } = channelsSlice.actions;
export const getActiveChannel = (state) => {
  const { byId, activeChannelId } = state.channels;
  return byId[activeChannelId]?.name;
};
export { fetchChannels, addChannel };
export default channelsSlice.reducer;
