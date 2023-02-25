import { IconButton } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';

export default function EditTask({ id, toggleEdit }) {
  return (
    <IconButton
      aria-label='edit this task'
      isRound={true}
      icon={<EditIcon />}
      onClick={toggleEdit}
    />
  );
}
