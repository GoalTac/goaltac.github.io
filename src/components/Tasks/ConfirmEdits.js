// EDIT MODE ONLY

import { IconButton } from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';

const ConfirmEdits = function ({ confirm }) {
  return (
    <IconButton
      aria-label='confirm the edits you have mdae'
      isRound={true}
      float='right'
      colorScheme='green'
      icon={<CheckIcon />}
      onClick={confirm}
    />
  );
};
export default ConfirmEdits;
