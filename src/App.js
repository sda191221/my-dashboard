import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import Weather from './components/Weather/Weather';
import { ReactQueryDevtools } from 'react-query/devtools';
import Gallery from './components/Gallery/Gallery';
import Users from './components/Users/Users';
import SignIn from './components/SignIn_SignUp/SignIn/SignIn';
import SignUp from './components/SignIn_SignUp/SignUp/SignUp';
import Main from './components/Main'
import AuthProvider from './auth/AuthProvider';
// import { useContext } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import './App.css';

const queryClient = new QueryClient();

const App = () => {

  // const handleSignOut = () => {
  //   onSignOut(setIsLoggedIn);
  // };
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div style={{ display: 'flex', flexWrap: 'nowrap' }}>
            <Sidebar />
            <Main>
              <div style={{ flexGrow: 1, paddingLeft: '300px', paddingTop: '100px', overflow: 'auto' }}>
                <Routes>
                  <Route path="/" element={<Users />} />

                  <Route path="/gallery" element={<Gallery />} />

                  <Route path="/weather" element={<Weather />} />
                  <Route path="/signIn" element={<SignIn />} />

                  <Route path="/signUp" element={<SignUp />} />
                  <Route path="/signOut" element={<SignIn />} />

                </Routes>
              </div>
            </Main>
          </div>
        </Router >
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
