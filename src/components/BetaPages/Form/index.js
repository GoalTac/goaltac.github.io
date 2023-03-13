import React from 'react';
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Input,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

function Form() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [isClicked, setIsClicked] = React.useState(false);

  const onSubmit = values => {
    return new Promise(resolve => {
      setTimeout(() => {
        alert(`You've received an email in ${JSON.stringify(values.email)}`);
        resolve();
      }, 1000);
    });
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
          id='email'
          placeholder='Updates in your inbox...'
          borderRadius='40px'
          py='1.8rem'
          bg='gray'
          color='blue.light'
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
          <FormErrorMessage position='absolute' zIndex='100' top='56px'>
            {errors.email && errors.email.message}
          </FormErrorMessage>
        )}

        <Button
          type='submit'
          variant='solid'
          onClick={onClick}
          marginLeft='1rem'
        >
          Go
        </Button>
      </FormControl>
    </form>
  );
}

export { Form };
