import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
  useColorMode,
} from '@chakra-ui/react';
import { SmallCloseIcon } from '@chakra-ui/icons';

function SettingsPage() {
  const { colorMode } = useColorMode();

  return (
    <Flex
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
          Edit your profile
        </Heading>
        <FormControl id='userName'>
          <FormLabel>Change Icon</FormLabel>
          <Stack direction={['column', 'row']} spacing={6}>
            <Center>
              <Avatar size='xl' src='https://bit.ly/sage-adebayo'>
                <AvatarBadge
                  as={IconButton}
                  size='sm'
                  rounded='full'
                  top='-10px'
                  colorScheme='red'
                  aria-label='remove Image'
                  icon={<SmallCloseIcon />}
                />
              </Avatar>
            </Center>
            <Center w='full'>
              <Input type='file'></Input>
            </Center>
          </Stack>
        </FormControl>
        <FormControl id='userName'>
          <FormLabel>Change Username</FormLabel>
          <Input
            placeholder='New Username'
            _placeholder={{ color: 'gray.500' }}
            type='text'
          />
        </FormControl>
        <FormControl id='password'>
          <FormLabel>Change Password</FormLabel>
          <Input
            placeholder='New Password'
            _placeholder={{ color: 'gray.500' }}
            type='password'
          />
        </FormControl>
        <Stack spacing={6} direction={['column', 'row']}>
          <Button
            bg={'red.400'}
            color={'white'}
            w='full'
            _hover={{
              bg: 'red.500',
            }}
          >
            Cancel
          </Button>
          <Button
            bg={'blue.400'}
            color={'white'}
            w='full'
            _hover={{
              bg: 'blue.500',
            }}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}

export default SettingsPage;
