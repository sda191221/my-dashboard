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
import { QueryClient, QueryClientProvider } from 'react-query';


// 4,5, 12,13, 14, 16  signIn validation and field
const queryClient = new QueryClient();

const App = () => {


  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div >
            <Sidebar className='sidebar' />
            <Main className='main'>

              <Routes>
                <Route key="users" path="/" element={<Users />} />

                <Route key="gallery" path="/gallery" element={<Gallery />} />

                <Route key="weather" path="/weather" element={<Weather />} />
                <Route key="signin" path="/signIn" element={<SignIn />} />

                <Route key="signup" path="/signUp" element={<SignUp />} />
                <Route key="signout" path="/signOut" element={<SignIn />} />

              </Routes>

            </Main>
          </div>
        </Router >
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;