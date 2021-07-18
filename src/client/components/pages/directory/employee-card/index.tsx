import { Employee } from "..";
import { Container, Info, Thumbnail } from "./styles";

interface EmployeeCardProps {
  employee: Employee;
};

export const EmployeeCard = ({ employee }: EmployeeCardProps) => {
  const { name, id, email, picture } = employee;

  return (
    <Container>
      <Thumbnail src={picture.thumbnail} />
      <Info>
        <div>{name.title} {name.first} {name.last}</div>
        <div>{email}</div>
      </Info>
    </Container>
  )
};
