import React from 'react';
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  Stack,
  useToast,
  useColorMode
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useSession } from '../../hooks/SessionProvider';

function Form() {
  const { colorMode } = useColorMode();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [isClicked, setIsClicked] = React.useState(false);
  const { supabase: supabase } = useSession();
  const toast = useToast();

  const isExistingEmail = async email => {
    // checks whether the email is already in the database

    try {
      let { data: betaSignUp, error } = await supabase
        .from('betaSignUp')
        .select()
        .eq('email', email);

      if (betaSignUp.length > 0) {
        return true;
      }
      {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const onSubmit = async values => {
    console.log(await isExistingEmail(values.email));
    if (await isExistingEmail(values.email)) {
      return toast({
        title: 'You are already signed up',
        description: 'Try another email!',
        status: 'error',
        color: 'red.400',
        duration: 9000,
        isClosable: true,
      });
    } else {
      const { data, error } = await supabase
        .from('betaSignUp')
        .insert([{ email: values.email }]);
      console.log(error);

      return toast({
        title: 'Welcome!🚀',
        description: `${values.email} is now signed up`,
        status: 'success',
        color: 'green.400',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const onClick = () => {
    setIsClicked(true);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <FormControl
        isInvalid={errors.email}
        display='flex'
        alignItems='center'
        isRequired
        position='relative'
      >
        <Input
          minW='full'
          id='email'
          placeholder='Email Notifications'
          borderRadius='full'
          py='1rem'
          bgClip='text'
          color='white'
          {...register('email', {
            required: 'This is required',
            pattern: {
              value:
                /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
              message: 'This is not an email',
            },
          })}
        />
        {!errors.email && isClicked ? (
          <Box position='absolute' zIndex='100' top='60px' color='green.400'>
            Good! Your email address looks valid.
          </Box>
        ) : (
          <FormErrorMessage
            position='absolute'
            zIndex='100'
            top='56px'
            color='red.400'
          >
            {errors.email && errors.email.message}
          </FormErrorMessage>
        )}
      </FormControl>
    </form>
    
  );
}

export { Form };
