import React, { useEffect, useState } from 'react';
import { gql, useLazyQuery } from '@apollo/client';

import { Container, Input, FormContainer } from './styles';
import { EmployeeData, Employee } from '../../utils/types';
import { useLocation } from 'react-router-dom';

type EmployeeVars = {
  id: string;
};

type FormValues = {
  firstName: string;
  lastName: string;
  title: string;
  email: string;
};

const GET_EMPLOYEE = gql`
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
      }
    }
  }
`;

export const EditEmployee = () => {
  const location = useLocation();
  const [getEmployee, { loading, error, data }] = useLazyQuery<EmployeeData, EmployeeVars>(GET_EMPLOYEE);
  const [formValues, setFormValues] = useState<FormValues | null>();

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(location.search);
    const myParam = urlSearchParams.get('id');
    // ensures that id param is number
    if (myParam && Number(myParam)) {
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
      });
    }
  }, [data]);
  console.log(data);

  const handleFormChange = (key: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (formValues) {
      setFormValues({
        ...formValues,
        [key]: e.target.value,
      });
    }
  };

  return (
    <Container>
      {data &&
        <FormContainer>
          <Input value={formValues?.firstName} onChange={(e) => handleFormChange('firstName', e)} />
          <Input value={formValues?.lastName} onChange={(e) => handleFormChange('lastName', e)} />
          <Input value={formValues?.title} onChange={(e) => handleFormChange('title', e)} />
          <Input value={formValues?.email} onChange={(e) => handleFormChange('email', e)} />
        </FormContainer>
      }
    </Container>
  );
};
