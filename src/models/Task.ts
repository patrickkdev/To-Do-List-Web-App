export default interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// export default class Task {
//   id: number
//   title: string
//   description: string
//   completed: boolean
//   created_at: Date
//   updated_at: Date

//   constructor() {
//     this.id = 0
//     this.title = ''
//     this.description = ''
//     this.completed = false
//     this.created_at = new Date()
//     this.updated_at = new Date()
//   }
  
//   static fromJson (json: Task) {
//     const task = new Task()
//     task.id = json.id
//     task.title = json.title
//     task.description = json.description
//     task.completed = json.completed
//     task.created_at = new Date(json.created_at)
//     task.updated_at = new Date(json.updated_at)

//     return task
//   }

//   update(task: Task) {
//     this.title = task.title
//     this.description = task.description
//     this.completed = task.completed
//     this.updated_at = new Date()
//   }

// }