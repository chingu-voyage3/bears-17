import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FormatDate from 'Components/FormatDate';

Enzyme.configure({ adapter: new Adapter() });

const defaultFormat = {
  year: undefined,
  month: 'short',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: undefined,
};
const defaultLocales = 'en-GB';

describe('FormatDate', () => {
  it('should render a time element with dateTime attribute', () => {
    const formatDate = shallow(<FormatDate />);
    const time = formatDate.find('time');

    expect(time.length).toBe(1);
    expect(time.props().dateTime).toBeDefined();
  });

  it('should render a time element with the current date and time by default', () => {
    const formatDate = shallow(<FormatDate />);
    const time = formatDate.find('time');
    const expectedTime = new Date().toLocaleString(defaultLocales, defaultFormat);

    expect(time.props().dateTime).toBeDefined();
    expect(time.text()).toBe(expectedTime);
  });

  it('should render the correct time element if date prop is provided', () => {
    const date = '2017-12-14T22:43:56.069Z';
    const formatDate = shallow(<FormatDate date={date} />);
    const time = formatDate.find('time');
    const expectedTime = new Date(date).toLocaleString(defaultLocales, defaultFormat);

    expect(time.props().dateTime).toBe(date);
    expect(time.text()).toBe(expectedTime);
  });

  it('should render the correct time element if locale and format props are provided', () => {
    const format = {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };
    const locales = 'hu';
    const date = '2017-12-14T22:43:56.069Z';
    const formatDate = shallow(<FormatDate
      date={date}
      format={format}
      locales={locales}
    />);
    const time = formatDate.find('time');
    const expectedTime = new Date(date).toLocaleString(locales, format);

    expect(time.props().dateTime).toBe(date);
    expect(time.text()).toBe(expectedTime);
  });
});
