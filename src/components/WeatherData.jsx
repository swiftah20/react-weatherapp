import React from 'react'
import { Tooltip, Typography } from "@material-tailwind/react";

import CloudyIcon from '../assets/icons/cloudy.png'
import DrizzleIcon from '../assets/icons/drizzle.png'
import FullCloudyIcon from '../assets/icons/full_cloudy.png'
import MistIcon from '../assets/icons/mist.png'
import SnowyIcon from '../assets/icons/snowy.png'
import StormIcon from '../assets/icons/storm.png'
import SunnyIcon from '../assets/icons/sunny.png'
import RainIcon from '../assets/icons/rain.png'

const WeatherData = ({icon, cityData, weather, windDegree}) => {
    let weatherIcon;
    icon.map((data) => {
        const cuaca = data.main;
        switch (cuaca) {
            case "Thunderstorm":
                weatherIcon = <img src={StormIcon} alt="Storm" className='h-40 w-40'></img>;
                break;
            case "Drizzle":
                weatherIcon = <img src={DrizzleIcon} alt="Drizzle" className='h-40 w-40'></img>;
                break;
            case "Rain":
                weatherIcon = <img src={RainIcon} alt="Rain" className='h-40 w-40'></img>;
                break;
            case "Clear":
                weatherIcon = <img src={SunnyIcon} alt="Sunny" className='h-40 w-40'></img>;
                break;
            case "Mist":
                weatherIcon = <img src={MistIcon} alt="Mist" className='h-40 w-40'></img>;
                break;
            case "Snow":
                weatherIcon = <img src={SnowyIcon} alt="Snow" className='h-40 w-40'></img>;
                break;
            case "Clouds":
                weatherIcon = <img src={FullCloudyIcon} alt="Clouds" className='h-40 w-40'></img>;
                break;
            default:
                weatherIcon = <img src={CloudyIcon} alt="Sunny" className='h-40 w-40'></img>;
        }
    })

    function getWindDirection(degrees) {
        const direction = Math.floor((degrees + 22.5) / 45) % 8;
        switch (direction) {
            case 0:
                return 'North';
            case 1:
                return 'North-East';
            case 2:
                return 'East';
            case 3:
                return 'South-East';
            case 4:
                return 'South';
            case 5:
                return 'South-West';
            case 6:
                return 'West';
            case 7:
                return 'North-West';
            default:
                return 'Unknown';
        }
    }

    return (
        <div className="flex">
            {
                icon.length > 0 ? (
                    <> {weatherIcon} </>
                ) : <img src={CloudyIcon} alt="Sunny" className='h-40 w-40'></img>
            }
            <div className='flex items-center'>
                <div className="flex-auto w-44 text-center mx-auto">
                    {
                        Object.keys(cityData).length > 0 ? (
                            <div className='text-4xl '>
                                {
                                    typeof cityData.main.temp === 'number' ? cityData.main.temp.toFixed(0) : cityData.main.temp
                                }
                                °C
                            </div>
                        ) : <div className='text-3xl '> -- °C </div>
                    }
                    <div className='text-xl my-2 '>
                        {
                            weather?.map((data, i) => {
                                return (
                                    <div key={i}> {data.main} </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div className='flex items-start'>
                <Tooltip
                    className="backdrop-blur-lg bg-black/70 px-4 py-2 shadow-xl"
                    placement="right"
                    content={
                        <div className="w-50">
                            <Typography color="white" className="mb-2">
                                Details
                            </Typography>
                            <Typography
                                variant="small"
                                color="white"
                                className="font-normal"
                            >
                                {
                                    Object.keys(cityData).length > 0 ? (
                                        <div className='grid grid-rows-4 gap-2 text-gray-300'>
                                            <div> Description:
                                                <span className='block text-gray-400'>
                                                    {
                                                        weather?.map((data, i) => {
                                                            return (
                                                                <div key={i}> {data.description} </div>
                                                            )
                                                        })
                                                    }
                                                </span>
                                            </div>
                                            <div> Coordinate: <span className='block text-gray-400'> Lat: {cityData.coord.lat} {''} Lon: {cityData.coord.lon} </span> </div>
                                            <div> Visibility: <span className='block text-gray-400'> {cityData.visibility / 1000} Km </span> </div>
                                            <div> Wind direction:
                                                <span className='block text-gray-400'>
                                                    {windDegree !== null ? (
                                                        <>
                                                            {getWindDirection(windDegree)} ({windDegree}°)
                                                        </>
                                                    ) : (
                                                        <> - </>
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    ) : <div className='grid grid-rows-4 gap-2 text-gray-300'>
                                        <div> Description: <span> - </span> </div>
                                        <div> Coordinate: <span> - </span> </div>
                                        <div> Visibility: <span> - </span> </div>
                                        <div> Wind direction: <span> - </span> </div>
                                    </div>
                                }
                            </Typography>
                        </div>
                    }
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        className="h-5 w-5 cursor-pointer text-blue-gray-600"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                        />
                    </svg>
                </Tooltip>
            </div>
        </div>
    )
}

export default WeatherData