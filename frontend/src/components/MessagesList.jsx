import { useSelector } from 'react-redux';
import { useRef, useEffect } from 'react';

const MessagesList = ({ channelId }) => {
  const messagesEndRef = useRef(null);
  const messages = useSelector((state) => state.messages.byId);

  useEffect(() => {
    const element = messagesEndRef.current;
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  }, [messages]);

  const filteredMessages = Object.values(messages)
    .filter((message) => message.channelId === channelId);

  return (
    <div className="chat-messages overflow-auto px-5 " id="messages-box" ref={messagesEndRef}>
      {filteredMessages.map((message) => (
        <div className="text-break mb-2" key={message.id}>
          <b>{message.username}</b>
          :&nbsp;
          {message.body}
          <br />
        </div>
      ))}
    </div>
  );
};

export default MessagesList;
