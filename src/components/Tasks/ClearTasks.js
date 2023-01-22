import { Flex, Button } from '@chakra-ui/react';
import supabase from '../../supabase';
import { useState } from 'react';

export default function ClearTasks() {
  const [loading, setloading] = useState(false);

  async function handleClear() {
    setloading(true);
    const { data, error } = await supabase
      .from('todos')
      .delete()
      .not('text', 'eq', 'Do NOt deleTe m3');
    setloading(false);

    // toast({
    //   title: error || 'task deleted',
    //   position: 'top',
    //   status: error ? 'error' : 'success',
    //   duration: 2000,
    //   isClosable: true,
    // });
  }

  return (
    <Flex>
      <Button
        colorScheme='gray'
        px='8'
        h='45'
        color='gray.500'
        mt='10'
        onClick={handleClear}
        isLoading={loading}
        loadingText='clearing'
      >
        Clear Tasks
      </Button>
    </Flex>
  );
}
