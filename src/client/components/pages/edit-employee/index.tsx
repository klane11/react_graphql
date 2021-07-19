import { useEffect, useState } from 'react';
import { gql, useLazyQuery, useMutation } from '@apollo/client';
import { useLocation } from 'react-router-dom';

import { ButtonContainer, Container, DataToShow, EmployeeStaticInfo, FormContainer, ProfileImage } from './styles';
import { EmployeeData } from '../../utils/types';
import { Input } from '../../common/input';
import { Button } from '../../common/button';

type EmployeeVars = {
  id: string;
};

type FormValues = {
  firstName: string;
  lastName: string;
  title: string;
  email: string;
  id: string;
};

export const GET_EMPLOYEE = gql`
  query GetEmployee($id: ID!) {
    person(id: $id) {
      id
      name {
        title
        first
        last
      }
      email
      picture {
        thumbnail
        large
        medium
      }
    }
  }
`;

const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee($id: ID!, $payload: EditPerson!) {
    editPerson(id: $id, payload: $payload) {
      id
      name {
        title
        first
        last
      }
      email
    }
  }
`;

export const EditEmployee = () => {
  const location = useLocation();

  const [getEmployee, { loading, error, data }] = useLazyQuery<EmployeeData, EmployeeVars>(GET_EMPLOYEE);
  const [editEmployee, { loading: saveLoad }] = useMutation(UPDATE_EMPLOYEE);
  const [formValues, setFormValues] = useState<FormValues | null>();

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(location.search);
    const myParam = urlSearchParams.get('id');
    if (myParam) {
      getEmployee({ variables: { id: myParam } });
    }
  }, []);

  useEffect(() => {
    if (data) {
      const { person } = data;
      setFormValues({
        firstName: person.name.first,
        lastName: person.name.last,
        title: person.name.title,
        email: person.email,
        id: person.id,
      });
    }
  }, [data]);

  const handleFormChange = (key: string, value: string) => {
    if (formValues) {
      console.log(value)
      setFormValues({
        ...formValues,
        [key]: value,
      });
    }
  };

  const handleSave = () => {
    if (formValues) {
      editEmployee({
        variables: {
          id: formValues.id,
          payload: {
            title: formValues.title,
            first: formValues.firstName,
            last: formValues.lastName,
            email: formValues.email,
          }
        }
      });
    }
  };

  return (
    <Container>
      {loading && <div>Loading....</div>}
      {error && <div>Error: {error}</div>}
      {data &&
        <DataToShow>
          <ProfileImage src={data.person.picture.large} />
          <EmployeeStaticInfo>
            {data.person.name.title}{data.person.name.title && '.'} {data.person.name.first} {data.person.name.last}
          </EmployeeStaticInfo>
          <EmployeeStaticInfo>{data.person.email}</EmployeeStaticInfo>
        </DataToShow>
      }

      {formValues &&
        <form onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}>
          <FormContainer >
            <Input
              type='text'
              label='First Name'
              value={formValues.firstName}
              onChange={(value) => handleFormChange('firstName', value)}
            />
            <Input
              type='text'
              label='Last Name'
              value={formValues.lastName}
              onChange={(value) => handleFormChange('lastName', value)}
            />
            <Input
              type='text'
              label='Title'
              value={formValues.title}
              onChange={(value) => handleFormChange('title', value)}
            />
            <Input
              type='text'
              label='Email'
              value={formValues.email}
              onChange={(value) => handleFormChange('email', value)}
            />
          </FormContainer>
          <ButtonContainer>
            <Button type='submit' width='175px' saving={saveLoad}>Save</Button>
          </ButtonContainer>
        </form>
      }
    </Container>
  );
};
