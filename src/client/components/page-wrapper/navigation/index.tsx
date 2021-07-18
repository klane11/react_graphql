import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';

import FullLogo from '../../../assets/full_logo.png';

const Container = styled.div`
  background-color: #333333;
  display: grid;
  column-gap: 1em;
  grid-template-rows: 100px;
  align-content: start;
`;

const LogoContainer = styled.div`
  padding: 1em;
`;

const Logo = styled.img`
  width: 100%;
`;

type NavigationItemContainerProps = {
  isActive: boolean;
}

const NavigationItemContainer = styled(Link) <NavigationItemContainerProps>`
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

type NavigationItemProps = {
  name: string;
  path: string;
  isActive: boolean;
};

const NavigationItem = ({ name, path, isActive }: NavigationItemProps) => (
  <NavigationItemContainer to={path} isActive={isActive}>
    {name}
  </NavigationItemContainer>
)

export const Navigation = () => {
  const history = useHistory();
  const isActive = (path: string) => history.location.pathname === path;

  return (
    <Container>
      <LogoContainer>
        <Logo src={FullLogo} />
      </LogoContainer>
      <NavigationItem name='Directory' path='/directory' isActive={isActive('/directory')} />
      <NavigationItem name='Edit Employee' path='/edit' isActive={isActive('/edit')} />
    </Container>
  )
}
