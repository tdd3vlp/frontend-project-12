import { useSelector } from 'react-redux';
import { useRef, useEffect } from 'react';

const AVATAR_COLORS = [
  '#e8a838', '#e01e5a', '#1264a3', '#2eb67d',
  '#ecb22e', '#36c5f0', '#611f69', '#007a5a',
];

const getAvatarColor = (username) => {
  let hash = 0;
  for (let i = 0; i < username.length; i += 1) {
    // eslint-disable-next-line no-bitwise
    hash = username.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
};

const formatTime = (ts) => {
  if (!ts) return '';
  return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const MessagesList = ({ channelId }) => {
  const messagesEndRef = useRef(null);
  const messages = useSelector((state) => state.messages.byId);

  useEffect(() => {
    const el = messagesEndRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  const filteredMessages = Object.values(messages)
    .filter((msg) => msg.channelId === channelId);

  return (
    <div className="chat-messages overflow-auto flex-grow-1" id="messages-box" ref={messagesEndRef}>
      {filteredMessages.map((message) => (
        <div className="message-item" key={message.id}>
          <div
            className="msg-avatar"
            style={{ backgroundColor: getAvatarColor(message.username) }}
          >
            {message.username[0]}
          </div>
          <div className="msg-content">
            <div className="msg-header">
              <span className="msg-username">{message.username}</span>
              <span className="msg-time">{formatTime(message.createdAt)}</span>
            </div>
            <p className="msg-body mb-0">{message.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessagesList;
