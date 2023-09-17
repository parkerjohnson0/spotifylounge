import { Dispatch, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function useAccessToken(authorized:boolean, setAuthorized:Dispatch<React.SetStateAction<boolean>>): [string, Dispatch<React.SetStateAction<string>>]{
  const [tokenCookie, setTokenCookie] = useState<string>(JSON.parse(window.localStorage.getItem("token") || "")?.value || "");
  let {accessToken} = useParams();
  useEffect(()=>{
     if (tokenCookie && !authorized){
       setAuthorized(true);
       accessToken = tokenCookie;
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
return [tokenCookie, setTokenCookie]
}