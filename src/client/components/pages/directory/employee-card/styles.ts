import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  padding: 1em;
  border-bottom: 1px solid ${props => props.theme.gray.border};

  &:hover {
    background-color: rgba(50, 50, 50, .1);
    cursor: pointer;
  }
`;

export const InfoContainer = styled.div`
  display: grid;
  column-gap: 1em;
`;

export const Info = styled.div``;

export const Thumbnail = styled.img`
  border-radius: 100%;
  margin-right: 1em;
`;
