import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  background-color: white;
  border-radius: 0.8rem;
  box-shadow: 0px 0.4rem 0.6rem rgba(0, 0, 0, 0.1);
  width: 30rem;
  margin: 2rem auto;

  @media (max-width: 768px) {
    width: 90%;
  }

  @media (max-width: 480px) {
    padding: 1rem;
    width: 95%;
  }
`;

export const Header = styled.div`
  margin-bottom: 2rem;
  text-align: center;

  h1 {
    font-size: 1.5rem;
    color: #2b2d42;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const FormField = styled.div`
  display: flex;
  flex-direction: column;

  label {
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }

  input {
    padding: 0.8rem;
    border: 0.1rem solid #ccc;
    border-radius: 0.4rem;
  }

  @media (max-width: 768px) {
    input {
      padding: 0.7rem;
    }
  }

  @media (max-width: 480px) {
    input {
      padding: 0.6rem;
    }
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;

  @media (max-width: 768px) {
    flex-direction: row;
    gap: 1rem;
  }

  @media (max-width: 480px) {
    gap: 0.5rem;
  }
`;

export const Button = styled.button<{ secondary?: boolean }>`
  padding: 1rem 2rem;
  font-size: 1.2rem;
  border-radius: 0.4rem;
  border: none;
  cursor: pointer;
  background-color: ${({ secondary }) => (secondary ? '#2B2D42' : '#007bff')};
  color: white;
  width: 48%;

  &:hover {
    background-color: ${({ secondary }) => (secondary ? '#1D1F33' : '#0056b3')};
  }

  @media (max-width: 768px) {
    font-size: 1.1rem;
    padding: 0.8rem 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    padding: 0.6rem 1rem;
  }
`;
