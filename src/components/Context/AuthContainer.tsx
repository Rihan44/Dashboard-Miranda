import { ReactNode, createContext, useEffect, useReducer } from "react"


interface InitialStateInterface {
    authenticated?: boolean,
    username?: string | null,
    email?: string | null,
    imageSrc?: string | null
}

function initialAuthState(): InitialStateInterface{
    const authData = localStorage.getItem('auth') || '';

    if (authData) {
        return JSON.parse(authData);
    } else {
        return {authenticated: false, username: null, email: null, imageSrc: null};
    }
}

interface LogInInterface {
    type: "LOGIN",
    payload: {
        authenticated: boolean,
        username: string,
        email: string
    }
}

interface LogOutInterface {
    type: "LOGOUT",
}

interface UpdateInterface {
    type: "UPDATE",
    payload: {
        username: string,
        email: string,
        imageSrc: string
    }
}

type Actions = LogInInterface | LogOutInterface | UpdateInterface;

type Props = {
    children: ReactNode
}

const reducer = (state: InitialStateInterface, action: Actions): InitialStateInterface =>{
    switch(action.type) {
        case 'LOGIN':
            return {...action.payload};
        case 'LOGOUT':
            return {authenticated: false, username: null, email: null, imageSrc: null};
        case 'UPDATE':
            return {...state, ...action.payload};
        default :
            return state;
    }
}

interface AuthInterface {
    auth: InitialStateInterface,
    authDispatch: React.Dispatch<Actions>
}

export const AuthContext = createContext<AuthInterface>({
    auth: {
        authenticated: false,
        username: '',
        email: '',
        imageSrc: ''
    },
    authDispatch: () => {}
});


export const AuthContainer: React.FC<Props> = ({children}) => {

    const [auth, authDispatch] = useReducer(reducer, initialAuthState());

    useEffect(() => {
        localStorage.setItem('auth', JSON.stringify(auth));
    }, [auth]);

    return(
        <AuthContext.Provider value={{auth, authDispatch}}>
            {children}
        </AuthContext.Provider>
    )
}