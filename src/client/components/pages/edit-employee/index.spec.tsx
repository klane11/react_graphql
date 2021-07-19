import { mount } from 'enzyme';
import { MockedProvider } from '@apollo/client/testing';
import { act } from 'react-dom/test-utils';
import wait from 'waait';

import { EditEmployee, GET_EMPLOYEE } from '.';
import { ButtonContainer, Container, DataToShow, EmployeeStaticInfo, FormContainer, ProfileImage } from './styles';



const employee = {
  id: 1,
  name: {
    first: `Test`,
    last: 'Mock',
    title: 'TM'
  },
  email: 'test.mock@example.com',
  picture: {
    thumbnail: 'testurl.com/image.png',
  }
}

const mocks = [
  {
    request: {
      query: GET_EMPLOYEE,
    },
    result: {
      data: {
        person: employee,
      },
    },
  },
];

describe('Edit Employee', () => {
  const mountComponent = () =>
    mount(
      <MockedProvider mocks={mocks}>
        <EditEmployee />
      </MockedProvider>
    );

  const updateComponent = async () => {
    await act(async () => {
      await wait(0);
    })
  }

  it('should render', () => {
    const wrapper = mountComponent();
    expect(wrapper.find(EditEmployee).exists()).toBe(true);
  });
});
