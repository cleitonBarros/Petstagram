import React from "react";
import { TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET } from "../API/api";
import { useNavigate } from "react-router-dom";

export const UserContext = React.createContext()


export function UserStorage ({children}){ 
    const [data, setData] = React.useState(null)
    const [login, setLogin] = React.useState(null)
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(null)
    const navigate  = useNavigate();

    
    async function getUser(token) {
        const {url,options} = USER_GET(token)
        const res = await fetch(url, options)
        const json = await res.json()
        setData(json)
        setLogin(true)
        console.log(json)
    }
    async function userLogin(username, password){
        try{
            setError(null)
            setLoading(true)
            const {url, options} = TOKEN_POST({username: username, password: password})
            const tokenRes = await fetch(url, options)
            if(!tokenRes.ok) throw new Error(`Error: Usuario ou senha Invalidos`)
            const {token} = await tokenRes.json()
            window.localStorage.setItem('token', token)
            await getUser(token)
            navigate('/conta')
        }catch(err){
            setError(err.message)
            setLogin(false)
        }finally{
            setLoading(false)
        }
    }
    
    const userLogout= React.useCallback( async function (){
        setData(null)
        setError(null)
        setLoading(false)
        setLogin(false)
        window.localStorage.removeItem('token')
        navigate('/login')
    },[navigate])

    React.useEffect(()=>{
        async function autoLogin(){
            const hasToken = window.localStorage.getItem('token')
            if(hasToken){
                try{ 
                    setError(null)
                    setLoading(true)
                    const {url,options} = TOKEN_VALIDATE_POST(hasToken)
                    const res = await fetch(url, options) 
                    if(!res.ok ) throw new Error('Token invalido') 
                    await getUser(hasToken)
                }catch(err){
                    userLogout()

                }finally{
                    setLoading(false)
                }
            }

        }
        autoLogin()
    },[userLogout])


    return(
        <UserContext.Provider value={{ userLogin, userLogout, data, error, loading, login}}>
            {children}
        </UserContext.Provider>
    )

}