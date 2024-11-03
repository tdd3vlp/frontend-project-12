import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { serverPaths as paths } from '../../routes';
import fetchStatus from '../../utils/fetchStatus';
import { removeChannel } from '../channels/channelsSlice';
import axios from 'axios';

const fetchMessages = createAsyncThunk('messages/fetchMessages', async () => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get(paths.messagesPath(), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (fetchMessagesError) {
    console.error('fetchMessagesError', fetchMessagesError);
  }
});

const addMessage = createAsyncThunk('messages/addMessage', async (newMessage) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.post(paths.messagesPath(), newMessage, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (addMessageError) {
    console.error('addMessageError', addMessageError);
  }
});

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    byId: {},
    allIds: [],
    status: fetchStatus.Idle,
    error: null,
  },
  reducers: {
    handleAddMessage: (state, action) => {
      const newMessage = action.payload;
      state.byId[newMessage.id] = newMessage;
      state.allIds.push(newMessage.id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.status = fetchStatus.Loading;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.status = fetchStatus.Success;
        action.payload.forEach((message) => {
          state.byId[message.id] = message;
        });
        state.allIds = action.payload.map((message) => message.id);
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.status = fetchStatus.Failed;
        state.error = action.error.message;
      })
      .addCase(addMessage.fulfilled, (state, action) => {
        const message = action.payload;
        state.byId[message.id] = message;
        state.allIds.push(message.id);
      })
      .addCase(addMessage.rejected, (state, action) => {
        state.status = fetchStatus.Failed;
        state.error = action.error.message;
      })
      .addCase(removeChannel.fulfilled, (state, action) => {
        const { id } = action.payload;
        const messages = state.byId;
        Object.values(messages).filter((message) => {
          if (message.channelId === id) {
            delete state.byId[message.id];
            state.allIds = state.allIds.filter((messageId) => messageId !== message.id);
          }
        });
      });
  },
});

export const getMessagesLength = (state) => {
  const messages = state.messages.byId;
  const activeChannelId = state.channels.activeChannelId;
  return Object.values(messages).filter((message) => {
    return message.channelId === activeChannelId;
  }).length;
};

export const { handleAddMessage } = messagesSlice.actions;
export { fetchMessages, addMessage };
export default messagesSlice.reducer;
