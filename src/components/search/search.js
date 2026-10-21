import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from '../../api';

const Search = ({ onSearchChange }) => {

    const [search, setSearch] = useState(null);

   
const loadOptions = (inputValue) => {
    if (!inputValue.trim()) {
        return Promise.resolve({ options: [] });
    }

    const params = new URLSearchParams({
        namePrefix: inputValue,
        minPopulation: "100000",
    });

    return fetch(
        `${GEO_API_URL}/cities?${params}`,
        geoApiOptions
    )
        .then((response) => {
    if (!response.ok) {
        throw new Error(`City search failed: ${response.status}`);
    }

    return response.json();
})
        .then((response) => {
            const options = (response.data || []).map((city) => ({
                value: `${city.latitude} ${city.longitude}`,
                label: `${city.name}, ${city.countryCode}`,
            }));

            return {
                options: options,
            };
        })
        .catch((err) => {
            console.error(err);
            return {
                options: [],
            };
        });
};



    const handleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);
}
    return (
        <AsyncPaginate 
            placeholder="Search for city"
            debounceTimeout={600}
            value={search}
            onChange={handleOnChange}
            loadOptions={loadOptions}
        />
    );
}    

export default Search;