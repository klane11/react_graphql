import styled from 'styled-components';

export const Container = styled.div`
  padding-left: 1em;
  padding-bottom: 2em;
`;

export const SearchBar = styled.input`
  width: 30%;
  margin-right: 1em;
  padding: .75em 2em;
`;

export const ShowAllContainer = styled.div`
  height: 30px;
`;

export const ShowAll = styled.div`
  font-size: 13px;
  padding-bottom: 1em;
  text-transform: uppercase;

  &:hover {
    color: #fe27b5;
    cursor: pointer;
  }
`;
