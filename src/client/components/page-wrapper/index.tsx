import { Container, Navigation } from "./styles";

export const PageWrapper: React.FC = ({ children }) => (
  <Container>
    <Navigation />
    {children}
  </Container>
)
