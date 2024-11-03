import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { removeChannel } from '../features/channels/channelsSlice';
import { closeRemoveChannelModal } from '../features/modals/modalSlice';
import { toast } from 'react-toastify';

export default function RemoveChannelModal() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isOpen, channelId } = useSelector((state) => state.modals.removeChannelModal);

  const handleRemove = () => {
    if (channelId) {
      dispatch(removeChannel(channelId));
      dispatch(closeRemoveChannelModal());
      toast.success(t('channels.removed'));
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
}
