import { TTaskStructure } from './TaskTypes';

export type TCreateTaskForm = {
  submitTask: ({}: TTaskStructure) => void;
  showCreateTask: boolean;
};
