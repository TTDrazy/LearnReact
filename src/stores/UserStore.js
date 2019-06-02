import { observable, computed, action, toJS } from "mobx";

class UserStore {
    @observable userInfo = [];

    @action
    SaveUserInfo({ name, password, tel }) {
        this.userInfo.push({ name, password, tel });
    }

    @computed get showUserInfo() {
        return toJS(this.userInfo);
    }
}
export default UserStore;
