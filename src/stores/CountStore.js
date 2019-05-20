import { observable,action,computed } from "mobx";

class CountStore  {
    @observable number = 0;

    @action Increase () {
        this.number ++;
    }

    @action Decrease () {
        this.number --;
    }

    @computed get ShowNumber(){
        return `现在的数字为：${this.number}`;
    }
}
export default CountStore;