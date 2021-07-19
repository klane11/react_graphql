import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  padding: 1em;
  border-bottom: 1px solid gray;
  margin: 1em;

  &:hover {
    background-color: rgba(50, 50, 50, .1);
    cursor: pointer;
  }
`;

export const Info = styled.div`
  display: grid;
  column-gap: 1em;
`;

export const Thumbnail = styled.img`
  border-radius: 100%;
  margin-right: 1em;
`;
