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
  useToast,
} from '@chakra-ui/react';
import { SmallCloseIcon } from '@chakra-ui/icons';
import supabase from '../supabase';
import { useEffect, useState } from 'react';

function SettingsPage({ session }) {
  const { colorMode } = useColorMode();
  const toast = useToast();

  const [fieldState, setFieldState] = useState({
    username: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase
        .from('usernames')
        .select('username')
        .eq('userid', session.user.id);

      setFieldState(prevState => ({
        ...prevState,
        username: data[0].username,
      }));
    }
    fetchData();
  }, []);

  async function onSubmit(e) {
    e.preventDefault();
    const { data, error } = await supabase
      .from('usernames')
      .update({
        username: fieldState.username,
        updated_at: new Date().toISOString().toLocaleString('en-US'),
      })
      .eq('userid', session.user.id);
    console.log('here');
    console.log(error);
    if (error) {
      return toast({
        title: 'Error on submit',
        description: error.message,
        status: 'failure',
        duration: 9000,
        isClosable: true,
      });
    }
  }

  const onChangeUsername = e => {
    const val = e.target.value;
    setFieldState(prevState => ({
      ...prevState,
      username: val,
    }));
  };

  const onChangePassword = e => {
    const val = e.target.value;
    setFieldState(prevState => ({
      ...prevState,
      password: val,
    }));
  };

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
        <form onSubmit={onSubmit}>
          <FormControl id='avatar'>
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

          <FormControl id='username'>
            <FormLabel>Change Username</FormLabel>
            <Input
              type='text'
              value={fieldState.username}
              onChange={onChangeUsername}
            />
          </FormControl>

          <FormControl id='password'>
            <FormLabel>Change Password</FormLabel>
            <Input
              placeholder='New Password'
              _placeholder={{ color: 'gray.500' }}
              type='password'
              value={fieldState.password}
              onChange={onChangePassword}
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
              type='submit'
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
        </form>
      </Stack>
    </Flex>
  );
}

export default SettingsPage;
