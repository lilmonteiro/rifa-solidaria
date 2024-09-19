import React, { useState, useEffect } from "react";
import styled from "styled-components";

const App = () => {
  const numbers = Array.from({ length: 100 }, (_, i) => i + 1);
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [data, setData] = useState([]);

  const toggleNumber = (number) => {
    if (selectedNumbers.includes(number)) {
      setSelectedNumbers(selectedNumbers.filter((n) => n !== number));
    } else {
      setSelectedNumbers([...selectedNumbers, number]);
    }
  };
  // 
  const handleSend = () => {
    var numbers = selectedNumbers.toString();
    var urlHead = "https://api.whatsapp.com/send?phone=5511978222863&text=Ol%C3%A1!%20";
    var requestString = `Gostaria de comprar o(s) número(s) ${numbers} e concorrer a uma AirFryer!`;

    var fullURL = urlHead + encodeURI(requestString)
    window.open(fullURL, "_blank")
  }


  useEffect(() => {
    const fetchGoogleSheetData = async () => {
      const apiKey = 'AIzaSyDyPfMfQK5saHAsGQ7A6IiTsy3ecmsfyS8';
      const spreadsheetId = '1lE2ZpdCzqrQhYQ1v_iU6h0wqmpKRlbwOC3XoBbpitU4';
      const range = 'A1:B101'; // Update range as needed
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;

      try {
        const response = await fetch(url);
        const result = await response.json();
        setData(result.values); // result.values contains the data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    setInterval(() => {
      fetchGoogleSheetData();
    }, 300000);
    fetchGoogleSheetData();
  }, []);

  return (
    <Container>
      <Header>
        <Title>Concorra a uma AirFryer</Title>
        <Subtitle><span>por 15 reais</span></Subtitle>
      </Header>
      <PrizeContainer>
        <PrizeText>
          <p>Air Fryer MONDIAL</p>
          <p>Pix: (11) 97822-2863</p>
          <p>ITAU - Liandra Monteiro</p>
        </PrizeText>
        <ImagePlaceholder src="/airfriyer.png" />
      </PrizeContainer>
      <Grid>
        {data.map((row, i) => (
          i > 0 &&
          <NumberBox key={i}
            onClick={(e) => {
              e.preventDefault();
              toggleNumber(row[0]);
            }}
            isSelected={selectedNumbers.includes(row[0])}
            unavailable={row[1] === "unavailable"}>
            {row[0]}
          </NumberBox>
        ))}
      </Grid>

      <Button onClick={handleSend} isVisible={selectedNumbers.length === 0 ? false : true}>Pedir números</Button>
    </Container>
  );
};

export default App;

var laranja = "#ff914d"
var azulclaro = "#229abf"

const Header = styled.div`
  display: flex;
  align-items: end;
  padding:15px;
  gap: 15px;
`;

const Button = styled.div`
  width: 100vw;
  background-color: ${laranja};
  padding: 20px 20px;
  box-sizing: border-box;
  margin: auto;
  position: fixed;
  font-family: sans-serif;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 24px;
  text-align: center;
  color: white;
  bottom: ${props => props.isVisible ? '0%' : '-30%'};
  transition: bottom .5s ease;
`;

const Container = styled.div`
  box-sizing: border-box;
  width: 100vw;
  min-height: 100%;
  max-height: 1500px;
  max-width: 500px;
  display: flex;
  gap: 10px;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 12vh;
  background-color: white;

  @media screen and (min-width: 1000px){
    width: 400px;
    margin: 15px auto;
    border-radius: 15px;
  }
`;

const Title = styled.h1`
  color: #229abf;
  font-size: 2.2em;
  line-height: .8em;
  text-align: right;
  margin: 0;
  width: 65%;
  font-family: 'Sergio Trendy', sans-serif;

  span{
    color: ${laranja};
  }
`;

const Subtitle = styled(Title)`
  text-align: left;
  font-size: 1.5rem;
  width: 40%;
`;

const Grid = styled.div`
  padding: 0 15px;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 5px;
  align-items: center;
  justify-content: center;
`;

const NumberBox = styled.a`
  box-sizing: border-box;
  background-color: #e9ecef;
  color: #606060;
  padding: 10px 5%;
  text-align: center;
  border: 0px solid ${azulclaro};
  border-radius: 4px;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;

  ${props => props.isSelected && `
    background-color: ${azulclaro};
    border-radius:50px;
    color: #fff;
  `}
  ${props => props.unavailable && `
    background-color: ${laranja};
    color: #fff;
  `}

  &:hover {
    background-color: ${azulclaro};
    color: #fff;
  }
`;

const PrizeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${azulclaro};
  width: 100%;
  height: 120px;
  box-sizing: border-box;
`;

const PrizeText = styled.div`
  color: white;
  font-size: 14px;
  box-sizing: border-box;
  padding: 10px 20px;
  margin: 0;

  p{
    margin: 5px 0;
  }
`;

const PrizeTitle = styled.h3`
  font-size: 18px;
  box-sizing: border-box;
  color: white;
  margin: 0;
`;

const ImagePlaceholder = styled.div`
  width: 50%;
  height: 100%;
  background-size: cover;
  background-position: start;
  background-image: url('/airfriyer.png');
`;
