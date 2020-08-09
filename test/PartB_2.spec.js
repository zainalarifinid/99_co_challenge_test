

const Extractor = require('../PartB_2');

describe('Part B Number 2, should extract html string into json structured', () => {
  it('should return [{"root":"hello"}], if given value between tags', () => {
    const extractor = new Extractor();
    const stringHtml = '<i sc-root>Hello</i>';
    expect(extractor.get_scheme(stringHtml)).toMatchObject([{ "root":"Hello" }]);
  });

  it('should return [{"root": "Hello"}], if given value on props', () => {
    const extractor = new Extractor();
    const stringHtml = '<i sc-root="Hello"></i>';
    expect(extractor.get_scheme(stringHtml)).toMatchObject([{ "root":"Hello"}]);
  });

  it('should return [{"root": ""}], if given empty value on props', () => {
    const extractor = new Extractor();
    const stringHtml = '<i sc-root=""></i>';
    expect(extractor.get_scheme(stringHtml)).toMatchObject([{ "root":""}]);
  });

  it('should return [{"props": "", "alias"=""}], if given empty value on props', () => {
    const extractor = new Extractor();
    const stringHtml = '<i sc-props sc-alias="" ></i>';
    expect(extractor.get_scheme(stringHtml)).toMatchObject([{ "props": "", "alias": ""}]);
  });

  it('should return [{"props": "", "alias": "kore"}, [{"name":"zainal"}]], if given child on html structure', () => {
    const extractor = new Extractor();
    //
    const stringHtml = '<div sc-props sc-alias="kore" ><div sc-name="zainal" ></div></div>';
    expect(extractor.get_scheme(stringHtml)).toMatchObject([{ "props": "", "alias": "kore"}, [{"name":"zainal"}]]);
  });
  it.skip('should return [{"props": "", "alias": "", "type":"organization"}, [{"name":"Alice"}, [{"name": "Wonderland"}], [{"time": "night"}] ]], if given child on html structure', () => {
    const extractor = new Extractor();
    //
    const stringHtml = '<div sc-prop sc-alias="" sc-type="”Organization”"><div sc-name="Alice">Hello <i sc-place="Wonderland">World</i><i sc-time="night">Day</i></div></div>';
    expect(extractor.get_scheme(stringHtml)).toMatchObject([{"props": "", "alias": "", "type":"”Organization”"}, [{"name":"Alice"}, [{"name": "Wonderland"}], [{"time": "night"}] ]]);
  });
});
