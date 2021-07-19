import { Container, Info, Thumbnail } from "./styles";
import { Employee } from "../../../utils/types";

interface EmployeeCardProps {
  employee: Employee;
};

export const EmployeeCard = ({ employee }: EmployeeCardProps) => {
  const { name, email, picture } = employee;

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
