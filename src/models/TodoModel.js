import { observable } from "mobx";

class TodoModel {
    @observable key;
    @observable todo;
    @observable todoDate;
    constructor(todo,todoDate){
        this.key = Math.floor(Math.random()*9999);
        this.todo = todo;
        this.todoDate = todoDate;
    }
    toObject(){
        return{
            key:this.key,
            todo:this.todo,
            todoDate:this.todoDate
        }
    }
}
export default TodoModel;