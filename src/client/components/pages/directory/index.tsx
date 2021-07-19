import { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useHistory } from 'react-router-dom';

import { Container, EmployeeResultsContainer } from './styles';
import { Search } from './search';
import { EmployeeCard } from './employee-card';
import { AllEmployeeData, Employee, Loadable } from '../../utils/types';


export const GET_EMPLOYEES = gql`
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
  const history = useHistory();
  const { loading, error, data } = useQuery<AllEmployeeData>(GET_EMPLOYEES);
  const [searchResults, setSearchResults] = useState<Loadable<Employee[]>>({ tag: 'idle' });

  const handleSearch = (searchValue: string) => {
    setSearchResults({ tag: 'loading' });
    let employees: Employee[] = [];
    if (data) {
      // filters data to find all employees first and last name that match the search value
      employees = data.people.filter(x =>
        `${x.name.first.toLowerCase()} ${x.name.last.toLowerCase()}`.includes(searchValue.toLowerCase())
      );
    }

    if (employees.length) {
      return setSearchResults({ tag: 'success', data: employees });
    }

    return setSearchResults({ tag: 'error', error: new Error('No results matching query') })
  };

  const handleCardClick = (id: string) => {
    history.push(`/edit-employee?id=${id}`);
  };

  return (
    <Container>
      <Search handleSearch={handleSearch} handleClearSearch={() => setSearchResults({ tag: 'idle' })} />

      <EmployeeResultsContainer>
        {/* all employees */}
        {searchResults.tag === 'idle' &&
          <>
            {loading && <div>Loading...</div>}
            {error && <div>Error: {error.message}</div>}
            {data &&
              data.people.map(employee =>
                <EmployeeCard
                  onClick={handleCardClick}
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
                  onClick={handleCardClick}
                  employee={employee}
                  key={`employee-card-${employee.name.first}-${employee.name.last}`}
                />)}
          </>
        }
      </EmployeeResultsContainer>
    </Container>
  )
}
