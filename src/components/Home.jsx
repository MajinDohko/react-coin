// Este componente mostrará la lista de las principales criptomonedas del mercado.
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Home (){
    const [cryptos, setCryptos] = useState([])

    const getCrypto = async () => {
      try{
        const response = await axios.get(`https://api.coincap.io/v2/assets/`);
        const data = response.data
        setCryptos(data.data)
      }catch (error) {
          console.error(error)
      }  
    };
    useEffect(() => {
      getCrypto()
    }, [])
    return(
      <div>
        <h1>Lista de criptomonedas</h1>
        <ul>
          {cryptos.map((crypto) => 
            <li key={crypto.id}>
              <Link to={`/coin/${crypto.id}`}>{crypto.name}</Link>
            </li>
          )}
        </ul>
      </div>
     )
    }



export default Home;