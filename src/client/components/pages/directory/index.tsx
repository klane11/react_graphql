import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';

import { Container, EmployeeResultsContainer } from './styles';
import { Search } from './search';
import { EmployeeCard } from './employee-card';
import { AllEmployeeData, Employee, Loadable } from '../../utils/types';


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

export const Directory = () => {
  const { loading, error, data } = useQuery<AllEmployeeData>(GET_EMPLOYEES);
  const [searchResults, setSearchResults] = useState<Loadable<Employee[]>>({ tag: 'idle' });

  const handleSearch = (searchValue: string) => {
    console.log({ searchValue });
    setSearchResults({ tag: 'loading' });
    let employees: Employee[] | undefined = undefined;
    if (data) {
      // filters data to find all employees first and last name that match the search value
      employees = data.people.filter(x =>
        `${x.name.first.toLowerCase()} ${x.name.last.toLowerCase()}`.includes(searchValue.toLowerCase())
      );
    }

    if (employees && employees.length) {
      return setSearchResults({ tag: 'success', data: employees });
    }

    return setSearchResults({ tag: 'error', error: new Error('No results matching query') })
  };

  return (
    <Container>
      <Search handleSearch={handleSearch} handleClearSearch={() => setSearchResults({ tag: 'idle' })} />

      <EmployeeResultsContainer>
        {/* all employees */}
        {searchResults.tag === 'idle' &&
          <>
            {loading && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}
            {data &&
              data.people.map(employee =>
                <EmployeeCard
                  employee={employee}
                  key={`employee-card-${employee.name.first}-${employee.name.last}`}
                />)}
          </>
        }
        {/* search result(s) */}
        {searchResults.tag !== 'idle' &&
          <>
            {searchResults.tag === 'loading' && <div>Loading...</div>}
            {searchResults.tag === 'error' && <div>Cannot find any employees with that name. Please retry search.</div>}
            {searchResults.tag === 'success' &&
              searchResults.data.map(employee =>
                <EmployeeCard
                  employee={employee}
                  key={`employee-card-${employee.name.first}-${employee.name.last}`}
                />)}
          </>
        }
      </EmployeeResultsContainer>
    </Container>
  )
}
