import { useSelector } from 'react-redux';

// eslint-disable-next-line react/prop-types
export default function MessagesList({ channelId }) {
  const messages = useSelector((state) => state.messages.byId);

  return (
    <div className="chat-messages overflow-auto px-5 " id="messages-box">
      {Object.values(messages).map((message) => {
        if (message.channelId === channelId) {
          return (
            <div className="text-break mb-2" key={message.id}>
              <b>{message.username}</b>: {message.body}
              <br />
            </div>
          );
        }
        message.id === channelId;
      })}
    </div>
  );
}
