import React, { useState } from 'react';

import { BackToAll, Container, SearchBar } from './styles';
import { Button } from '../../../common/button';

type SearchProps = {
  handleSearch: (searchValue: string) => void;
  handleClearSearch: () => void;
};

export const Search = ({ handleSearch, handleClearSearch }: SearchProps) => {
  const [inputValue, setInputValue] = useState<string>('');

  return (
    <Container>
      <BackToAll
        onClick={() => {
          setInputValue('');
          handleClearSearch()
        }}
      >
        Back to all employees
      </BackToAll>
      <SearchBar
        value={inputValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
        placeholder='Search first and/or last name'
      />
      <Button
        onClick={() => handleSearch(inputValue)}
        title='Search'
        disabled={inputValue.length < 1}
      />
    </Container>
  )
}
