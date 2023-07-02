import { Container, SimpleGrid, } from '@chakra-ui/react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Column from '../components/Calendar/Column';
import { ColumnType } from '../components/Calendar/utils/enums';
import CheckAndTitle from '../components/CheckAndTitle';

// helper function to get the columns for the calendar
const getColumns = () => {
  const startDate = new Date();
  const days = [
    ColumnType.SUNDAY,
    ColumnType.MONDAY,
    ColumnType.TUESDAY,
    ColumnType.WEDNESDAY,
    ColumnType.THURSDAY,
    ColumnType.FRIDAY,
    ColumnType.SATURDAY,
  ];

  const startDay = startDate.getDay();
  const reorderedDays = [...days.slice(startDay), ...days.slice(0, startDay)];

  return reorderedDays.map((day, index) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + index);
    return <Column key={index} column={day} />;
  });
};

function Calendar() {

  // Variables ----------------------------------------------------------------------
  const columns = getColumns();

  // UseEffect ----------------------------------------------------------------------
  // Functions ----------------------------------------------------------------------

  return (
    <CheckAndTitle title='Calendar'>
      <DndProvider backend={HTML5Backend}>
        <Container maxWidth="container.lg" py={6} pl={0} ml={'2vw'} mr={'2vw'}>

          {/* calendar */}
          <SimpleGrid columns={{ base: 1, md: 7 }} spacing={{ base: 16, md: 2 }} pt={10} pl={0} w={'95vw'}>
            {columns}
          </SimpleGrid>

        </Container>
      </DndProvider>
    </CheckAndTitle>
  );
}

export default Calendar;