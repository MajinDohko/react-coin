import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Coin = () => {
    const [data, setData] = useState(null);
    const [favCoins, setFavCoins] = useState([]);
    const { id } = useParams();

    // Obtener detalles de la moneda
    const getCoinDetail = async () => {
        try {
            const response = await axios.get(`https://api.coincap.io/v2/assets/${id}`);
            setData(response.data.data);
        } catch (error) {
            console.error('Error al obtener datos:', error);
        }
    };

    // Obtener favoritos de localStorage
    const getFavs = () => {
        const favs = localStorage.getItem("favCoins");
        if (favs) {
            setFavCoins(JSON.parse(favs)); // Convertir la cadena en array
        }
    };

    useEffect(() => {
        getCoinDetail();
        getFavs();
    }, [id]);

    // Agregar a favoritos
    const addFavourite = () => {
        if (!favCoins.includes(id)) {
            const newFavs = [...favCoins, id];
            setFavCoins(newFavs);
            localStorage.setItem("favCoins", JSON.stringify(newFavs)); // Guardar en localStorage
        }
    };

    // Eliminar de favoritos
    const deleteFavourite = () => {
        const newFavs = favCoins.filter(fav => fav !== id);
        setFavCoins(newFavs);
        localStorage.setItem("favCoins", JSON.stringify(newFavs)); // Guardar en localStorage
    };

    return (
        <>
            <h1>Coin</h1>
            {data && (
                <>
                    <h2>{data.name}</h2>
                    <p>{data.symbol}</p>
                    <p>{data.priceUsd}</p>
                    <button onClick={addFavourite}>Añadir a favoritos</button>
                    <button onClick={deleteFavourite}>Quitar de favoritos</button>
                </>
            )}
        </>
    );
};

export default Coin;
