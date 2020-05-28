import {shallow} from 'enzyme';
import {decorateUrl, parseUrls} from '../utils';

describe('decorateUrl', () => {
  it('should find youtube urls', () => {
    const possibilities = [
      'http://www.youtube.com/watch?v=AAABBBCCCDD&feature=feedrec_grec_index',
      'http://www.youtube.com/v/AAABBBCCCDD?fs=1&amp;hl=en_US&amp;rel=0',
      'http://www.youtube.com/watch?v=AAABBBCCCDD#t=0m10s',
      'http://www.youtube.com/embed/AAABBBCCCDD?rel=0',
      'http://www.youtube.com/watch?v=AAABBBCCCDD',
      'http://youtu.be/AAABBBCCCDD'
    ];

    possibilities.forEach((p) => {
      const component = decorateUrl(p);
      expect(component.type).toEqual('iframe');
      expect(component.props.src).toEqual('https://www.youtube.com/embed/AAABBBCCCDD');
    });
  });

  it('should find image urls', () => {
    const possibilities = [
      'http://test.com/img.png',
      'http://test.com/img.jpg',
      'http://test.com/img.jpeg',
      'http://test.com/img.gif',
      'http://test.com/img.tiff'
    ];

    possibilities.forEach((p) => {
      const component = decorateUrl(p);
      expect(component.type).toEqual('a');
      expect(component.props.children.type).toEqual('img');
      expect(component.props.href).toEqual(p);
    });
  });

  it('should find regular urls', () => {
    const possibilities = [
      'http://test.com/no-an-image',
      'http://www.test.com/no-an-image',
      'http://sub.test.com/with-sub-domain',
      'http://test.com/with/path',
      'http://test.com/with/path?and=variable',
      'https://test.com/and-https'
    ];

    possibilities.forEach((p) => {
      const component = decorateUrl(p);
      expect(component.type).toEqual('a');
      expect(component.props.href).toEqual(p);
      expect(component.props.children).toEqual(p);
    });
  });
});

describe('parseUrls', () => {
  it('should not split on text', () => {
    const component = shallow(parseUrls('Foo Bar Baz'));
    expect(component.props().children.length).toEqual(1);
  });

  it('should split on urls', () => {
    const component = shallow(parseUrls('Foo http://www.google.fr Bar http://test.com Baz'));
    expect(component.props().children.length).toEqual(5);
    expect(component.props().children[0].props.text).toEqual('Foo ');
    expect(component.props().children[1].type).toEqual('a');
    expect(component.props().children[2].props.text).toEqual(' Bar ');
    expect(component.props().children[3].type).toEqual('a');
    expect(component.props().children[4].props.text).toEqual(' Baz');
  });
});
