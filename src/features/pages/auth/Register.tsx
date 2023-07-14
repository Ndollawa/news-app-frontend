import {useDispatch, useSelector } from 'react-redux';
import React, {useRef,useState,useEffect, FormEvent, FormEventHandler } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {GoKey} from 'react-icons/go';
import {GrMail} from 'react-icons/gr';
import {FaKeycdn} from 'react-icons/fa'; 
// import {useCompanyDetails, useSiteImages} from '../dashboard/pages/Settings/settingsConfigSlice';
import {useRegisterMutation} from './authApiSlice';
// import {useCompanyDetails,useSiteImages} from '../dashboard/pages/Settings/settingsConfigSlice';
import { setCredentials } from './authSlice';
import jwt_decode from 'jwt-decode';
// import { useCheckDuplicateUserMutation } from '../dashboard/pages/Users/usersApiSlice';
import { PulseLoader } from 'react-spinners';
import showToast from '../../../app/utils/hooks/showToast';
import { authProps } from '../../../app/utils/props/authProps';

// username regex must start with a lowercase or uppercase laters and must be followed by lower or uppercase or digits,- or _ of 3 to 23 characters

// const USERNAME_REGEX = /^[a-zA-Z][a-zA-z]{3,250}$/;
const FULLNAME_REGEX = /^[a-zA-Z\s]{3,}$/;
// requires atleast 0ne uppercase, lowercase,digit, special character and a total of 8 t0 24 characters
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;






interface Messages{
    type:string,
    msg:string | unknown
}

