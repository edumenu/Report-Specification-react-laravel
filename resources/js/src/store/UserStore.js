import { configure, action, observable, runInAction, decorate } from 'mobx';

configure({ enforceActions: "observed" });  // don't allow state modifications outside actions

class UserStore {
    users = {};

    loadAllUsers = async () => {
        axios.get("http://127.0.0.1:8000/api/users").then(response => {
            runInAction(() => {
                this.users = response.data;
            });
        }).catch(error => {
            console.log(error)
        });
    }
};

decorate(UserStore, {
    users: observable,
});

export default new UserStore();
