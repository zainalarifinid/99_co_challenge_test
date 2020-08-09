
const TAG_OPEN_TYPE = [ '<div', '<b', '<i', '<u' ];
const TAG_CLOSE_TYPE = [ '</div>', '</b>', '</i>', '</u>' ];
const TAG_GENERAL_END = '>';

module.exports = class Extractor {

  extractor_tag(stringHtml, arrayTags, indexArrayTags = 0, indexCharacter = 0){

    for(let i = indexCharacter; i<stringHtml.length; i++) {
      if(TAG_OPEN_TYPE.includes(stringHtml.substr(i, 2)) || TAG_OPEN_TYPE.includes(stringHtml.substr(i, 4))){
        let indexCurrentTag = TAG_OPEN_TYPE.indexOf(stringHtml.substr(i, 2)) & TAG_OPEN_TYPE.indexOf(stringHtml.substr(i, 4));
        let currentTag = TAG_OPEN_TYPE[ indexCurrentTag ];
        if(typeof arrayTags[indexArrayTags] === 'undefined'){
          arrayTags[indexArrayTags] = {};
          arrayTags[indexArrayTags]['open'] = {};
          arrayTags[indexArrayTags]['close'] = {};
          arrayTags[indexArrayTags]['open']['start'] = i+currentTag.length;
        }else{
          arrayTags[indexArrayTags]['child'] = this.extractor_tag(stringHtml, [], 0, i);
          i = arrayTags[indexArrayTags]['child'][arrayTags[indexArrayTags]['child'].length-1].close.end;
        }
      }
  
      if(i>3 && stringHtml[i] === TAG_GENERAL_END && !TAG_CLOSE_TYPE.includes(stringHtml.substring(i-3, i+1))) {
        arrayTags[indexArrayTags]['open']['end'] = i;
      }
      if(TAG_CLOSE_TYPE.includes(stringHtml.substr(i, 4).trim()) || TAG_CLOSE_TYPE.includes(stringHtml.substr(i, 6).trim())){
        let indexCurrentTag = TAG_CLOSE_TYPE.indexOf(stringHtml.substr(i, 4)) & TAG_CLOSE_TYPE.indexOf(stringHtml.substr(i, 6));
        let currentTag = TAG_CLOSE_TYPE[ indexCurrentTag ];
        arrayTags[indexArrayTags]['close']['start'] = i;
        arrayTags[indexArrayTags]['close']['end'] = i+currentTag.length;
        return arrayTags;
      }
    }
    return arrayTags;
  }

  get_value(stringHtml, openStart, openEnd, closeStart) {
    let resultDestructure = {};

    if(stringHtml.substr(openStart, openEnd).includes('=')) {
      // TODO with props values
      const listOfProps = stringHtml.substring(openStart, openEnd).split(' ');

      for(let j = 0;j < listOfProps.length; j++) {
        if(listOfProps[j].length === 0) continue;
        const destructKeyValue = listOfProps[j].split('=');
        const key = destructKeyValue[0].replace('sc-','');
        const value = destructKeyValue[1] !== undefined ? destructKeyValue[1].replace(/"/ig, '') : ''
        resultDestructure[key] = value;
      }
    }else{
      const key = stringHtml.substring(openStart, openEnd).replace('sc-', '').trim();
      const value = stringHtml.substring(openEnd+1, closeStart);
      resultDestructure[key] = value;
    }
    return resultDestructure;
  }

  get_scheme(stringHtml) {
    let result = [];
    let arrayTags = [];

    arrayTags = this.extractor_tag(stringHtml, arrayTags);
    for(let i = 0;i < arrayTags.length; i++){
      
      result.push(this.get_value(stringHtml, arrayTags[i].open.start, arrayTags[i].open.end, arrayTags[i].close.start, arrayTags[i].close.end));

      if(typeof arrayTags[i]['child'] !== 'undefined') {
        const resultChild = [];
        for(let j =0; j< arrayTags[i]['child'].length;j++){
          resultChild.push(this.get_value(stringHtml, arrayTags[i]['child'][j].open.start, arrayTags[i]['child'][j].open.end, arrayTags[i]['child'][j].close.start, arrayTags[i]['child'][j].close.end));
        }
        
        result.push(Object.assign([], resultChild));
      }
      
    }
    return result;
  }
}
