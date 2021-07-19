import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 200px auto;
  overflow: hidden;
  min-height: 100vh;
  height: 100%;
`;

export const MainContainer = styled.div`
  height: 100%;
  overflow: hidden;
`;


export const NavigationContainer = styled.div`
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
  selected: boolean;
}

const NavItem = css`
  color: white;
  text-decoration: none;
  border-bottom: 1px solid white;
  width: 100%;
  padding: 1em;
`;

export const NavigationItemContainer = styled(NavLink) <NavigationItemContainerProps>`
  ${NavItem}
  &:hover {
    background-color: rgba(250, 250, 250, 30%);
  }

  ${props => props.selected && `
    background-color: rgba(250, 250, 250, 30%);
  `}
`;

export const SubNavigationItemContainer = styled.div<NavigationItemContainerProps>`
  ${NavItem}
  padding-left: 3em;
  ${props => props.selected && `
    background-color: rgba(250, 250, 250, 30%);
  `}
`;
