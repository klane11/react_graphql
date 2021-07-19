import styled from 'styled-components';

const ButtonStyles = styled.button<ButtonProps>`
  background-color: ${props => props.primary ? '#fe27b5' : 'white'};
  border: 1px solid #fe27b5;
  border-radius: 3px;
  color: ${props => props.primary ? 'white' : '#fe27b5'};
  box-shadow: 2px 3px 3px rgba(0, 0, 0, .2);
  padding: .75em 2em;
  text-transform: uppercase;
  font-weight: bold;

  ${props => props.disabled && `{
    background-color: gray;
    border: 1px solid gray;
  }`}

  &:hover {
    cursor: pointer;
  }

  &:active {
    box-shadow: none;
  }
`;

type ButtonProps = {
  primary?: boolean;
  title?: string;
  disabled?: boolean;
  onClick: () => void;
} & React.HTMLProps<HTMLButtonElement>;

export const Button = ({ onClick, primary = true, title = 'Save', disabled = false }: ButtonProps) =>
  <ButtonStyles onClick={onClick} primary={primary} disabled={disabled}>{title}</ButtonStyles>;

