import styled from 'styled-components';

export const Container = styled.div`
  padding-left: 1em;
  padding-bottom: 2em;
  border-bottom: 1px solid ${props => props.theme.gray.border};
`;

export const SearchBar = styled.input`
  width: 30%;
  margin-right: 1em;
  padding: .75em 2em;
`;

export const ClearResultsContainer = styled.div`
  height: 30px;
`;

export const ClearResults = styled.div`
  font-size: 13px;
  padding-bottom: 1em;
  text-transform: uppercase;

  &:hover {
    color: ${props => props.theme.pink.primary};
    cursor: pointer;
  }
`;
