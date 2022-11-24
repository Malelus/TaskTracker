export type TTaskStructure = {
  id: string;
  name: string;
  date: string;
  status: number;
  priority: number;
};

export type TTask = TTaskFunctions & {
  task: TTaskStructure;
  tasksList: {
    currentIndex: number;
    length: number;
  };
};

export type TTaskList = TTaskFunctions & {
  tasks: TTaskStructure[];
};

type TTaskFunctions = {
  removeTask: (id: string) => void;
  updateTask: (id: string, data: Partial<TTaskStructure>) => void;
  changeStatus: (id: string, direction: string) => void;
  changePriority: (id: string, direction: string) => void;
  changePosition: (id: string, direction: string) => void;
};

export type TTaskError = {
  duration: number;
  nameError?: boolean;
  dateError?: boolean;
};
