import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { closeRemoveChannelModal } from '../features/modals/modalSlice';
import { removeChannel } from '../features/channels/channelsSlice';

const RemoveChannelModal = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isOpen, channelId } = useSelector((state) => state.modals.removeChannelModal);

  const handleRemove = () => {
    if (channelId) {
      dispatch(removeChannel(channelId))
        .then(() => {
          toast.success(t('channels.removed'));
        })
        .catch(() => {
          toast.error(t('errors.network'));
        });
      dispatch(closeRemoveChannelModal());
    }
  };

  return (
    <Modal show={isOpen} centered onHide={() => dispatch(closeRemoveChannelModal())}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.remove')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modals.confirmation')}</p>
        <div className="d-flex justify-content-end">
          <Button variant="secondary" onClick={() => dispatch(closeRemoveChannelModal())}>
            {t('modals.cancel')}
          </Button>
          <Button variant="danger" onClick={handleRemove} className="ms-2">
            {t('modals.confirm')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannelModal;
