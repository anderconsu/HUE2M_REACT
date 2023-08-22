import {createContext} from 'react';

const IsDataContext = createContext({
    isData:false,
    setIsData: () => {}
});

export default IsDataContext;