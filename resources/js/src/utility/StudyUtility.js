export const indexCounter = (objArr, index, type) => {
    if (objArr.length == undefined) return 0;
    switch(type){
        case "reportsPerStudy":
            return objArr.filter(item => item.study_id === index).length;
        case "commentsPerReport":
            return objArr.filter(item => item.report_id === index).length;
        default:
            return 0;
    }
}
