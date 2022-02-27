import { createContext } from 'react';

const LocationContext = createContext(
    {
        defaultLocation: null,
        setDefaultLocation: () => {},
    }
);

export default LocationContext;