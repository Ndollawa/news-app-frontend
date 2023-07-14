import React,{useEffect,useState,useRef, FormEventHandler, FormEvent} from 'react';
import {GoKey} from 'react-icons/go';
import {GrMail} from 'react-icons/gr';
import { Link, useNavigate, useLocation} from 'react-router-dom';
// import useLocalStorage from '../../app/utils/hooks/useLocalStorage';
// import useInput from '../../app/utils/hooks/useInput';
import useToggle from '../../../app/utils/hooks/useToggle';

// react-reduct rtkquery approach
import {useDispatch, useSelector} from 'react-redux';
// import {useCompanyDetails,useSiteImages} from '../dashboard/pages/Settings/settingsConfigSlice';
import {useLoginMutation} from './authApiSlice';
import { setCredentials } from './authSlice';
import jwt_decode from 'jwt-decode';
import { authProps } from '../../../app/utils/props/authProps';
import {PulseLoader} from 'react-spinners';


interface errMessages{
    type:string,
    msg:string
}

const Login:React.FC = () => {

    
    // const {siteName} = useSelector(useCompanyDetails);
    // const {logo} = useSelector(useSiteImages);


const navigate = useNavigate();
const location = useLocation();

//redux-rtkquery
const [login,{isLoading:isLoadingLogin, isSuccess}] = useLoginMutation();
 
const dispatch = useDispatch();

const from =  location?.state?.from?.pathname || '/dashboard';

const userRef = useRef <HTMLInputElement>(null);
const errRef = useRef <HTMLInputElement>(null);
const pwdRef = useRef <HTMLInputElement>(null);

const [user,setUser] = useState('');
const [pwd,setPwd] = useState('');
const [showPassword,setShowPassword] = useState(false);
const [check,toggleCheck] = useToggle('persist',false);
const [errMsg,setErrMsg] = useState<errMessages>();


useEffect(()=>{
    userRef.current?.focus();
}, [])

useEffect(()=>{
    setErrMsg(undefined)
}, [user,pwd]);


const handleLogin:FormEventHandler = async (e:FormEvent)=>{
        e.preventDefault();

        try{
       const credentials = {email:user,password:pwd}
            
            // redux-rtkQuery approach
            const {data:{authorisation:{token,type}}} = await login(credentials).unwrap()
            const decodedToken:authProps['auth'] | undefined = token
            ? jwt_decode(token)
               : undefined;
            const  user_info = decodedToken?.user
            dispatch(setCredentials({token,user_info}))
            setUser('');
            setPwd('');
            navigate(from);
            
        }catch(err:any){
                if(!err){
                    setErrMsg({type:'danger',msg:'No Server Response'});
                }else if(err.status === 400){
                    setErrMsg({type:'warning',msg:'Missing form detail(s)'} )
                }else if(err.status === 401){
                    setErrMsg({type:'danger',msg:'Invalid Credentials'} )
                }else{
                    setErrMsg({type:'danger',msg:'Login Failed'})
                }
                errRef.current?.focus();
            }
        }

  return (
    <>
<div
	className="bg-purple-900 absolute top-0 left-0 bg-gradient-to-b from-gray-900 via-gray-900 to-purple-800 bottom-0 leading-5 h-full w-full overflow-hidden">
	
</div>
<div
	className="relative   min-h-screen  sm:flex sm:flex-row  justify-center bg-transparent rounded-3xl shadow-xl">
	<div className="flex-col flex  self-center lg:px-14 sm:max-w-4xl xl:max-w-md  z-10">
		<div className="self-start hidden lg:flex flex-col  text-gray-300">
			
			<h1 className="my-3 font-semibold text-4xl">Welcome back</h1>
			<p className="pr-3 text-sm opacity-75">to Innoscripta AG Aggregator App! Discover cutting-edge startups, connect with industry experts, stay informed with the latest trends, personalize your feed, collaborate with like-minded individuals, and innovate with confidence. Join us in shaping the future and unlocking limitless possibilities for transformative innovation.</p>
		</div>
	</div>
	<div className="flex justify-center self-center  z-10">
		<div className="p-10 bg-white mx-auto rounded-3xl w-96 ">
			<div className="mb-7">
				<h3 className="font-bold text-center text-3xl text-gray-800">Login </h3>
			
			</div>
      <form action="" onSubmit={handleLogin}>
      {errMsg && <div ref={errRef} aria-live='assertive'>
									<>{errMsg.type === 'warning' 
                                    ?<>
                                    <div className="flex items-center p-4 mb-4 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800" role="alert">
                          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="me-2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                          <span className="sr-only">Info</span>&ensp;
                          <div>
                            <span className="font-medium">Warning!</span>  {errMsg.msg}.
                          </div>
                        </div></>
									:errMsg.type === 'danger'
                                    ? <><div className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
                                  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="me-2"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
                                    <span className="sr-only">Info</span>&ensp;
                                    <div>
                                      <span className="font-medium">Error!</span> {errMsg.msg}.
                                    </div>
                                  </div></>: null} 
									<button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="btn-close">
                                    </button></>
                                </div>}          
			<div className="space-y-3">
			
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
                    placeholder="Email"
                    id="email"
                    autoComplete='off'
                    ref={userRef}
                    required
                    onChange={(e)=> setUser(e.target.value)}
                   value={user}
                  
                  />
                </div>
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
                    ref={pwdRef}
                     autoComplete='off'
                      required
                      onChange={(e)=> setPwd(e.target.value)}
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
              </div>

   
					<div className="flex items-center justify-between">
<div className="form-row flex content-between">
                          <div className="form-group">
                              <div className="custom-control custom-checkbox ms-1">
                              <input 
                                  type="checkbox" 
                                  className="form-check-input text-purple-700 hover:text-purple-600" 
                                  id="basic_checkbox_1"
                                  title='Trust this Device?'
                                  onChange={toggleCheck}
                                  checked={check}
                                  />
									&ensp;<label className="form-check-label text-sm" htmlFor="basic_checkbox_1">Trust this Device?</label>
												</div>
                   </div>
            </div>
						<div className="text-sm ml-auto">
							<a href="#" className="text-purple-700 hover:text-purple-600">
								Forgot your password?
							</a>
						</div>
					</div>
					<div>
						<button type="submit" className="w-full  bg-purple-800  hover:bg-purple-700 text-gray-100 p-3  rounded-lg tracking-wide font-semibold  cursor-pointer transition ease-in duration-500">
            <span className="text-nowrap flex justify-center items-center ">{(isLoadingLogin)? <>Logging In <PulseLoader className="pt-1" loading={isLoadingLogin} color={'#ffffff'} size={'0.4rem'}/></> :"Login" }</span>
              </button>
              
					</div>	
       
          <p className="text-gray-500 text-sm">Don't have an account? <a href="/register"
						className="text-sm text-purple-700 hover:text-purple-700">Register</a></p>
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
                <a href="https://github.com/Ndollawa" rel="" target="_blank" title="Codepen aji" className="text-purple-500 hover:text-purple-600 "> Ndubusisi</a></span>
				</div>
			</div>
		</div>
	</div>
	<footer className="bg-transparent absolute w-full bottom-0 left-0 z-30">
	<div className="container p-5 mx-auto  flex items-center justify-between ">
		<div className="flex mr-auto">
			<a href="https://github.com/Ndollawa" target="_blank" title="Ollawa Ndubuisi github" className="text-center text-gray-700 focus:outline-none"><img src="https://avatars.githubusercontent.com/u/60238828?v=4" alt="Ollawa Ndubuisi" className="object-cover mx-auto  rounded-full w-10 h-10"/><p className="text-xl">Ollawa <strong>Ndubuisi</strong></p> </a>
		</div>

	</div>
	</footer>

<svg className="absolute bottom-0 left-0 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#fff" fillOpacity="1" d="M0,0L40,42.7C80,85,160,171,240,197.3C320,224,400,192,480,154.7C560,117,640,75,720,74.7C800,75,880,117,960,154.7C1040,192,1120,224,1200,213.3C1280,203,1360,149,1400,122.7L1440,96L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path></svg>


    </>
  )
}

export default Login


 {/* <div className="h-screen flex">
      <div className="flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center">
        <div>
          <h1 className="text-white font-bold text-4xl font-sans">News Aggregator</h1>
          <p className="text-white mt-1">The most popular News Agreggator platform</p>
          <button type="submit" className="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2">Read More</button>
        </div>
      </div>
      <div className="flex w-1/2 justify-center items-center bg-white">
        <form className="bg-white">
          <h1 className="text-gray-800 font-bold text-2xl mb-1">Hello Again!</h1>
          <p className="text-sm font-normal text-gray-600 mb-7">Welcome Back</p>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
            </svg>
            <input className="pl-2 outline-none border-none" type="text" name="" id="" placeholder="Email Address" />
          </div>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
            </svg>
            <input className="pl-2 outline-none border-none" type="text" name="" id="" placeholder="Password" />
          </div>
          <button type="submit" className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2">Login</button>
          <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer">Forgot Password ?</span>
        </form>
      </div>
    </div> */}