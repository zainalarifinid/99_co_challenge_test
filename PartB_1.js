
module.exports = class ProcessArray {
  searchKeyword(node, keyword, currentLevel = 0) {
    currentLevel++;
    let sumLevel = 0;
    for(let i = 0; i < node.length; i++) {
      if(Array.isArray(node[i])) {
        sumLevel += this.searchKeyword(node[i], keyword, currentLevel);
      }else if(node[i].includes(keyword)) sumLevel += currentLevel;
    }
    return sumLevel;
  }

  sum_deep(node, keyword) {
    return this.searchKeyword(node, keyword);
  }
};
