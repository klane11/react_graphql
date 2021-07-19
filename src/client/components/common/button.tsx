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

  min-width: ${props => props.width ? props.width : '75px'};

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
  width?: string;
  saving?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ primary = true, title = 'Save', disabled = false, width, saving }: ButtonProps) =>
  <ButtonStyles
    primary={primary}
    disabled={disabled}
    width={width}
  >
    {saving ? 'Saving...' : title}
  </ButtonStyles>;

