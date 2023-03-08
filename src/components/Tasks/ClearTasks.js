import { Flex, Button } from '@chakra-ui/react';
import { useState } from 'react';
import { useSession } from '../../hooks/SessionProvider';

export default function ClearTasks() {
  const { supabase: supabase } = useSession();
  const [loading, setloading] = useState(false);

  async function handleClear() {
    setloading(true);
    const { data, error } = await supabase
      .from('todos')
      .delete()
      .not('text', 'eq', 'Do NOt deleTe m3');
    setloading(false);
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
