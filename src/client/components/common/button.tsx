import styled from 'styled-components';

const ButtonStyles = styled.button<ButtonProps>`
  background-color: ${props => props.primary ? props.theme.pink.primary : 'white'};
  border: 1px solid ${props => props.theme.pink.primary};
  border-radius: 3px;
  color: ${props => props.primary ? 'white' : props.theme.pink.primary};
  box-shadow: 2px 3px 3px rgba(0, 0, 0, .2);
  padding: .75em 2em;
  text-transform: uppercase;
  font-weight: bold;

  min-width: ${props => props.width ? props.width : '75px'};

  ${props => props.disabled && `{
    background-color: ${props.theme.gray.background};
    border: 1px solid ${props.theme.gray.border};
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
  onClick?: () => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ primary = true, title = 'Save', disabled = false, width, saving, onClick }: ButtonProps) =>
  <ButtonStyles
    primary={primary}
    disabled={disabled}
    width={width}
    onClick={onClick}
  >
    {saving ? 'Saving...' : title}
  </ButtonStyles>;

