import React from 'react';
import { configure, action, observable, runInAction, decorate } from 'mobx';

configure({ enforceActions: "observed" });  // don't allow state modifications outside actions


class ReportStore {
    reports = {};
    report = {};
    reportSuccess = false

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

    loadOneReport = async (id) => {
        axios.get(`http://127.0.0.1:8000/api/reports/${id}`).then(response => {
            // console.log(response.data);
            runInAction(() => {
                this.report = response.data
            });
        })
            .catch(err => {
                console.log(err);
            });
    }

    updateReportStatus = async (id, status) => {
        axios.put(`http://127.0.0.1:8000/api/reports/${id}/${status}`).then(response => {
            runInAction(() => {
                this.report = response.data
                this.reportSuccess = true
            });
        })
            .catch(err => {
                console.log(err);
            });
    }



}

decorate(ReportStore, {
    reports: observable,
    report: observable,
    reportSuccess: observable,
});

export default new ReportStore();
