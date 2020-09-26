import { configure, action, observable, runInAction, decorate } from 'mobx';

configure({ enforceActions: "observed" });  // don't allow state modifications outside actions

class UserStore {
    users = {};
    environ =  process.env.NODE_ENV === "production" ? "/projects/ReportSpecification/public" : "";

    loadAllUsers = async () => {
        axios.get(`${this.environ}/api/users`).then(response => {
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
