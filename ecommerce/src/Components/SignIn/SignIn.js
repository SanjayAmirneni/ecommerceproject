import React,{useState,useEffect} from "react";
import "./SignIn.css";
import {Link, useNavigate} from "react-router-dom"
import axios from "axios";
import userAddAction from "../../Action/userAddAction";
import { sessionService } from 'redux-react-session'
// import { useCookies } from 'react-cookie'
// import Cookies from 'js-cookie'

function SignIn(){

    const[email,setEmail] = useState('');
    const[password,setPassword] = useState('')
    const navigate = useNavigate();
    const validEmail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$')
    const [err, setErr] = useState(false);
    const [errMsg, setErrMsg] = useState('');

    // const validpassword = new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|\]).{4,10}$')

    // const [cookies, setCookie] = useCookies('connect.sid');

    // useEffect(()=>{},[err,errMsg])


    function validate(){

        if(!(email.length>0||!(password.length>4&&password.length<10))){
            // alert("Enter Username")
            setErr(true)
            setErrMsg('Enter Username');
            return false
        }




        if((email.length>0&&(password.length>4&&password.length<10))){
            if(!(validEmail.test(email))){
                // alert("Enter correct email address - xxxx@xxx.xxx")
                setErr(true)
                setErrMsg('Enter correct email address - xxxx@xxx.xxx');
                return false
            }
            // if(!(validpassword.test(password))){
            //     alert("Enter password which has at least one uppercase letter, one lowercase letter, one number and one special character")
            // }
        }
        console.log(!(password.length>4))
        console.log(password.length)
        if(!(password.length!=0)){
            if(!email.length>0){
                // alert("Enter Username and Password")
                setErr(true)
                setErrMsg('Enter Username and Password');
                return false
            }
            else{
                // alert("Enter Password")
                setErr(true)
                setErrMsg('Enter Password');
                return false
            }
            
        }
        if(!(password.length>4)){
            if(!email.length>0){
            // alert("Enter Username and Password length should be more than 4 digits.")
            setErr(true)
            setErrMsg('Enter Username and Password length should be more than 4 digits.');
            return false}
            else{
                // alert("Password length should be more than 4 characters.")
                setErr(true)
                setErrMsg("Password length should be more than 4 characters.");
                return false
            }
        }

        if(!(password.length<10)){
            if(!email.length>0){
            // alert("Enter Username and Password length should be more than 4 digits.")
            setErr(true)
            setErrMsg('Enter Username and Password length should be more than 4 digits.');
                return false}
            else{
                // alert("Password length should not be more than 10 characters.")
                setErr(true)
                setErrMsg('Password length should not be more than 10 characters.');
                return false
            }
        }
        // console.log(email,password)

        return true;

    }


    function errorMsg(){
        return(
            <div>
            <h3>${err}</h3>
            <button onClick={setErr('')}>OK</button>
            </div>
        );
    }


    function clearErr(){
        setErr(false);
        setErrMsg('');
    }




    async function signin(e){
        e.preventDefault();

        if(validate()){
            setErr(false)
            const userData = await axios.get('http://localhost:5000/api/v1/user/credentials',{
                params:{
                "mailID" : email ,
                "password" : password,
            }})
    
    
            if(userData.data.length<1){
                // alert("Wrong credentials");
                setErr(true)
                setErrMsg("Wrong credentials");
            }
            // console.log(userData.data)
            // console.log(userData.data[0])
            else if(userData.data[0].password === password){
                userAddAction({
                    email:userData.data[0].mailID,
                    password:userData.data[0].password
                });
    
                // sessionService.saveSession(userData.data[0].mailID)
    
                sessionService.saveUser(userData.data[0].mailID)
                
                try {
                    const serializedStore = JSON.stringify({
                        email:userData.data[0].mailID,
                        password:userData.data[0].password
                    });
                    window.localStorage.setItem('user', serializedStore);
                } catch(e) {
                    console.log(e);
                }
    
                // const sess = await sessionService.loadSession()
                // console.log(sess)
                navigate("/home");
            }
            else{
                // alert("Wrong credentials");
                setErr(true)
                setErrMsg("Wrong credentials");
            }
        }


        
       
        
        
    }

    async function register(){


        if(validate()){
            setErr(false);
            const userData = await axios.post('http://localhost:5000/api/v1/user/adduser',{ "mailID" : email ,
            "password" : password,},
        )
        // console.log(userData.data.errors)
        if(userData.data.code === 11000){
            alert("User already exits")
            setErr(true)
            setErrMsg("User already exits");
        }
        else if(userData.data.errors){
            if(userData.data.errors.mailID){
            // alert(userData.errors.mailID.message)
                setErr(true)
                setErrMsg(userData.data.errors.mailID);}
            else if(userData.data.errors.password){
                // alert(userData.data.errors.password.message)
                setErr(true)
                setErrMsg(userData.data.errors.password);
            }
        }
        else if(userData.data.mailID){
            alert("User Created");
            // setErr(true)
            // setErrMsg("User Created");
        }
        }
       
        
    }
     return (
         <div>
         <div className="signin">
             {/* <Link to="/home" style={{textDecoration:'none'}}> */}
                <h1 className="signin__logo">EcommerceSite</h1>
             {/* </Link> */}
             <div className="signin__body">
             <h1>Sign-in</h1>
             <form>
                 <h5>E-mail</h5>
                 <input type="text" value={email} onChange={
                     (e)=>setEmail(e.target.value)}/>
                 
                 <h5>Password</h5>
                 <input type="password" value={password} onChange={
                     (e)=>setPassword(e.target.value)}/>
                 <button onClick={signin}>SignIn</button>
             </form>
             <p>By continuing, you agree to the Conditions of Use and Privacy Notice.</p>
             <button onClick={register}>Create your Account</button>
             </div>
             {err&&<div className="errorMsg"><h1>{errMsg}</h1><button onClick={clearErr}>OK</button></div>}
        </div>
        {/* {console.log(err,errMsg)} */}
        </div>

     )
}


export default SignIn;