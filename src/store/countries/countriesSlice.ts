import { createSlice } from '@reduxjs/toolkit';

interface ICountry {
  name: string;
}

interface ICountriesState {
  countries: ICountry[];
}

const initialState: ICountriesState = {
  countries: [
    { name: 'United States' },
    { name: 'Canada' },
    { name: 'United Kingdom' },
    { name: 'Germany' },
    { name: 'France' },
    { name: 'Australia' },
    { name: 'Brazil' },
    { name: 'Japan' },
    { name: 'South Korea' },
    { name: 'India' },
    { name: 'Mexico' },
    { name: 'Russia' },
    { name: 'China' },
    { name: 'Italy' },
    { name: 'Spain' },
    { name: 'Netherlands' },
    { name: 'Sweden' },
    { name: 'Norway' },
    { name: 'South Africa' },
    { name: 'Argentina' },
  ],
};

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
});

export default countriesSlice.reducer;
