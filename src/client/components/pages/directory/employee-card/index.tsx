import { Container, Info, InfoContainer, Thumbnail } from "./styles";
import { Employee } from "../../../utils/types";

interface EmployeeCardProps {
  employee: Employee;
  onClick: (id: string) => void;
};

export const EmployeeCard = ({ employee, onClick }: EmployeeCardProps) => {
  const { name, email, picture, id } = employee;

  return (
    <Container onClick={() => onClick(id)}>
      <Thumbnail src={picture.thumbnail} />
      <InfoContainer>
        <Info>{name.title} {name.first} {name.last}</Info>
        <Info>{email}</Info>
      </InfoContainer>
    </Container>
  )
};
