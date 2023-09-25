import { useLocalStorage } from 'usehooks-ts';
import { v4 as uuidv4 } from 'uuid';
import { ColumnType } from '../utils/enums';
import { TaskModel } from '../utils/models';

export default function useTaskCollection() {

  return useLocalStorage<{
    [key in ColumnType]: TaskModel[]; // Define the shape of the stateful value as an object with keys of type ColumnType and values of type TaskModel[]
  }>('tasks', {
    Monday: [{ id: uuidv4(), column: ColumnType.MONDAY, title: "temp", color: "temp", type:"task"},],
    Tuesday: [{ id: uuidv4(), column: ColumnType.TUESDAY, title: "temp", color: "temp", type:"task"},],
    Wednesday: [{ id: uuidv4(), column: ColumnType.WEDNESDAY, title: "temp", color: "temp", type:"task"},],
    Thursday: [{ id: uuidv4(), column: ColumnType.THURSDAY, title: "temp", color: "temp", type:"task"},],
    Friday: [{ id: uuidv4(), column: ColumnType.FRIDAY, title: "temp", color: "temp", type:"task"},],
    Saturday: [{ id: uuidv4(), column: ColumnType.SATURDAY, title: "temp", color: "temp", type:"task"},],
    Sunday: [{ id: uuidv4(), column: ColumnType.SUNDAY, title: "temp", color: "temp", type:"task"},],
  });
}