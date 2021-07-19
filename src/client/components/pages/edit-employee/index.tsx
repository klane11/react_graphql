import { useEffect, useState } from 'react';
import { gql, useLazyQuery, useMutation } from '@apollo/client';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ButtonContainer, Container, DataToShow, EmployeeStaticInfo, FormContainer, ProfileImage } from './styles';
import { EmployeeData } from '../../utils/types';
import { Input } from '../../common/input';
import { Button } from '../../common/button';
import { Toasty } from '../../common/toaster';

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

export const UPDATE_EMPLOYEE = gql`
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
  const [updateEmployee, { loading: saveLoad }] = useMutation(UPDATE_EMPLOYEE);
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
      setFormValues({
        ...formValues,
        [key]: value,
      });
    }
  };

  const handleSave = async () => {
    if (formValues) {
      await updateEmployee({
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
      toast.dark('🦄 Employee Information Updated!', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <Container>
      {loading && <div>Loading....</div>}
      {error && <div>Error: {error.message}</div>}
      {/* shows original data for user */}
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
              required
              label='First Name'
              value={formValues.firstName}
              onChange={(value) => handleFormChange('firstName', value)}
            />
            <Input
              type='text'
              required
              label='Last Name'
              value={formValues.lastName}
              onChange={(value) => handleFormChange('lastName', value)}
            />
            <Input
              type='text'
              required
              label='Title'
              value={formValues.title}
              onChange={(value) => handleFormChange('title', value)}
            />
            <Input
              type='text'
              required
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
      <Toasty />
    </Container>
  );
};
