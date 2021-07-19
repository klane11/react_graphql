import { mount } from 'enzyme';
import { MockedProvider } from '@apollo/client/testing';

import App from './App';

test('renders App', () => {
  const wrapper = mount(<MockedProvider><App /></MockedProvider>);
  expect(wrapper.find(App).exists()).toBe(true);
});
