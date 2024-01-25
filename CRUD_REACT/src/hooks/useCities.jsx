import { useContext, useCallback, useEffect, useState } from "react";
import CitiesService from "../services/CitiesService";
import CitiesContext from "../context/CitiesContext";
import { useNavigate } from "react-router-dom";

export function useCities() {
const { cities, setCities } = useContext(CitiesContext);

const [oneCity, setOneCity] = useState({});

const navigate = useNavigate();

const useOneCity = useCallback((id) => {
    // console.log(id);
    CitiesService.getOneCity(id)
        .then(({data}) => {
            // console.log(data);
            setOneCity(data);
        })
        .catch(e => console.error(e));
}, []);


const addCity = useCallback(data => {
    let city_data = {
        name: data.name,
        state: data.state,
        country: data.country
    }
    // console.log(data);
    console.log(city_data);

    CitiesService.createCity(city_data).then((data) => {            
                console.log(data);
                setCities([...cities, data]);
                navigate("/cities");
        })
        .catch(e => {
            console.error(e);
                });

            }
        , []);

        const useDeleteCity = (id) => {
            CitiesService.deleteCity(id)
            .then(({ data, status }) => {
                // console.log(data);  
                // if (status === 200) {
                    // toast.success(data.data);
                    setCities(cities.filter(cities => cities.id !== id));
                // }
            })
            .catch(e => console.error(e));
        }
        
        const useUpdateCity = useCallback((id, data) => {
        
            let city_data = {
                name: data.name,
                state: data.state,
                country: data.country
            }
    
            // console.log(city_data);
            CitiesService.updateCity(id, city_data)
                .then(({ data, status }) => {
                        console.log(status);
                        console.log(data);
                    if (status === 200) {
                        let old_cities = [...cities];
                        const index = old_cities.findIndex(city => city.id === id);
                        if (index !== -1) {
                            old_cities[index] = data;
                            setCities(old_cities);
                        }
                        navigate("/cities");
                    }
                })
                .catch(e => {
                    console.error(e);
                    toast.error('Create station error');
                });
            // setIsCorrect(true);
            // setTimeout(() => { setIsCorrect(false); }, 1000);
        }, []);


return { cities, setCities, addCity, useDeleteCity, useUpdateCity, useOneCity, oneCity };
}