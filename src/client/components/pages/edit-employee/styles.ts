import styled from 'styled-components';

export const Container = styled.div`
  padding: 4em;
  max-width: 900px;
  margin: 0 auto;
`;

export const FormContainer = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 2em;
  row-gap: 2em;
`;

export const ProfileImage = styled.img`
  border-radius: 100%;
  margin: 0 auto;
`;

export const DataToShow = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  align-content: center;
  row-gap: .5em;
  padding-bottom: 2em;
  margin-bottom: 2em;
  border-bottom: 1px solid #fe27b5;
`;

export const EmployeeStaticInfo = styled.div`
  text-align: center;
  padding-bottom: .5em;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 40px;
  padding-top: 2em;
`;
