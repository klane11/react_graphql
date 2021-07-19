import { Container, Info, Thumbnail } from "./styles";
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
      <Info>
        <div>{name.title} {name.first} {name.last}</div>
        <div>{email}</div>
      </Info>
    </Container>
  )
};
