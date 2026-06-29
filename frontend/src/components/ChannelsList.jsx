import { Nav, Dropdown } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ThreeDots } from 'react-bootstrap-icons';
import { setActiveChannel } from '../features/channels/channelsSlice';
import { openRemoveChannelModal, openRenameChannelModal } from '../features/modals/modalSlice';

const ChannelsList = () => {
  const dispatch = useDispatch();
  const { byId: channels, activeChannelId } = useSelector((state) => state.channels);
  const { t } = useTranslation();

  return (
    <Nav
      as="ul"
      id="channels-box"
      className="flex-column mb-3 overflow-auto h-100 d-block"
    >
      {Object.entries(channels).map(([channelId, channel]) => {
        const isActive = activeChannelId === channelId;
        return (
          <Nav.Item as="li" key={channelId}>
            {channel.removable ? (
              <div className="channel-item-group">
                <button
                  type="button"
                  className={`channel-btn${isActive ? ' is-active' : ''}`}
                  onClick={() => dispatch(setActiveChannel(channelId))}
                >
                  <span className="ch-hash">#</span>
                  <span className="ch-name">{channel.name}</span>
                </button>
                <Dropdown align="end">
                  <Dropdown.Toggle
                    bsPrefix="channel-menu-btn"
                    className={isActive ? 'is-active' : ''}
                  >
                    <ThreeDots size={13} />
                    <span className="visually-hidden">{t('channels.menu')}</span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => dispatch(openRemoveChannelModal(channelId))}>
                      {t('channels.remove')}
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => dispatch(openRenameChannelModal({ id: channelId, name: channel.name }))}
                    >
                      {t('channels.rename')}
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            ) : (
              <button
                type="button"
                className={`channel-btn${isActive ? ' is-active' : ''}`}
                onClick={() => dispatch(setActiveChannel(channelId))}
              >
                <span className="ch-hash">#</span>
                <span className="ch-name">{channel.name}</span>
              </button>
            )}
          </Nav.Item>
        );
      })}
    </Nav>
  );
};

export default ChannelsList;
