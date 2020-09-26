export const indexCounter = (objArr, index, type) => {
    if (objArr.length === undefined) return 0;
    switch(type){
        case "reportsPerStudy":
            const reportsPerStudy = objArr.filter(item => item.study_id === index);
            return reportsPerStudy.length;
        case "commentsPerReportLength":
            const commentsPerReportLength = objArr.filter(item => item.report_id === index);
            return commentsPerReportLength.length;
        case "oneReport":
            const oneReport = objArr.filter(item => item.id === index);
            return oneReport;
        case "commentsPerReport":
            const commentsPerReport = objArr.filter(item => item.report_id === index);
            return commentsPerReport;
        case "numberOfUsers":
            const numberOfUsers = objArr.filter(item => item.role === index);
            return numberOfUsers.length;
        case "numberOfStatus":
            const numberOfStatus = objArr.filter(item => item.report_status === index);
            return numberOfStatus.length;
        default:
            return 0;
    }
}
