import { mount, ReactWrapper } from 'enzyme';
import { MockedProvider } from '@apollo/client/testing';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import wait from 'waait';

import { EditEmployee, GET_EMPLOYEE, UPDATE_EMPLOYEE } from '.';
import { ButtonContainer, Container, DataToShow, EmployeeStaticInfo, FormContainer, ProfileImage } from './styles';
import { Employee } from '../../utils/types';
import { Input } from '../../common/input';
import { Button } from '../../common/button';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../theme';


const employee: Employee = {
  id: '1',
  name: {
    first: 'Test',
    last: 'Mock',
    title: 'TM'
  },
  email: 'test.mock@example.com',
  picture: {
    thumbnail: 'testurl.com/image.png',
    large: 'testurl.com/image-large.png',
    medium: 'testurl.com/image-medium.png',
  }
};

const editedEmployee: Employee = {
  ...employee,
  name: {
    ...employee.name,
    first: 'Jane',
  },
};

const mocks = [
  {
    request: {
      query: GET_EMPLOYEE,
      variables: { id: employee.id },
    },
    result: {
      data: {
        person: employee,
      },
    },
  },
  {
    request: {
      query: UPDATE_EMPLOYEE,
      variables: {
        id: employee.id,
        payload: {
          title: editedEmployee.name.title,
          first: editedEmployee.name.first,
          last: editedEmployee.name.last,
          email: editedEmployee.email,
        },
      },
    },
    result: {
      data: {
        editPerson: {
          id: editedEmployee.id,
          name: editedEmployee.name,
          email: editedEmployee.email,
        },
      },
    },
  },
];

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    search: '?id=1',
  }),
}));

describe('Edit Employee', () => {
  const mountComponent = () =>
    mount(
      <MockedProvider mocks={mocks}>
        <MemoryRouter initialEntries={[`/edit-employee?id=${employee.id}`]}>
          <ThemeProvider theme={theme}>
            <EditEmployee />
          </ThemeProvider>
        </MemoryRouter>
      </MockedProvider>
    );

  const updateComponent = async () => {
    await act(async () => {
      await wait(100);
    })
  };

  const findInput = (wrapper: ReactWrapper, label: string) => wrapper.find(Input).findWhere(x => x.prop('label') === label)


  it('should render', async () => {
    const wrapper = mountComponent();
    await updateComponent();
    expect(wrapper.find(EditEmployee).exists()).toBe(true);
  });

  it('should show employee info', async () => {
    const wrapper = mountComponent();
    await updateComponent();
    wrapper.update();

    expect(wrapper.find(ProfileImage).exists()).toBe(true);
    expect(wrapper.find(ProfileImage).prop('src')).toEqual(employee.picture.large);
    expect(wrapper.find(EmployeeStaticInfo).at(0).text()).toEqual(`${employee.name.title}. ${employee.name.first} ${employee.name.last}`);
    expect(wrapper.find(EmployeeStaticInfo).at(1).text()).toEqual(employee.email);
  });

  it('should show editable fields', async () => {
    const wrapper = mountComponent();
    await updateComponent();
    wrapper.update();

    expect(wrapper.find(FormContainer).exists()).toBe(true);
    expect(findInput(wrapper, 'First Name').exists()).toBe(true);
    expect(findInput(wrapper, 'First Name').prop('value')).toEqual(employee.name.first);

    expect(findInput(wrapper, 'Last Name').exists()).toBe(true);
    expect(findInput(wrapper, 'Last Name').prop('value')).toEqual(employee.name.last);

    expect(findInput(wrapper, 'Title').exists()).toBe(true);
    expect(findInput(wrapper, 'Title').prop('value')).toEqual(employee.name.title);

    expect(findInput(wrapper, 'Email').exists()).toBe(true);
    expect(findInput(wrapper, 'Email').prop('value')).toEqual(employee.email);

    expect(wrapper.find(ButtonContainer).exists()).toBe(true);
  });

  it('should edit employee details', async () => {
    const wrapper = mountComponent();
    await updateComponent();
    wrapper.update();

    findInput(wrapper, 'First Name').find('input').simulate('change', { target: { value: 'Jane' } });
    wrapper.update();

    wrapper.find(Button).simulate('click');
    await updateComponent();
    wrapper.update();

    expect(findInput(wrapper, 'First Name').find('input').prop('value')).toEqual('Jane');
  });
});
