export const indexCounter = (objArr, index, type) => {
    if (objArr.length === undefined) return 0;
    switch(type){
        case "reportsPerStudy":
            return objArr.filter(item => item.study_id === index).length;
        case "commentsPerReportLength":
            return objArr.filter(item => item.report_id === index).length;
        case "oneReport":
            return objArr.filter(item => item.id === index);
        case "commentsPerReport":
            return objArr.filter(item => item.report_id === index);
        case "numberOfUsers":
            return objArr.filter(item => item.role === index).length;
        case "numberOfStatus":
            return objArr.filter(item => item.report_status === index).length;
        default:
            return 0;
    }
}
