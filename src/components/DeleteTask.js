import { IconButton, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import supabase from '../supabase';

export default function DeleteTask({ id }) {
  const [loading, setloading] = useState(false);
  const toast = new useToast();
//just checkin somethin
  async function handleDelete() {
    setloading(true);
    const { data, error } = await supabase.from('todos').delete().eq('id', id);
    setloading(false);

    toast({
      title: error || 'task deleted',
      position: 'top',
      status: error ? 'error' : 'success',
      duration: 2000,
      isClosable: true,
    })
  }
  return (
    <IconButton
      isRound="true"
      icon={<FiTrash2 />}
      onClick={handleDelete}
      isLoading={loading}
    />
  );
}
