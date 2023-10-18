
import { ReactNode, createContext, useReducer } from "react"

export const AsideContext = createContext({});

interface ActionInterface {
    type: string,
}

type Props = {
    children: ReactNode
}

interface AppState {
    asideVisible?: boolean;
    darkMode?: boolean;
}

function asideReducer(state: AppState, action: ActionInterface): AppState {
    switch(action.type) {
        case 'Close_aside':
            return {asideVisible: !state.asideVisible};
        case 'Dark_mode': 
            return {...state, darkMode: !state.darkMode};
        default :
            return state;
    }
}

export const ToggleAsideContext = ({children}: Props) => {
    const initialState: AppState = {
        asideVisible: false,
        darkMode: false
    };

    const [asideState, asideDispatch] = useReducer(asideReducer, initialState);

    return(
        <AsideContext.Provider value={{asideState, asideDispatch}}>
            {children}
        </AsideContext.Provider>
    )
}