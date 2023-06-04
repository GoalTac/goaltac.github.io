import { VStack, StackDivider, Image, Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import CategoryItem from './CategoryItem';
import { useSupabaseClient } from '../../../hooks/SessionProvider';
import useCategory from '../../../api/Categories';

/**
 *
 * 1. Gather data on the tasks[taskID, title, desc, ...] and categories[category[[taskIDs, title, desc, ...]]]
 * 2. Iterate through categories and use the categoryItem component to create the UI
 *    (Pass the categories AND tasks through the categoryItem )
 */

export default function CategoryDisplay() {
  const supabase = useSupabaseClient();

  //REACT HOOK EXAMPLE, returns data and helper functions like isLoading
  const { data, isLoading: loading2 } = useCategory();
  console.log(data);
  console.log(loading2);

  //provides updates to the category component whenever categories gets updated
  useEffect(() => {
    const todos = supabase
      .channel('custom-all-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'categories' },
        payload => {
          fetchData();
          console.log('Change received!', payload);
        }
      )
      .subscribe();
  }, []);

  //
  const [categories, setCategories] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [isLoading, setLoading] = useState(true);

  /**
   *
   * @param {category obejct} contains detail on a singular category object
   * @returns A new array containing an array of task obejcts contained in the given category
   */
  const getMatchingTasks = category => {
    /*if this method returns an empty array, that means 
      that there are no matching tasks in this category
      - Each Category stores a list of IDs for each task it holds
      - Purpose of this function is to loop through the available IDs and match
      the ID of an iterated task to the IDs in the category's storage
      1. Use category's TASK IDs (which contains taskIDs)
      2. Loop through the TASKIDs and check the IDs of the tasks var.
      3. The above is done to find the task objects that match the taskIDs
      found inside the category variable
    */

    //map the taskID to the task objects
    //category.tasks is the list of task IDs the category holds

    try {
      /*
      let taskIDs = tasks.map(task => task.id)
      console.log("TASK IDS", taskIDs)
      console.log("CATEGORY IDS", category.tasks)*/

      let matchedTasks = tasks.filter(taskID =>
        category.tasks.includes(taskID.id)
      );
      //console.log(matchedTasks)
      return matchedTasks;
    } catch (exception) {
      return exception;
    }
  };

  async function fetchData() {
    let { data: categories, errorCategories } = await supabase
      .from('categories')
      .select('*');
    let { data: tasks, errorTasks } = await supabase.from('todos').select('*');

    setCategories(categories);
    setTasks(tasks);

    console.log('ALL TASKS', tasks);
    console.log('ALL CATEGORIES', categories);

    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <VStack
        divider={<StackDivider />}
        borderColor='gray.300'
        borderWidth='2px'
        p='5'
        borderRadius='lg'
        w='100vw'
        maxW={{ base: '90vw', sm: '80vw', lg: '50vw', xl: '30vw' }}
        alignItems='left'
      >
        {!isLoading &&
          categories.map(category => (
            <CategoryItem
              key={category.id}
              tasks={getMatchingTasks(category)}
              category={category}
              p='5px'
              w='auto'
              h='7vh'
              heading_font_size='lg'
              size='3xl'
            />
          ))}
      </VStack>
    </>
  );
}
