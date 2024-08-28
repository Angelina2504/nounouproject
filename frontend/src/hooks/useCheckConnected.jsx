import {useContext} from 'react';
import {AuthContext} from '../contexts/AuthContext.jsx';

export const useCheckConnected = () => {
    return useContext(AuthContext);
};
