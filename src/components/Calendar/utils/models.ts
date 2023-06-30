import { ColumnType } from './enums';

export interface TaskModel {
  id: string;
  title: string;
  column: ColumnType;
  color: string;
  type: string;
}

export interface DragItem {
  index: number;
  id: TaskModel['id'];
  from: ColumnType;
}
