import {useState} from 'react'
import {Routes,Link,Route, useNavigate, Navigate } from 'react-router-dom';
import Dashboard from './features/pages/dashboard/Dashboard';
import Home from './features/pages/home/Home';
import Register from './features/pages/auth/Register';
import Login from  './features/pages/auth/Login';
import Layout from './components/Layout';


import Prefetch from './features/pages/auth/Prefetch';
import PersistLogin from './components/PersistLogin';
import RequireAuth from './components/RequireAuth';
// import CreatePost from './features/pages/CreatePost';
// ERROR PAGES
import Error400 from './features/pages/error/Error400';
import Error401 from './features/pages/error/Error401';
import Error403 from './features/pages/error/Error403';
import Error404 from './features/pages/error/Error404';
import Error500 from './features/pages/error/Error500';
import Error503 from './features/pages/error/Error503';

interface pageProps{
  pageTitle:String
}

function App(){

  return (
   
  
                              <Routes>
                                <Route path="/" element={<Login />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/register" element={<Register />} />
                                <Route path="error">
                                      <Route index element={<Error404/>} />
                                      <Route path="400" element={<Error400 />} />
                                      <Route path="401" element={<Error401 />} />
                                      <Route path="403" element={<Error403 />} />
                                      <Route path="404" element={<Error404 />} />
                                      <Route path="500" element={<Error500 />} />
                                      <Route path="503" element={<Error503/>} />
                              </Route>
                                  <Route element={<Prefetch/>}>
                                    {/* <Route element={<PersistLogin/>}> */}
                                      {/* <Route element={<RequireAuth allowedRoles={[1002,1003]} />} > */}
           
                                        <Route path="/dashboard" element={<Layout />} >
                                        <Route index element={<Dashboard />} />
                                      </Route>
                                    </Route>
                                  {/* </Route> */}
                                {/* </Route> */}
                                {/* <Route path="/posts/create" element={<CreatePost pageProps={{pageTitle:"Create Post"}}/>} /> */}
                                <Route path='*'  element={<Navigate to="error/404"/>}/>

                          </Routes>

         
  );
}

export default App;
