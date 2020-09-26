import { configure, action, observable, runInAction, decorate } from 'mobx';

configure({ enforceActions: "observed" });  // don't allow state modifications outside actions

class StudyStore {
    studies = {};
    environ =  process.env.NODE_ENV === "production" ? "/projects/ReportSpecification/public" : "";

    loadAllStudies = async () => {
        axios.get(`${this.environ}/api/studies`).then(response => {
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

