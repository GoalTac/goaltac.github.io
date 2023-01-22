import { IconButton } from '@chakra-ui/react';

import { EditIcon } from '@chakra-ui/icons';

export default function EditTask({ id, onClick }) {
  return <IconButton isRound={true} icon={<EditIcon />} onClick={onClick} />;
}
