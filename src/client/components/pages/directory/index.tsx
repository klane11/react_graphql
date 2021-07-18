import React, { useState } from 'react';
import { useLazyQuery, useQuery, gql } from '@apollo/client';

import { Container } from './styles';
import { Search } from './search';
import { EmployeeCard } from './employee-card';

interface EmployeeName {
  first: string;
  last: string;
  title: string;
};

interface EmployeePicture {
  thumbnail: string;
}

export interface Employee {
  id: number;
  name: EmployeeName;
  email: string;
  picture: EmployeePicture;
};

interface EmployeeData {
  people: ReadonlyArray<Employee>;
}
interface EmployeeVars {
  name: string;
};

const GET_EMPLOYEES = gql`
  query GetEmployees {
    people {
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

const GET_EMPLOYEE = gql`
  query GetEmployee($name: String!) {
    people(name: $name) {
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

export const Directory = () => {
  const { loading, error, data } = useQuery<EmployeeData, EmployeeVars>(GET_EMPLOYEES);
  const [searchEmployee, { loading: searchLoading, error: searchError, data: serachResult }] = useLazyQuery<Employee, EmployeeVars>(GET_EMPLOYEE);

  const handleSearch = (searchValue: string) => {
    searchEmployee({ variables: { name: searchValue } });
  };

  return (
    <Container>
      <Search handleSearch={handleSearch} />

      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {data &&
        data.people.map(employee =>
          <EmployeeCard
            employee={employee}
            key={`employee-card-${employee.name.first}-${employee.name.last}`}
          />)}
    </Container>
  )
}
