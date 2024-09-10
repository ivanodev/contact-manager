import { createGlobalStyle } from 'styled-components';

//import './fonts';

// import mouseScrollIcon from '../assets//image/rigth-slipper.svg';
import { keyframes } from 'styled-components';

interface GlobalStyle {
  percentSize?: number;
}

export const fadein = keyframes`
  from { opacity: 0.5; }
  to { opacity: 1; }
`;

export default createGlobalStyle<GlobalStyle>`

  :root {
    /* a cada 1rem será considerado dez pixels */
    font-size: '62.5%'; 
    font-family: 'Oswald Regular', sans-serif;  
  }

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  html, body, #root {
    height: 100vh;
  }

  body {
    background: #ffffff;
    -wedkit-font-smooth: antialiased;

    ::-webkit-scrollbar {
      width: 0.7rem;
    }

    ::-webkit-scrollbar-track {
      background: linear-gradient(180deg, #00F0FF 0%, #28A1F9 100%);
    }

    ::-webkit-scrollbar-thumb {
      background: linear-gradient(180deg, #0BE6F3 0%, #28A1F9 14.17%, #805AEF 51.56%, #28A1F9 86.54%, #0BE6F3 100%);
      border-radius: 1.0rem;
      border: none;
    }

    ::-webkit-scrollbar-thumb:hover {
      transition: all 0.3s;
      background: linear-gradient(180deg, #28A1F9 8.85%, #805AEF 51.56%, #28A1F9 93.23%);
    }

    ::-webkit-scrollbar-thumb:active {
      background: linear-gradient(180deg, #28A1F9 8.85%, #805AEF 51.56%, #28A1F9 93.23%);
    }
  }

  #root {
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
  }

  
  body, input, textarea {
    font-size: 1.0rem;
    font-family: 'Oswald Regular', sans-serif;
    font-weight: normal;
  }

  button {
    font-size: 1.0rem;
    font-family:'Oswald Regular', sans-serif;
    font-weight: normal;
  }

  img {
    user-select: none;
  }

  @media(max-width: 1790px) {
    :root {
      font-size: 58.3%;
    }
  }  

  @media(max-width: 1720px) {
    :root {
      font-size: 55.990%;
    }
  }  

  @media(max-width: 1605px) {
    :root {
      font-size: 52.246%;
    }
  }    

  @media(max-width: 1499px) {
    :root {
      font-size: 48.796%;
    }
  }  

  @media(max-width: 1400px) {
    :root {
      font-size: 45.573%;
    }
  }   

  @media(max-width: 1276px) {
    :root {
      font-size: 41.536%;
    }
  }   

  @media(max-width: 1192px) {
    :root {
      font-size: 38.802%;
    }
  }   

  @media(max-width: 1113px) {
    :root {
      font-size: 36.230%;
    }
  }  

  @media(max-width: 1040px) {
    :root {
      font-size: 33.854%;
    }
  }  

  @media(max-width: 970px) {
    :root {
      font-size: 31.576%;
    }
  }  

  @media(max-width: 907px) {
    :root {
      font-size: 29.525%;
    }
  }  

  @media(max-width: 848px) {
    :root {
      font-size: 27.604%;
    }
  } 

  @media(max-width: 792px) {
    :root {
      font-size: 25.781%;
    }
  } 

  @media(max-width: 767px) {
    :root {
      font-size: 50%;
    }
  } 
`;
