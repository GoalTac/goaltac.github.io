import { Grid, GridItem } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../supabase';
import Calendar from '../components/schedule/Calendar';
import Today from '../components/schedule/Today';

export default function Schedule() {
  const [tasks, setTasks] = useState([]); //eslint-disable-next-line
  const [session, setSession] = useState(undefined);
  const navigate = useNavigate();

  const getTasks = async function () {
    let { data: tasks } = await supabase.from('todos').select('*');
    setTasks(tasks);
    // console.log(tasks)
  };

  useEffect(() => {
    const getSession = async function () {
      await supabase.auth.getSession().then(table => {
        if (!table.data?.session) {
          console.log("\nThere's no session");
          navigate('/login');
        } else {
          setSession(table.data);
          getTasks();
        }
      });
    };

    // getSession(); //eslint-disable-next-line
  }, []);

  let todays = (function () {
    let todays_tasks = [];

    for (let x in tasks) {
      let date = new Date(tasks[x].end_date);
      const ms_in_hour = 3600000;
      const ms_in_day = 86400000;
      const startOfDay =
        Math.floor(new Date() / ms_in_day) * ms_in_day - 19 * ms_in_hour;

      // console.log(date + ': ' + (date.getTime() < startOfDay && date.getTime() < startOfDay+ms_in_day));

      if (
        date.getTime() > startOfDay &&
        date.getTime() < startOfDay + ms_in_day
      ) {
        console.log(date);
        todays_tasks.push(tasks[x]);
      }
    }
    // console.log(todays_tasks);
    return todays_tasks;
  })();

  return (
    <Grid mt='10vh' templateColumns='repeat(8, 1fr)'>
      <GridItem colSpan={1} rowSpan={2}>
        <Today tasks={todays} />
      </GridItem>
      <GridItem colSpan={7}>
        <Calendar tasks={tasks} />
      </GridItem>
    </Grid>
  );
}
