import { Nav, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { setActiveChannel } from '../features/channels/channelsSlice';
import { useDispatch } from 'react-redux';

const ChannelsList = () => {
  const dispatch = useDispatch();
  const { byId: channels, activeChannelId } = useSelector((state) => state.channels);

  const handleChannelClick = (channelId) => {
    dispatch(setActiveChannel(channelId));
  };

  return (
    <Nav
      as="ul"
      id="channels-box"
      className="flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
    >
      {Object.entries(channels).map(([channelId, channel]) => {
        return (
          <Nav.Item as="li" key={channelId} className="w-100">
            <Button
              variant={activeChannelId === channelId ? 'secondary' : 'light'}
              className="w-100 rounded-0 text-start"
              onClick={() => handleChannelClick(channelId)}
            >
              <span className="me-1">#</span>
              {channel.name}
            </Button>
          </Nav.Item>
        );
      })}
    </Nav>
  );
};

export default ChannelsList;
