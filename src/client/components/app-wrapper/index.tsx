
import { matchPath, useLocation } from 'react-router-dom';

import { Container, MainContainer, NavigationContainer, LogoContainer, Logo, NavigationItemContainer } from "./styles";
import FullLogo from '../../assets/full_logo.png';


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
  const { pathname } = useLocation();
  const isActive = (path: string) => !!matchPath(pathname, path);

  return (
    <NavigationContainer>
      <LogoContainer>
        <Logo src={FullLogo} />
      </LogoContainer>
      <NavigationItem name='Directory' path='/' isActive={isActive('/')} />
      <NavigationItem name='Edit Employee' path='/edit-employee' isActive={isActive('/edit-employee')} />
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
