import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import gql from 'graphql-tag';

import { Search } from './search';

const GET_EMPLOYEES = gql`
  query GetEmployees() {
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
    people() {
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
  const [getEmployees, { loading, error, data }] = useLazyQuery(GET_EMPLOYEES);
  const [searchEmployee, { loading: searchLoading, error: searchError, data: serachResult }] = useLazyQuery(GET_EMPLOYEE);

  const handleSearch = (searchValue: string) => {
    searchEmployee({ variables: { name: searchValue } });
  };

  return (
    <div>
      <Search handleSearch={handleSearch} />

      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {data && <></>}

    </div>
  )
}
