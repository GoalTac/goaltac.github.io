import {
    Flex,
} from '@chakra-ui/react';
import Header from '../components/Communities/InsideView/Group/Header';

export default function Community() {
  return (
    <Flex w='100%' h='100%' padding='10' gap={15}>
      <Header />
    </Flex>
  );        
}
