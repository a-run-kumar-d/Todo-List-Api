import { Link, useNavigate } from "react-router-dom"
import "../styles/common.css"
import "../styles/other.css"
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useTokenData } from "../Data/dataContext";
import { useTrefreshData } from "../Data/refreshContext";
export default function Login() { 
    const {settoken} = useTokenData();
    const {settrefresh} = useTrefreshData();
    const navigate = useNavigate();
    const [alert , setAlert] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    // useEffect(()=>{
    //     console.log(token);
    // },[token])
    function handleLoginSubmit(){
        if(userName === "" || password === ""){
            setAlert("Please fill all the fields");
        }
        else{
            const data = {
                "username" : userName,
                "password" : password 
            }
            axios.post("https://www.mulearn.org/api/v1/mulearn-task/login/",data,{
                headers: {
                    "Content-Type": "application/json"
            }}).then((res)=>{
                const tok = res.data.access;
                settrefresh(res.data.refresh);
                settoken(tok);
                navigate("/home");
            }).catch(()=>{
                setAlert("invalid credentials");
            })
            
        }
    }
    return (
        <>
            <div className="bgContainer" id="bgLogin"></div>
            <div className="homeContainer" id="loginContainer">
                <div className="loginhead">Welcome to TodoList</div>
                <div className="loginsubhead">Enter your credentials to login to <br></br> your account</div>
                <div className="loginForm">
                <input type="text" className="inputBox" id="userName" placeholder="username" value={userName} onChange={(e) => setUserName(e.target.value)}/>
                    <input type="text" className="inputBox" id="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <button className="loginButton" onClick={handleLoginSubmit}>Login</button>
                    <div className="alert">{alert}</div>
                    <div className="loginLink">New to todo list? <Link to="/signup">create an account</Link></div>
                </div>
            </div>
        </>
    )
}