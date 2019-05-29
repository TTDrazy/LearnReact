import { observable, computed, action } from "mobx";

class UserStore {
    @observable userInfo = [];
    @action
    SaveUserInfo({name,password,tel}){
        this.userInfo.push({name,password,tel});
    }

    @computed get showUserInfo(){
        return this.userInfo;
    }
}
export default UserStore;