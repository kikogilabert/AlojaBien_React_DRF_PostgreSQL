import {React, useState } from 'react';
import CardCities from './CardCities'
import { useCities } from '../../../hooks/useCities';
import { useNavigate } from "react-router-dom";
import CardCitiesCSS from './CardCities.module.css';

export default function ListCities({ AllCities }) {
  const { cities, useOneCity } = useCities();

  return (
    <div>
      <div className={CardCitiesCSS.align_cards}>
        {AllCities.map(city => (
          <CardCities key={city.id} city={city}/>
        ))}
      </div>
    </div>
  );
};