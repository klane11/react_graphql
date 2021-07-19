import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  background-color: #333333;
  display: grid;
  column-gap: 1em;
  grid-template-rows: 100px;
  align-content: start;
`;

export const LogoContainer = styled.div`
  padding: 1em;
`;

export const Logo = styled.img`
  width: 100%;
`;

type NavigationItemContainerProps = {
  isActive: boolean;
}

export const NavigationItemContainer = styled(Link) <NavigationItemContainerProps>`
  color: white;
  text-decoration: none;
  border-bottom: 1px solid white;
  width: 100%;
  padding: 1em;

  &:hover {
    background-color: rgba(250, 250, 250, 30%);
  }

  ${props => props.isActive && `
    background-color: rgba(250, 250, 250, 30%);
  `}
`;
