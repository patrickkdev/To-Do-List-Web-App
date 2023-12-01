import Task from "./Task";

export default interface TodoData {
  title: string;
  description: string;
  tasks: Task[];
}

// import Task from "./Task";

// export default class TodoList {
//   title: string
//   description: string
//   tasks: Task[]

//   constructor() {
//     this.title = ''
//     this.description = ''
//     this.tasks = []
//   }

//   static fromJson(json: TodoList) {
//     const todoList = new TodoList()
//     todoList.title = json.title
//     todoList.description = json.description
//     todoList.tasks = json.tasks.map(Task.fromJson)
//   }

//   update(todoList: TodoList) {
//     this.title = todoList.title
//     this.description = todoList.description
//     this.tasks = todoList.tasks
//     this.tasks.forEach(task => task.update(task))
//   }
// }