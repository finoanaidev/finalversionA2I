import { useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const useCheckAuth = () => {
  const { setLoginState } = useAuth();

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.post('http://localhost:5000/api/auth/verifyToken', {}, {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (response.data.isValid) {
            setLoginState(true, response.data.role);
          } else {
            localStorage.removeItem('token');
            setLoginState(false, null);
          }
        } catch (error) {
          console.error('Error verifying token:', error);
          localStorage.removeItem('token');
          setLoginState(false, null);
        }
      }
    };

    verifyToken();
  }, [setLoginState]);
};

export default useCheckAuth;