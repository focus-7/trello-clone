import React, { useState, useEffect } from "react"
import Logo from '../assets/publicalo.png'
import axios from 'axios'

const MainMenu = () => {
    const publicIp = require('public-ip');
    const [weather, setWeather] = useState('');
    const [country, setCountry] = useState('');
    const [image, setImage] = useState('');

   
    useEffect(() => {
        const getWeather = async () => {
            const resIp = await publicIp.v4();
            axios.get(`http://api.weatherapi.com/v1/current.json?key=e469d06fd52f4c449a234220200109&q=${resIp}`)
                .then(response => {
                    const res = response.data;
                    setCountry(res.location.country)
                    setWeather(res.current.temp_c)
                    setImage(res.current.condition.icon)
                });
        }
        getWeather();
    }, [publicIp])

    return (
        <nav className="navbar navbar-dark bg-primary">
            <a className="navbar-brand" href='/'>
            <img src={Logo} width="30" height="30" className="d-inline-block align-top m-1" alt="logoTrello" loading="lazy"/>
                TrelloClone                
            </a>
            <form className="form-inline">
                <h6 className="text-white">{country}, {weather}°C </h6>
                <img src={image} alt={country} />
            </form>
        </nav>
    )
}

export default MainMenu