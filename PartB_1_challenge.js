const ProcessArray = require('./PartB_1');

module.exports = class ProcessString {

  sumDeepString(node, keyword){
    const processArray = new ProcessArray();
    let result = 0;
    for(let i = 0;i<keyword.length;i++){
      result += processArray.sum_deep(node, keyword[i]) * (i+1);
    }
    return result;
  }

};
