import React, { useState } from 'react';

import { ShowAllContainer, ShowAll, Container, SearchBar } from './styles';
import { Button } from '../../../common/button';

type SearchProps = {
  handleSearch: (searchValue: string) => void;
  handleClearSearch: () => void;
};

export const Search = ({ handleSearch, handleClearSearch }: SearchProps) => {
  const [inputValue, setInputValue] = useState<string>('');

  return (
    <Container>
      <ShowAllContainer>
        {inputValue.length > 0 &&
          <ShowAll
            onClick={() => {
              setInputValue('');
              handleClearSearch()
            }}
          >
            Show all employees
          </ShowAll>
        }
      </ShowAllContainer>
      <SearchBar
        value={inputValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
        placeholder='Search first and/or last name'
      />
      <Button
        type='button'
        onClick={() => handleSearch(inputValue)}
        title='Search'
        disabled={inputValue.length < 1}
      />
    </Container>
  )
}
