import React, { useState } from 'react';

import { SearchBar, SearchButton } from './styles';

type SearchProps = {
  handleSearch: (searchValue: string) => void;
};

export const Search = ({ handleSearch }: SearchProps) => {
  const [inputValue, setInputValue] = useState<string>('');

  return (
    <div>
      <SearchBar value={inputValue} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)} />
      <SearchButton onClick={() => handleSearch(inputValue)}>Search</SearchButton>
    </div>
  )
}
