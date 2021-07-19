import styled from 'styled-components';

export const Conatiner = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Field = styled.input`
  height: 30px;
`;

export const Label = styled.label`
  font-size: 13px;
`;

type InputProps = {
  label: string;
  onChange: (value: string) => void;
  value: string | undefined;
  type?: string;
  required?: boolean;
};

export const Input = ({ label, value, onChange, type, required }: InputProps) => {
  return (
    <Conatiner>
      <Label>
        {label}
      </Label>
      <Field
        id={`input-${label}`}
        name={label}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        type={type}
        required={required}
      />
    </Conatiner>
  )
}
