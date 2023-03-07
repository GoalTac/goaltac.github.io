import { Grid, GridItem } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from '../components/schedule/Calendar';
import Today from '../components/schedule/Today';
import { useSession } from '../hooks/SessionProvider';

export default function Schedule(props) {
  const { supabase: supabase } = useSession();
  const [tasks, setTasks] = useState([]); //eslint-disable-next-line
  const [session, setSession] = useState(props.session);
  const navigate = useNavigate();

  const getTasks = async function () {
    let { data: tasks } = await supabase.from('todos').select('*');
    setTasks(tasks);
  };

  useEffect(() => {
    console.log(session);
    if (session == null) {
      navigate('/signin');
    }
  }, []);

  let todays = (function () {
    let todays_tasks = [];

    for (let x in tasks) {
      let date = new Date(tasks[x].end_date);
      const ms_in_hour = 3600000;
      const ms_in_day = 86400000;
      const startOfDay =
        Math.floor(new Date() / ms_in_day) * ms_in_day - 19 * ms_in_hour;

      if (
        date.getTime() > startOfDay &&
        date.getTime() < startOfDay + ms_in_day
      ) {
        console.log(date);
        todays_tasks.push(tasks[x]);
      }
    }
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
