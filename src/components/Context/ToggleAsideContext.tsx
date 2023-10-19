
import { ReactNode, createContext, useReducer } from "react"

interface CloseAsideInterface {
    type: 'Close_aside',
    payload: {
        asideVisible: boolean
    }
}

interface DarkModeInterface {
    type: 'Dark_mode',
    payload: {
        darkMode: boolean
    }
}

type Props = {
    children: ReactNode
}

interface AppState {
    asideVisible?: boolean;
    darkMode?: boolean;
}

type Actions = CloseAsideInterface | DarkModeInterface;

const asideReducer = (state: AppState, action: Actions) => {
    switch(action.type) {
        case 'Close_aside':
            return {asideVisible: !state.asideVisible};
        case 'Dark_mode': 
            return {...state, darkMode: !state.darkMode};
        default :
            return state;
    }
}

interface AuthInterface {
    asideState: AppState,
    asideDispatch: React.Dispatch<Actions>
}

export const AsideContext = createContext<AuthInterface>({
    asideState: {
        asideVisible: false,
        darkMode: false
    },
    asideDispatch: () => {}
});

export const ToggleAsideContext: React.FC<Props> = ({children}) => {
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