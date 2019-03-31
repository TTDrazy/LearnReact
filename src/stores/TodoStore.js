import { observable, computed, action } from "mobx";

class TodoStore {
    @observable todoList = [];
    @action
    Add({ todo, todoDate }) {
        this.todoList.push({ todo, todoDate });
    }
}
export default TodoStore;