const Register:React.FC = () => {

    // const {siteName,contact} = useSelector(useCompanyDetails);
    // const {logo} = useSelector(useSiteImages);
const fullNameRef = useRef <HTMLInputElement>(null);
const userRef = useRef <HTMLInputElement>(null);
const emailRef = useRef <HTMLInputElement>(null);
const errRef = useRef <HTMLInputElement>(null);
const successRef = useRef <HTMLInputElement>(null);
const pwdRef = useRef <HTMLInputElement>(null);
const cpwdRef = useRef <HTMLInputElement>(null);


const [user,setUser] = useState('');
const [validName,setValidName] = useState(false);
const [fullName,setFullName] = useState('');
const [validFullName,setValidFullName] = useState(false);
const [fullNameFocus,setFullNameFocus] = useState(false);
const [userFocus,setUserFocus] = useState(false);

const [email,setEmail] = useState('');
const [validEmail,setValidEmail] = useState(false);
const [emailFocus,setEmailFocus] = useState(false);

const [pwd,setPwd] = useState('');
const [validPwd,setValidPwd] = useState(false);
const [pwdFocus,setPwdFocus] = useState(false);

const [matchPwd,setMatchPwd] = useState('');
const [validMatch,setValidMatch] = useState(false);
const [matchFocus,setMatchFocus] = useState(false);

const [msg,setMsg] = useState<any>();
const [success,setSuccess] = useState(false);
// const [userFocus,setUserFocus] = useState(false);

const [showPassword,setShowPassword] = useState(false);
const [showCPassword,setShowCPassword] = useState(false);
const [register,{
    isLoading,
    data,
    error,
    isSuccess
}] = useRegisterMutation();
useEffect(()=>{
    fullNameRef.current?.focus();
}, [])

useEffect(()=>{
    setMsg(undefined)
}, [email,pwd,matchPwd,fullName]);

 

const checkFullName = (key:string)=>{
    const result = FULLNAME_REGEX.test(key);
   setValidFullName(result)   
}

const checkEmail = (key:string)=>{
    const result = EMAIL_REGEX.test(key);
   setValidEmail(result)
}

useEffect(()=>{
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd && pwd !== "";
    setValidMatch(match)
}, [pwd,matchPwd]);

const navigate = useNavigate();
const location = useLocation();

//redux-rtkquery
 
const dispatch = useDispatch();

const from =  location?.state?.from?.pathname || '/dashboard';

const handleRegistration:FormEventHandler = async (e:FormEvent) =>{
    e.preventDefault();
    const credentials ={name:fullName,email,password:pwd,password_confirmation:matchPwd}
    // console.log(credentials)
      const {data:{authorisation:{token,type}}} =  await register(credentials).unwrap()
         
        const decodedToken:authProps['auth'] | undefined = token
        ? jwt_decode(token)
           : undefined;
        const  user_info = decodedToken?.user
        dispatch(setCredentials({token,user_info}))
        setUser('');
        setPwd('');
        navigate(from);
        
            if(error){
                setMsg({type:'danger',msg:'No Server Response'});
            }else if(data?.status === 400){
                setMsg({type:'warning',msg:'Missing form detail(s)'} )
            }else if(data?.status === 409){
                setMsg({type:'danger',msg:'Conflict: User with Username or email already exist!'} )
            }else{
                setMsg({type:'danger',msg:'Registration Failed<br/>'+error})
            errRef.current?.focus();
            }
    if(!isLoading && isSuccess){
        setMsg({type:'success',msg:'New Account successfully created!'}) 
        showToast('sucess','New Account successfully created!')
        setSuccess(true);
        setUser('');
        setEmail('');
        setFullName('');
        setPwd('');
        setMatchPwd('');
   }
    }

  return (
    <>
      <div className="bg-purple-900 absolute top-0 left-0 bg-gradient-to-b from-gray-900 via-gray-900 to-purple-800 bottom-0 leading-5 h-full w-full overflow-hidden"></div>
      <div className="relative   min-h-screen  sm:flex sm:flex-row  justify-center bg-transparent rounded-3xl shadow-xl">
        <div className="flex-col flex  self-center lg:px-14 sm:max-w-4xl xl:max-w-md  z-10">
          <div className="self-start hidden lg:flex flex-col  text-gray-300">
            <h1 className="my-3 font-semibold text-4xl">Welcome </h1>
            <p className="pr-3 text-sm opacity-75">
            to the Innoscripta AG Aggregator App! Discover cutting-edge startups, connect with industry experts, stay informed with the latest trends, personalize your feed, collaborate with like-minded individuals, and innovate with confidence. Join us in shaping the future and unlocking limitless possibilities for transformative innovation.
            </p>
          </div>
        </div>
        <div className="flex justify-center self-center  z-10">
          <div className="p-12 bg-white mx-auto rounded-3xl w-96 ">
            <div className="mb-7">
              <h3 className="font-bold text-center text-3xl text-gray-800">
                Register Here
              </h3>
            </div>
        
                                     
             <form action="" onSubmit={handleRegistration}>
             {success && <div ref={successRef} aria-live='assertive'>
                                        <div className="flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800" role="alert">
                                        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="me-2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg> 
                                          <span className="sr-only">Info</span>&ensp;
                                          <div>
                                            <span className="font-medium">Success!</span><div> Account Registered Successfully!<br/>You can now <strong><Link to='/login'>Login</Link></strong>
                                            </div>
                                            </div>
                                          </div>
                                        </div>
                                        }
                                    {msg && <div ref={errRef} aria-live='assertive' className={`alert alert-${msg.type} alert-dismissible suserhow`}>
									<>{
                                    msg.type === 'success'
                                    ?<> <strong>Success!</strong>
                                    <div className="flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800" role="alert">
                                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="me-2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                                      <span className="sr-only">Info</span> &ensp;
                                      <div>
                                        <span className="font-medium">Success!</span>
                                        {msg.msg}.
                                      </div>
                                    </div>
                                </>
								                  	:
                                    msg.type === 'warning'
                                    ?<>
                                    <div className="flex items-center p-4 mb-4 text-sm text-yellow-800 border border-yellow-300 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300 dark:border-yellow-800" role="alert">
                                  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="me-2"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
                                    <span className="sr-only">Info</span>&ensp;
                                    <div>
                                      <span className="font-medium">Warning!</span> {msg.msg}.
                                    </div>
                                  </div></>
									   :msg.type === 'danger'
                                    ? <>
              <div className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="me-2"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
                      <span className="sr-only">Info</span>&ensp;
                      <div>
                        <span className="font-medium">Error!</span>
                         {msg.msg}.
                      </div>
                    </div></> 
                                    :msg.type === 'info'
                                    ? <>
      <div className="flex items-center p-4 text-sm text-gray-800 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600" role="alert">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="me-2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                <span className="sr-only">Info</span>&ensp;
                <div>
                  <span className="font-medium">Info!</span> 
                  {msg.msg}.
                </div>
              </div>
</> :null} 
                                    </>
                                </div>} 
             <div className="flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800" role="alert">
  <svg className="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
  </svg>
  <span className="sr-only">Info</span>&ensp;
  <div>
    <span className="font-medium">Success alert!</span> Change a few things up and try submitting again.
  </div>
</div>
            <div className="space-y-3">
              <div className="">
                <label
                  htmlFor="full-name"
                  className="block m-0 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Full Name
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeHolder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-purple-500  focus:outline-none focus:border-purple-400"
                    placeholder="Full Name"
                    autoComplete='off'
                    ref={fullNameRef}
                    required
                    aria-invalid ={validFullName ? "false": "true"}
                    aria-describedby="uidnote"
                    onChange={(e)=> setFullName(e.target.value)}
                    onFocus={()=>setFullNameFocus(true)}
                    onBlur={()=>{setFullNameFocus(false); checkFullName(fullName);}}
                    value={fullName}
                    id="full-name"
                  />
                </div>
                {(fullNameFocus && !validFullName) && <p className='text-sm font-medium text-red-700 dark:text-red-500'>Must be at least 3  characters.<br/>Must begin with  a letter</p>}
              </div>
              <div className="">
                <label
                  htmlFor="email"
                  className="block m-0 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
            <GrMail fontSize='1rem' />
                  </span>
                  <input
                    type="text"
                    className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeHolder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-purple-500  focus:outline-none focus:border-purple-400"
                    placeholder="hello@example.com"
                    onChange={(e)=>setEmail(e.target.value)}
                    autoComplete='off'
                    required
                    ref={emailRef}
                    aria-invalid ={validEmail ? "false": "true"}
                    aria-describedby="uemailnote"
                    onKeyUp={(e)=> setEmail(email)}
                    onFocus={()=>setEmailFocus(true)}
                    onBlur={()=>{setEmailFocus(false); checkEmail(email);}}
                    value={email}
                    id="email"
                  />
                </div>
                {(emailFocus &&  !validEmail) &&<p className='text-sm font-medium text-red-700 dark:text-red-500' id='uemailnote'>Must begin with letter followed by @ and a provider and end with a domain . eg. youremail@provider.com</p>}
              </div>
              <div className="">
                <label
                  htmlFor="password"
                  className="block m-0 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <div className="flex relative">
                  <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                  <GoKey fontSize='1rem'/>
                  </span>
                  <input
                     type={showPassword ? `text` : "password"}
                    className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeHolder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-purple-500  focus:outline-none focus:border-purple-400"
                    placeholder="Password"
                    id="password"
                    required
                    ref={pwdRef}
                    aria-invalid ={validPwd ? "false": "true"}
                    aria-describedby="pwdnote"
                    onChange={(e)=> setPwd(e.target.value)}
                    onFocus={()=>setPwdFocus(true)}
                    onBlur={()=>setPwdFocus(false)}
                    value={pwd}
                  />
                   <div className="flex items-center absolute inset-y-0 right-0 mr-3  text-sm leading-5">
                  <svg
                    onClick={() => setShowPassword(false)}
                    className={`${
                      !showPassword ? "hidden" : "show"
                    } h-4 text-purple-700`}
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                  >
                    <path
                      fill="currentColor"
                      d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"
                    ></path>
                  </svg>

                  <svg
                    onClick={() => setShowPassword(true)}
                    className={`${
                      showPassword ? "hidden" : "show"
                    } h-4 text-purple-700`}
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 512"
                  >
                    <path
                      fill="currentColor"
                      d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"
                    ></path>
                  </svg>
                </div>
                </div>
                {(pwdFocus && ! validPwd) && <p className='text-sm font-medium text-red-700 dark:text-red-500'>8 to 24 characters.<br/>Must include uppercase and lowercase letters, a number and a special character.<br/> Allowed Special characters: <span aria-label="underscore">_</span> <span aria-label="hyphens">-</span><span aria-label="at symbol">@</span><span aria-label="hashtag">#</span><span aria-label="dollar sign">$</span><span aria-label="percent">% </span> </p>}
              </div>
              <div className="">
                <label
                  htmlFor="confirm-password"
                  className="block m-0 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm Password
                </label>
                <div className="flex relative">
                  <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                  <FaKeycdn fontSize='1rem'/>
                  </span>
                  <input
                      type={showCPassword ? `text` : "password"}
                    className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeHolder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-purple-500  focus:outline-none focus:border-purple-400"
                    placeholder="Confirm password"
                    id="confirm-password"
                    required
                    ref={cpwdRef}
                    aria-invalid ={validMatch ? "false": "true"}
                    aria-describedby="confirmpwdnote"
                    onChange={(e)=> setMatchPwd(e.target.value)}
                    onFocus={()=>setMatchFocus(true)}
                    onBlur={()=>setMatchFocus(false)}
                    value={matchPwd}
                  />
                    <div className="flex items-center absolute inset-y-0 right-0 mr-3  text-sm leading-5">
                  <svg
                    onClick={() => setShowCPassword(false)}
                    className={`${
                      !showCPassword ? "hidden" : "show"
                    } h-4 text-purple-700`}
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                  >
                    <path
                      fill="currentColor"
                      d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"
                    ></path>
                  </svg>

                  <svg
                    onClick={() => setShowCPassword(true)}
                    className={`${
                      showCPassword ? "hidden" : "show"
                    } h-4 text-purple-700`}
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 512"
                  >
                    <path
                      fill="currentColor"
                      d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"
                    ></path>
                  </svg>
                </div>
                </div>
                {(matchFocus && !validMatch) && <p className='text-sm font-medium text-red-700 dark:text-red-500' id='confirmpwdnote'>Passwords do not match!</p>}
              </div>
             
             
              <div className="flex justify-between">
                <div className="text-sm ml-auto">
                  <a href="#" className="text-purple-700 hover:text-purple-600">
                    Forgot your password?
                  </a>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center items-center bg-purple-800  hover:bg-purple-700 text-gray-100 p-3  rounded-lg tracking-wide font-semibold  cursor-pointer transition ease-in duration-500"
                  disabled={!(validEmail && validPwd && validFullName && validMatch)? true : false} >
                
                 <span className="text-nowrap flex justify-center items-center ">{(isLoading)? <>Registering &ensp;<PulseLoader className="pt-1" loading={isLoading} color={'#ffffff'} size={'0.4rem'}/></> :"Register Me" }</span>
            
                </button>
              </div>
              <p className="text-gray-500 text-sm">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="text-sm text-purple-700 hover:text-purple-700"
                >
                  Sign In
                </a>
              </p>
              {/* <div className="flex items-center justify-center space-x-2 my-5">
						<span className="h-px w-16 bg-gray-100"></span>
						<span className="text-gray-300 font-normal">or</span>
						<span className="h-px w-16 bg-gray-100"></span>
					</div> */}
              {/* <div className="flex justify-center gap-5 w-full ">

					</div> */}
            </div>
            </form>
            <div className="mt-7 text-center text-gray-300 text-xs">
              <span>
                Copyright © {new Date().getFullYear()}&ensp;
                <a
                  href="https://github.com/Ndollawa"
                  rel=""
                  target="_blank"
                  title="Codepen aji"
                  className="text-purple-500 hover:text-purple-600 "
                >
                  {" "}
                  Ndubusisi
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
      <footer className="bg-transparent absolute w-full bottom-0 left-0 z-30">
        <div className="container p-5 mx-auto  flex items-center justify-between ">
          <div className="flex mr-auto">
            <a
              href="https://github.com/Ndollawa"
              target="_blank"
              title="Ollawa Ndubuisi github"
              className="text-center text-gray-700 focus:outline-none"
            >
              <img
                src="https://avatars.githubusercontent.com/u/60238828?v=4"
                alt="Ollawa Ndubuisi"
                className="object-cover mx-auto  rounded-full w-10 h-10"
              />
              <p className="text-xl">
                Ollawa <strong>Ndubuisi</strong>
              </p>{" "}
            </a>
          </div>
        </div>
      </footer>

      <svg
        className="absolute bottom-0 left-0 "
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#fff"
          fillOpacity="1"
          d="M0,0L40,42.7C80,85,160,171,240,197.3C320,224,400,192,480,154.7C560,117,640,75,720,74.7C800,75,880,117,960,154.7C1040,192,1120,224,1200,213.3C1280,203,1360,149,1400,122.7L1440,96L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
        ></path>
      </svg>
    </>
  );
}

export default Register
