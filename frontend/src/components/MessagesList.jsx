import { useSelector } from 'react-redux';
import { useRef, useEffect } from 'react';

// eslint-disable-next-line react/prop-types
const MessagesList = ({ channelId }) => {
  const messagesEndRef = useRef(null);
  const messages = useSelector((state) => state.messages.byId);

  useEffect(() => {
    const element = messagesEndRef.current;
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chat-messages overflow-auto px-5 " id="messages-box" ref={messagesEndRef}>
      {Object.values(messages).map((message) => {
        if (message.channelId === channelId) {
          return (
            <div className="text-break mb-2" key={message.id}>
              <b>{message.username}</b>
              :&nbsp;
              {message.body}
              <br />
            </div>
          );
        }
        return message.id === channelId;
      })}
    </div>
  );
};

export default MessagesList;
