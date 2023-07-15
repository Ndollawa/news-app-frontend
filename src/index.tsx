import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import {disableReactDevTools} from '@fvilers/disable-react-devtools'
import { PersistGate } from 'redux-persist/lib/integration/react';
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import {persistStore} from 'redux-persist';
import App from './App';
import { store } from './app/stores/store';
import Error400 from './features/pages/error/Error400';
import Preloader from './components/Preloader';

function Fallback({ error, resetErrorBoundary }:FallbackProps) {
resetErrorBoundary() 

  return (
<></>
  );
}
let persistor = persistStore(store)


if(process.env.NODE_ENV === 'production') disableReactDevTools();

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
  <ErrorBoundary FallbackComponent={<Error400/>} onError={(error)=>console.log(error)}>
<Provider  store={store} >
  <PersistGate loading={<Preloader/>} persistor={persistor}>
        {/* <HelmetProvider>   */}
          <Router>
            <Routes>
              <Route path="/*" element={ <App />} />
            </Routes>
          </Router>
       {/* </HelmetProvider> */}
</PersistGate>
</Provider>
</ErrorBoundary> 
  </React.StrictMode>
);
 