
import { matchPath, useLocation } from 'react-router-dom';

import { Container, MainContainer, NavigationContainer, SubNavigationItemContainer, LogoContainer, Logo, NavigationItemContainer } from "./styles";
import FullLogo from '../../assets/full_logo.png';


type NavigationItemProps = {
  name: string;
  path: string;
  isSelected: boolean;
};

const NavigationItem = ({ name, path, isSelected }: NavigationItemProps) => (
  <NavigationItemContainer to={path} selected={isSelected}>
    {name}
  </NavigationItemContainer>
);

type SubNavigationProps = {
  name: string;
  isSelected: boolean;
};

const SubNavigation = ({ name, isSelected }: SubNavigationProps) => (
  <SubNavigationItemContainer selected={isSelected}>
    {name}
  </SubNavigationItemContainer>
);

export const Navigation = () => {
  const { pathname } = useLocation();
  const isSelected = (path: string) => !!matchPath(pathname, path);

  return (
    <NavigationContainer>
      <LogoContainer>
        <Logo src={FullLogo} />
      </LogoContainer>
      <NavigationItem name='Directory' path='/directory' isSelected={isSelected('/directory')} />
      <SubNavigation name='Edit Employee' isSelected={isSelected('/edit-employee')} />
    </NavigationContainer>
  )
}

export const AppWrapper: React.FC = ({ children }) => (
  <Container>
    <Navigation />
    <MainContainer>
      {children}
    </MainContainer>
  </Container>
)
