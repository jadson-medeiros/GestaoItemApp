import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';
import { Alert } from 'react-native';

import AuthState from './Interfaces/AuthState';
import AuthContextData from './Interfaces/AuthContextData';

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStoragedData(): Promise<void> {
      const [token, user] = await AsyncStorage.multiGet([
        '@GestaoItemApp:token',
        '@GestaoItemApp:user',
      ]);

      if (token[1] && user[1]) {
        api.defaults.headers.authorization = `Bearer ${token[1]}`;

        setData({ token: token[1], user: JSON.parse(user[1]) });
      }

      setLoading(false);
    }

    loadStoragedData();
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    console.log(email);
    const response = await api.post('GestaoItem/api/user/auth', {
      email,
      password,
    });

    const { nome, user, token } = response.data;

    if (token === '200')  {
      Alert.alert("Sucesso!",
      'Login realizado com sucesso.');
    }

    await AsyncStorage.multiSet([
      ['@GestaoItemApp:nome', nome],
      ['@GestaoItemApp:user', JSON.stringify(user)],
    ]);

    //api.defaults.headers.authorization = `Bearer ${token[1]}`;

    setData({ token, user });
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@GestaoItemApp:user', '@GestaoItemApp:token']);

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
