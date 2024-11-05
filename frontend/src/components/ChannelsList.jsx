import { Nav, Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveChannel } from '../features/channels/channelsSlice';
import { useTranslation } from 'react-i18next';
import { openRemoveChannelModal, openRenameChannelModal } from '../features/modals/modalSlice';

const ChannelsList = () => {
  const dispatch = useDispatch();
  const { byId: channels, activeChannelId } = useSelector((state) => state.channels);
  const { t } = useTranslation();

  const handleChannelClick = (channelId) => {
    dispatch(setActiveChannel(channelId));
  };

  const handleRemoveChannel = (channelId) => {
    dispatch(openRemoveChannelModal(channelId));
  };

  const handleRenameChannel = (channelId, channelName) => {
    dispatch(openRenameChannelModal(channelId, channelName));
  };

  return (
    <Nav
      as="ul"
      id="channels-box"
      className="flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
    >
      {Object.entries(channels).map(([channelId, channel]) => (
        <Nav.Item as="li" key={channelId} className="w-100">
          {channel.removable ? (
            <Dropdown as={ButtonGroup} className="w-100">
              <Button
                variant={activeChannelId === channelId ? 'secondary' : 'light'}
                className="w-100 rounded-0 text-start text-truncate"
                onClick={() => handleChannelClick(channelId)}
              >
                <span className="me-1">#</span>
                {channel.name}
              </Button>
              <Dropdown.Toggle
                split
                variant={activeChannelId === channelId ? 'secondary' : 'light'}
              >
                <span className="visually-hidden">{t('channels.menu')}</span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleRemoveChannel(channelId)}>
                  {t('channels.remove')}
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => handleRenameChannel({ id: channelId, name: channel.name })}
                >
                  {t('channels.rename')}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Button
              variant={activeChannelId === channelId ? 'secondary' : 'light'}
              className="w-100 rounded-0 text-start"
              onClick={() => handleChannelClick(channelId)}
            >
              <span className="me-1">#</span>
              {channel.name}
            </Button>
          )}
        </Nav.Item>
      ))}
    </Nav>
  );
};

export default ChannelsList;
