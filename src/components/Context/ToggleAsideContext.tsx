
import { createContext, useReducer } from "react"

export const AsideContext = createContext({});

function asideReducer(state, action) {
    switch(action.type) {
        case 'Close_aside':
            return {...state, asideVisible: !state.asideVisible};
        case 'Dark_mode': 
            return {...state, darkMode: !state.darkMode};
        default :
            return state;
    }
}

export const ToggleAsideContext = ({children}) => {
    const [asideState, asideDispatch] = useReducer(asideReducer, {asideVisible: false, darkMode: false});

    return(
        <AsideContext.Provider value={{asideState, asideDispatch}}>
            {children}
        </AsideContext.Provider>
    )
}