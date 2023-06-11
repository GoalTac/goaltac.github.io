import { useQuery } from 'react-query';
import supabase from '../app/supabase';

//Main idea is to split up the UI and back-end fetching into two parts for better readability and smaller file sizes for the pages.
//Can create multiple files (e.g one for each table or similar) and can have multiple functions in each file each to read, update, create etc.

//Function which returns data and handles error / input validation if required
//Function can take in parameters if they are needed in the supabase query or for validation
const getCatgeory = async () => {
  const { data, error } = await supabase.from('categories').select('*');

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error('No categories found');
  }

  return data;
};

//Exported function which uses the react query hook 'useQuery' for reads for 'useMutation' for writes/updates etc.
//Hook takes in an id and the function that is called, returns helper functions like isLoading, data, isError, refetch conditions and much more.
export default function useCategory() {
  return useQuery('get-category', () => getCatgeory());
}

//More info
//https://dev.to/ankitjey/the-magic-of-react-query-and-supabase-1pom
//https://tanstack.com/query/v3/
