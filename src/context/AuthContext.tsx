
import react, {SetStateAction, createContext, useState} from "react";
interface AuthContextPropType{
    children: React.ReactNode
}
interface AuthContextType{
    authorized: boolean,
    setAuthorized: React.Dispatch<SetStateAction<boolean>>
}
export const AuthContext = createContext<AuthContextType>({
    authorized: false,
    setAuthorized: () => false 
});
export const AuthContextProvider = (props:AuthContextPropType) => {
    const [authorized, setAuthorized] = useState<boolean>(false);
    return (
        <AuthContext.Provider value={
         {
            authorized: authorized,
            setAuthorized: setAuthorized
         }
        }>
            {props.children}
        </AuthContext.Provider>
    )
}