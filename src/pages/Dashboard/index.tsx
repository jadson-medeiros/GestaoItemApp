import React, { useState, useEffect, useCallback } from 'react';

import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import { useAuth } from '../../hooks/auth';
import {
  Container,
  Header,
  HeaderTitle,
  UserName,
  ProfileButton,
  UserAvatar,
  ProvidersList,
  ProvidersListTitle,
  ProviderContainer,
  ProviderAvatar,
  ProviderInfo,
  ProviderName,
  ProviderMeta,
  ProviderMetaText,
} from './styles';

import Grupo from './Interfaces/Grupo';

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();
  const navigation = useNavigation();
  const [grupos, setGrupos] = useState<Grupo[]>([]);

  useEffect(() => {
    api.get('GestaoItem/api/grupo/grupos').then((response) => {
      setGrupos(response.data);
    });
  }, []);

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Bem vindo, {'\n'}
          <UserName>{user.nome}</UserName>
        </HeaderTitle>

      </Header>

      <ProvidersList
        data={grupos}
        keyExtractor={(grupo) => grupo.id}
        ListHeaderComponent={
          <ProvidersListTitle>Grupos</ProvidersListTitle>
        }
        renderItem={({ item: grupo }) => (
          <ProviderContainer >           
            <ProviderInfo>
              <ProviderName>{grupo.nome}</ProviderName>              
            </ProviderInfo>
          </ProviderContainer>
        )}
      />
    </Container>
  );
};

export default Dashboard;