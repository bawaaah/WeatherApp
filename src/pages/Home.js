import React, { useState } from 'react'
import axios from 'axios'

function Home() {

    const [data, setData] = useState()
    const [lon, setLon] = useState(1)
    const [lat, setLat] = useState(2)
    const [location, setLocation] = useState()

    const fetchData = async () => {
        try {
            const resLocation = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=cb03840f9e7eac6ac4f62248c6dbdf8d`)
            setLon(resLocation.data[0].lon)
            setLat(resLocation.data[0].lat)
            const resData = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=cb03840f9e7eac6ac4f62248c6dbdf8d&units=metric`)
            setData(resData.data)
        } catch (error) {
            console.log(error)
        }
    }

    function getLocation() {
        fetchData()
    }

    return (
        <div className="font-mono w-full min-h-screen bg-blue-100 flex flex-col items-center justify-center">
            {/* Main Title */}
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
                <i className="fas fa-cloud-sun mr-2"></i>Weather App
            </h1>

            {/* Weather App Card */}
            <div className="w-full max-w-4xl flex flex-col md:flex-row items-center justify-between gap-8 p-6 bg-white rounded-lg shadow-lg">

                {/* Location Input Section */}
                <div className="flex-1 text-center border border-gray-400 rounded-lg p-6 shadow-sm bg-gray-50">
                    <label className="block mb-4 text-lg font-semibold text-gray-700">Enter Location</label>
                    <input
                        type="text"
                        className="w-full border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onChange={(e) => setLocation(e.target.value)}
                    />
                    <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400 transition duration-300"
                        onClick={getLocation}>
                        Search
                    </button>
                </div>

                {/* Weather Details Section */}
                {(!data) ? <></> :
                    <div className="flex-1 text-center border border-gray-400 rounded-lg p-6 shadow-sm bg-gray-50">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                            Current Weather
                        </h2>
                        <ul className="space-y-4">
                            <li className="text-lg font-semibold text-gray-700">
                                Weather: <span className="text-blue-600">{data.weather[0].main}</span>
                            </li>
                            <li className="text-lg font-semibold text-gray-700">
                                Wind Speed: <span className="text-blue-600">{data.wind.speed} m/s</span>
                            </li>
                            <li className="text-lg font-semibold text-gray-700">
                                Temperature: <span className="text-blue-600">{data.main.temp} °C</span>
                            </li>
                        </ul>
                    </div>}
            </div>
        </div>


    )
}

export default Home