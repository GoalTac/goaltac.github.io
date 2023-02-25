import {
  Flex,
  FormControl,
  HStack,
  Input,
  InputGroup,
  Text,
} from '@chakra-ui/react';

export default function MsgConversation() {
  return (
    <>
      <Flex>
        <HStack>
          <Text>Message history</Text>
          <FormControl>
            <InputGroup>
              <Input placeholder='send message' />
            </InputGroup>
          </FormControl>
        </HStack>
      </Flex>
    </>
  );
}
