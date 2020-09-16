import { configure, action, observable, runInAction, decorate } from 'mobx';

configure({ enforceActions: "observed" });  // don't allow state modifications outside actions

class StudyStore {
    studies = {};

    loadAllStudies = async () => {
        axios.get("http://127.0.0.1:8000/api/studies").then(response => {
            runInAction(() =>{
                this.studies = response.data;
            });
        }).catch(error => {
            console.log(error)
        });
    }
};

decorate(StudyStore, {
    studies: observable,
});

export default new StudyStore();

