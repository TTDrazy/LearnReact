import { observable, computed, action } from "mobx";
import TodoModel from "../models/TodoModel";

class TodoStore {
    @observable todoList = [
        {
            key: "1",
            todo: "吃饭饭",
            todoDate: "2019-03-26 17:00"
        },
        {
            key: "2",
            todo: "洗澡澡",
            todoDate: "2019-03-26 18:00"
        }
    ];
    @action
    Add({ todo, todoDate }) {
        this.todoList.push(new TodoModel(todo,todoDate).toObject());
    }
    @action
    RemoveItemByKey(key){
       this.todoList = this.todoList.filter((item)=>item.key !== key);
    }
    @action
    GetItemByKey(key){
        return this.todoList.find((item) => item.key == key);
    }
    @action
    EditItemByKey(key,data){
       let todoItem =  this.todoList.find((item) => item.key == key);
       todoItem.todo = data.todo;
       todoItem.todoDate = data.todoDate;
    }
    @computed get List(){
        return this.todoList;
    }

}
export default TodoStore;