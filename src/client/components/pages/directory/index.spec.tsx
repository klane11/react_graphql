import { mount } from 'enzyme';
import { MockedProvider } from '@apollo/client/testing';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import wait from 'waait';
import { ThemeProvider } from "styled-components";

import { Directory } from '.';
import { EmployeeCard } from './employee-card';
import { Search } from './search';
import { Container } from './styles';
import { GET_EMPLOYEES } from '.';
import { Button } from '../../common/button';
import { SearchBar } from './search/styles';
import { theme } from '../../../theme';

const createEmployee = (id: string) => ({
  id,
  name: {
    first: `Test${id}`,
    last: 'Mock',
    title: 'TM'
  },
  email: 'test.mock@example.com',
  picture: {
    thumbnail: 'testurl.com/image.png',
  }
});

const employees = [createEmployee('1'), createEmployee('2')];

const mocks = [
  {
    request: {
      query: GET_EMPLOYEES,
    },
    result: {
      data: {
        people: employees,
      },
    },
  },
];


const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('Directory', () => {
  const mountComponent = () =>
    mount(
      <MockedProvider mocks={mocks}>
        <MemoryRouter>
          <ThemeProvider theme={theme}>
            <Directory />
          </ThemeProvider>
        </MemoryRouter>
      </MockedProvider>
    );

  const updateComponent = async () => {
    await act(async () => {
      await wait(0);
    })
  }

  it('should render', () => {
    const wrapper = mountComponent();
    expect(wrapper.find(Directory).exists()).toBe(true);
  });

  it('should show all employees', async () => {
    const wrapper = mountComponent();

    expect(wrapper.find(Container).exists()).toBe(true);
    expect(wrapper.find(Search).exists()).toBe(true);
    expect(wrapper.find(EmployeeCard).exists()).toBe(false);
    expect(wrapper.find('div').findWhere(x => x.text() === 'Loading...').exists()).toBe(true);
    await updateComponent();
    wrapper.update();

    expect(wrapper.find(EmployeeCard).exists()).toBe(true);
    expect(wrapper.find(EmployeeCard).length).toEqual(2);
  });

  it('should show searched employee only', async () => {
    const wrapper = mountComponent();
    await updateComponent();
    wrapper.update();

    expect(wrapper.find(EmployeeCard).length).toEqual(2);

    wrapper.find(SearchBar).simulate('change', { target: { value: employees[0].name.first } });
    wrapper.update();

    wrapper.find(Button).simulate('click');
    wrapper.update();

    expect(wrapper.find(EmployeeCard).length).toEqual(1);
    expect(wrapper.find(EmployeeCard).prop('employee')).toEqual(employees[0]);
  });

  it('should call history.push when clicking on employee card', async () => {
    const wrapper = mountComponent();
    await updateComponent();
    wrapper.update();

    wrapper.find(EmployeeCard).at(0).simulate('click');
    expect(mockHistoryPush).toHaveBeenCalledWith(`/edit-employee?id=${employees[0].id}`);
  });
});
