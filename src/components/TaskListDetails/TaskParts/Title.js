import { ModalHeader } from '@chakra-ui/react';

export default function Title({ title, diff }) {
  const titleBackground = function () {
    switch (diff) {
      case 0:
        return 'green.300';

      case 1:
        return 'orange.300';

      case 2:
        return 'blue.300';

      default:
        return 'black.100';
    }
  };

  const harmonizedBorder = function () {
    switch (diff) {
      case 0:
        return '#68aad3';

      case 1:
        return '#8ad368';

      case 2:
        return '#8ad368';
      default:
        return 'black.100';
    }
  };

  const fixTitle = function () {
    const z = title.split(' '); //Split title into an array of it's individual words
    let fixedTitle = '';

    for (let g in z) {
      //Index
      const x = z[g]; //Word
      if (x.length > 1) {
        let remake = '';
        remake += x.charAt(0).toUpperCase();
        remake += x.substring(1) + ' ';
        fixedTitle += remake;
      } else {
        fixedTitle += x + ' ';
      }
    }

    return fixedTitle;
  };

  return (
    <ModalHeader
      className='task-modal-header'
      fontSize='3xl'
      whiteSpace='nowrap'
      pr=''
      pt='0px'
      pb='1.5em'
      overflowX='scroll'
      overflowY='hidden'
      bg={titleBackground}
      borderColor={harmonizedBorder}
      borderRightWidth='0.3vw'
      borderTopWidth='0.3vw'
      borderBottomWidth='0.3vw'
      borderRightRadius={50}
      minH='2em'
      maxH='2em'
      minW='60%'
      maxW='60%'
    >
      {fixTitle()}
    </ModalHeader>
  );
}
