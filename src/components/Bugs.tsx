import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from '@chakra-ui/react';
import { useState } from 'react';

export default function Bug() {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div>
      <Button onClick={toggleModal}>Open Feedback Form</Button>
      <Modal isOpen={showModal} onClose={toggleModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Feedback Form</ModalHeader>
          <ModalBody>
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLScpFA-oQVKG7z87W_emcggqLhfDuVMJOUnS0hqTn1aifViOkA/viewform?embedded=true"
              width="640"
              height="406"
            >
              Loading…
            </iframe>
          </ModalBody>
          <ModalFooter>
            <Button onClick={toggleModal}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
