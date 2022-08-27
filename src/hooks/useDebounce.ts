import React, {useState, useEffect} from 'react'
export default function useDebounce(delay: number, text: string){
    const [time, setTime] = useState(Date.now);
    const [lastText, setLastText] = useState("");
    useEffect(()=>{
        const timer = setInterval(()=>{
            if (lastText != text){
                tick();
                console.log(text)
            }
        }, delay * 1000)
        return() => clearInterval(timer);
    },[getTimeDelta()])
    function tick() {
        setTime(Date.now());
    }
    function getTimeDelta() {
        if (Date.now() - time > (delay * 1000)){
            setTime(Date.now());
            return Date.now();
        }
        else{
            return time;
        }
        setLastText(text);
    }
}


