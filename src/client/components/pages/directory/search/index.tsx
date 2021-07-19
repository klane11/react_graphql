import React, { useState } from 'react';

import { ClearResultsContainer, ClearResults, Container, SearchBar } from './styles';
import { Button } from '../../../common/button';

type SearchProps = {
  handleSearch: (searchValue: string) => void;
  handleClearSearch: () => void;
};

export const Search = ({ handleSearch, handleClearSearch }: SearchProps) => {
  const [inputValue, setInputValue] = useState<string>('');

  return (
    <Container>
      <ClearResultsContainer>
        {inputValue.length > 0 &&
          <ClearResults
            onClick={() => {
              setInputValue('');
              handleClearSearch()
            }}
          >
            Clear search results
          </ClearResults>
        }
      </ClearResultsContainer>
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
