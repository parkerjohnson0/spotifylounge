import { Dispatch, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
interface AccessToken{
  value: string,
  expiry: Date 
}
export default function useAccessToken(authorized:boolean, setAuthorized:Dispatch<React.SetStateAction<boolean>>): string{
  const [tokenCookie, setTokenCookie] = useState<AccessToken>(
      JSON.parse(window.localStorage.getItem("token") || JSON.parse("")
    ));
  let {accessToken} = useParams();
  useEffect(()=>{
     if (tokenCookie){
       setAuthorized(true);
       accessToken = tokenCookie.value
     }
     else if (accessToken){
        let expiryDate = new Date();
        expiryDate.setHours(expiryDate.getHours() + 1);
       window.localStorage.setItem("token",
                JSON.stringify(
                    {
                        value: accessToken,
                        expiry: expiryDate
                    }));
       setAuthorized(true);
      window.history.pushState({}, "", "/");
     }
     else{
       setAuthorized(false);
     }
  },[])
return tokenCookie.value;
}