import styled from 'styled-components';

export const Container = styled.div`
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;

    h1 {
      margin-bottom: 1rem;
    }

    button {
      margin-left: 0;
      width: 100%;
    }
  }
`;

export const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.4rem;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  margin-left: 0.5rem;
  text-align: center;
  width: 100px; 

  &:hover {
    background-color: #0056b3;
  }

  @media (max-width: 768px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
    width: 90px; 
  }

  @media (max-width: 480px) {
    width: 100%; 
    margin-left: 0;
    margin-top: 0.5rem;
    padding: 0.5rem;
  }
`;

export const LoadMoreButton = styled(Button)`
  margin-top: 2rem;

  @media (max-width: 768px) {
    width: 100%;
    margin-top: 1rem;
    padding: 0.5rem; 
  } 
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  @media (min-width: 769px) {
   
    thead {
      display: table-header-group; 
    }

    tbody {
      display: table-row-group;
    }

    th, td {
      padding: 0.8rem;
      border: 1px solid #ddd;
      text-align: left;
    }

    th {
      background-color: #f4f4f4;
    }
  }

  @media (max-width: 768px) {
 
    thead {
      display: none; 

    tbody {
      display: block;
      width: 100%;
    }

    tr {
      display: block;
      margin-bottom: 1rem;
      border: 1px solid #ddd;
      padding: 1rem;
    }

    td {
      display: block;
      width: 100%;
      position: relative;
      padding: 0.5rem 0;
      text-align: right;
    }

    td::before {
      content: ""; 
    }
  }

  @media (max-width: 480px) {
    
    th, td {
      padding: 0.4rem;
      font-size: 0.8rem;
    }

    tr {
      display: block;
      margin-bottom: 1rem;
      border: 1px solid #ddd;
      padding: 1rem;
    }

    td {
      display: block;
      width: 100%;
      margin-bottom: 0.5rem;
    }
  }
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;

    button {
      width: 100%;
      margin-bottom: 0.5rem;
    }
  }

  @media (max-width: 480px) {
    flex-direction: column;

    button {
      width: 100%;
      margin-bottom: 0.5rem;
    }
  }
`;