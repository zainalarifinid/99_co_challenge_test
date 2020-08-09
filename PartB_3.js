
module.exports = class Combination {

  getMaxValue(listCombination, lengthCombination){
    let maxCombination = Object.assign([], listCombination);
    let indexToRemove = null;
    let resultMaxValue = 0;

    for(let i = lengthCombination - 1;i >= 0;i--){
      if(indexToRemove !== null) maxCombination.splice(indexToRemove, 1);
      let maxValue = 0;
      let gradeValue = 0;
      for(let j = 0; j<maxCombination.length; j++){
        const comparedGrade = i-(String(maxCombination[j]).length-1);
        const comparedValue = maxCombination[j] * Math.pow(10, comparedGrade);
        if(comparedValue >= maxValue && comparedGrade >= gradeValue ){
          gradeValue = comparedGrade;
          maxValue = comparedValue;
          indexToRemove = j;
        }
      }
      resultMaxValue += maxValue;
      i -= String(maxCombination[indexToRemove]).length-1;
    }
    return resultMaxValue;
  }

  getMinValue(listCombination, lengthCombination, resultMaxValue){
    let indexToRemove = null;
    let minCombination = Object.assign([], listCombination);
    let resultMinValue = 0;
    for(let i = lengthCombination - 1;i >= 0;i--){
      if(indexToRemove !== null) minCombination.splice(indexToRemove, 1);
      let minValue = resultMaxValue;
      let gradeValue = String(resultMaxValue).length;
      for(let j = 0; j<minCombination.length; j++){
        const comparedGrade = i-(String(minCombination[j]).length-1);
        const comparedValue = minCombination[j] * Math.pow(10, comparedGrade);
        if(comparedValue <= minValue ){
          if(comparedValue === minValue) {
            if(comparedGrade <= gradeValue){
              gradeValue = comparedGrade;
              minValue = comparedValue;
              indexToRemove = j;  
            }
          }else{
            gradeValue = comparedGrade;
            minValue = comparedValue;
            indexToRemove = j;
          }
        }
      }
      resultMinValue += minValue;
      i -= String(minCombination[indexToRemove]).length-1;
    }
    return resultMinValue;
  }
  
  longest(listCombination) {
    let exampleCombination = listCombination.join().replace(/,/ig, '');
    const resultMaxValue = this.getMaxValue(listCombination, exampleCombination.length);
    const resultMinValue = this.getMinValue(listCombination, exampleCombination.length, resultMaxValue);
    
    return resultMaxValue - resultMinValue;
  }

};
