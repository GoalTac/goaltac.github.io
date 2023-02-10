import { useEffect, useState } from 'react';
import {
  Flex,
  Text,
  Input,
  Link,
  Button,
  Textarea,
  FormLabel,
  Stack,
  Card,
  FormControl,
  usecolorModeValue,
  Avatar,
  CardBody,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link as ReactRouterLink, useParams } from 'react-router-dom';
import supabase from '../supabase';

export default function Profile({ session }) {
  const { username } = useParams();
  const [editMode, setEditMode] = useState(false);

  const [profile, setProfile] = useState({
    id: null,
    username: '',
    biography: '',
  });

  useEffect(() => {
    async function getProfile() {
      console.log(username);
      const { data, error } = await supabase
        .from('profiles_view')
        .select('*')
        .eq('username', username)
        .limit(1)
        .single();

      setProfile({
        id: data.id,
        username: data.username,
        biography: data.biography,
      });
    }

    getProfile();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('profiles')
      .update({
        biography: profile.biography,
      })
      .eq('id', profile.id);
  };

  const onChangeBiography = e => {
    const val = e.target.value;
    setProfile(prevState => ({
      ...prevState,
      biography: val,
    }));
  };

  const onClickEdit = () => {
    setEditMode(!editMode);
  };

  return (
    <Flex
      flexDirection='column'
      width='100wh'
      height='100vh'
      justifyContent='center'
      alignItems='center'
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Button
        visibility={editMode ? 'hidden' : 'visible'}
        onClick={onClickEdit}
        bg={'blue.400'}
        color={'white'}
        w='full'
        _hover={{
          bg: 'blue.500',
        }}
        size='sm'
      >
        Edit Profile
      </Button>
      <Card>
        <CardBody>
          <Avatar
            name={profile.username}
            src='https://i.kym-cdn.com/photos/images/facebook/000/581/273/6aa.png'
          />
          <Text>{profile.username}</Text>
        </CardBody>
      </Card>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Biography</FormLabel>
          {editMode ? (
            <Textarea
              value={profile.biography}
              onChange={onChangeBiography}
              placeholder='Write an interesting bio!'
              size='sm'
            />
          ) : (
            <Text>{profile.biography}</Text>
          )}
        </FormControl>
        <Button
          type='submit'
          bg={'blue.400'}
          color={'white'}
          w='full'
          _hover={{
            bg: 'blue.500',
          }}
          visibility={editMode}
        >
          Submit
        </Button>
      </form>
    </Flex>
  );
}
