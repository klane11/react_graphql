import { mount } from 'enzyme';
import { MockedProvider } from '@apollo/client/testing';

import { EmployeeCard } from '.';
import { Employee } from '../../../utils/types';
import { Container, Info, InfoContainer, Thumbnail } from "./styles";
import { GET_EMPLOYEES } from '..';

const mockEmployee: Employee = {
  id: '1',
  name: {
    first: 'Test',
    last: 'Mock',
    title: 'TM'
  },
  email: 'test.mock@example.com',
  picture: {
    thumbnail: 'testurl.com/image.png',
  }
};

const mocks = [
  {
    request: {
      query: GET_EMPLOYEES,
    },
    result: {
      data: {
        person: mockEmployee,
      },
    },
  },
];


const mockClick = jest.fn();
describe('Employee Card', () => {
  const mountComponent = () =>
    mount(
      <MockedProvider mocks={mocks}>
        <EmployeeCard employee={mockEmployee} onClick={mockClick} />
      </MockedProvider>
    );

  it('should render', () => {
    const wrapper = mountComponent();
    expect(wrapper.find(EmployeeCard).exists()).toBe(true);
  });

  it('should show employee info', () => {
    const wrapper = mountComponent();

    expect(wrapper.find(Container).exists()).toBe(true);
    expect(wrapper.find(InfoContainer).exists()).toBe(true);

    expect(wrapper.find(Info).exists()).toBe(true);
    expect(wrapper.find(Info).length).toEqual(2);
    expect(wrapper.find(Info).at(0).text()).toEqual(`${mockEmployee.name.title} ${mockEmployee.name.first} ${mockEmployee.name.last}`);
    expect(wrapper.find(Info).at(1).text()).toEqual(mockEmployee.email);

    expect(wrapper.find(Thumbnail).exists()).toBe(true);
    expect(wrapper.find(Thumbnail).prop('src')).toEqual(mockEmployee.picture.thumbnail);
  });

  it('should fire onClick event', () => {
    const wrapper = mountComponent();

    wrapper.find(Container).simulate('click');
    expect(mockClick).toHaveBeenCalledWith(mockEmployee.id);
  });
});
