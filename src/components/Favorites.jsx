import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const getFavorites = async () => {
      try {
        let favoritesCoin = JSON.parse(localStorage.getItem("favCoins")); // Usa el mismo nombre de clave
        console.log("favoritesCoin from localStorage:", favoritesCoin);

        if (!favoritesCoin || favoritesCoin.length === 0) {
          setFavorites([]); // Si no hay favoritos, dejar la lista vacía
          return;
        }

        const response = await axios.get(`https://api.coincap.io/v2/assets`);
        console.log("API response:", response.data);

        const data = response.data.data;

        const updatedFavorites = data.filter((coin) => favoritesCoin.includes(coin.id));

        console.log("updatedFavorites:", updatedFavorites);
        setFavorites(updatedFavorites);
      } catch (error) {
        console.error("Error fetching favorites", error);
      }
    };
    getFavorites();
  }, []);

  return (
    <>
      <h2>Your Favorite Coins</h2>
      {favorites.length === 0 ? (
        <p>Aún no hay favoritos</p>
      ) : (
        <ul>
          {favorites.map((favorite) => (
            <li key={favorite.id}>
              <Link to={`/coin/${favorite.id}`}>{favorite.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default Favorites;
