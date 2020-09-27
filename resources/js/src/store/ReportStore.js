import React from 'react';
import { configure, action, observable, runInAction, decorate } from 'mobx';

configure({ enforceActions: "observed" });  // don't allow state modifications outside actions


class ReportStore {
    reports = {};
    reportsByStudy = {};
    report = {};
    reportSuccess = false;
    environ =  process.env.NODE_ENV === "production" ? "/projects/ReportSpecification/public" : "";


    loadAllReports = async () => {
        axios.get(`/api/reports`).then(response => {
            runInAction(() => {
                this.reports = response.data
                this.reportsByStudy = response.data
            });
        })
            .catch(err => {
                console.log(err);
            });
    }

    loadOneReport = async (id) => {
        axios.get(`/api/report/${id}`).then(response => {
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
        axios.put(`/api/reports/${id}/${status}`).then(response => {
            runInAction(() => {
                this.report = response.data
                this.reportSuccess = true
            });
        })
            .catch(err => {
                console.log(err);
            });
    }

    loadReportByStudy = async (study) => {
        axios.get(`/api/reports/${study}`).then(response => {
            runInAction(() => {
                this.reportsByStudy = response.data
            });
        })
            .catch(err => {
                console.log(err);
            });
    }

    AddReport = async (study) => {
        axios.post(`/api/reports/${study}`).then(response => {
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
    reports: observable,
    report: observable,
    reportSuccess: observable,
});

export default new ReportStore();
