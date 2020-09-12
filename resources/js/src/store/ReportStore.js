import React from 'react';
import { configure, action, observable, runInAction, decorate } from 'mobx';

configure({ enforceActions: "observed" });  // don't allow state modifications outside actions


class ReportStore {
    reports = {};

    loadAllReports = async () => {
        axios.get("http://127.0.0.1:8000/api/reports").then(response => {
            runInAction(() => {
                this.reports = response.data
            });
        })
            .catch(err => {
                console.log(err);
            });
    }



}

decorate(ReportStore, {
    reports: observable
});

export default new ReportStore();
