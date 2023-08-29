import { Container, SimpleGrid, } from '@chakra-ui/react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Column from '../components/Calendar/Column';
import { ColumnType } from '../components/Calendar/utils/enums';

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
    <DndProvider backend={HTML5Backend}>
      <Container maxWidth="container.lg" >

        {/* calendar */}
        <SimpleGrid columns={{ base: 1, md: 7 }} spacing={{ base: 16, md: 2 }}>
          {columns}
        </SimpleGrid>

      </Container>
    </DndProvider>
  );
}

export default Calendar;