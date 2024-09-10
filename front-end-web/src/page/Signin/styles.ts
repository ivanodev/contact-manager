import styled from "styled-components";

export const SignInContainer = styled.form`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 3;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #EDF2F4;

  @media (max-width: 768px) {
    padding: 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem;
  }
`;

export const SigninContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
  background-color: white;
  border-radius: 0.8rem;
  box-shadow: 0px 0.4rem 0.6rem rgba(0, 0, 0, 0.1);
  width: 20rem;

  label {
    font-size: 1.2rem;
    font-weight: bold;
    text-align: center;
    width: 100%;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
  }

  input {
    padding: 1rem;
    border: 0.1rem solid #ccc;
    border-radius: 0.4rem;
  }

  @media (max-width: 768px) {
    width: 18rem;
    padding: 1.5rem;

    label {
      font-size: 1.1rem;
    }

    input {
      padding: 0.8rem;
    }
  }

  @media (max-width: 480px) {
    width: 16rem;
    padding: 1rem;

    label {
      font-size: 1rem;
    }

    input {
      padding: 0.6rem;
    }
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 1rem;

  @media (max-width: 480px) {
    flex-direction: column;
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
    width: 100%;
    padding: 0.6rem 1rem;
  }
`;