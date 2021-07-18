
import { Container, MainContainer } from "./styles";
import { Navigation } from "./navigation";

export const PageWrapper: React.FC = ({ children }) => (
  <Container>
    <Navigation />
    <MainContainer>
      {children}
    </MainContainer>
  </Container>
)
