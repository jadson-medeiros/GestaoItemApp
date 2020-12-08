import React, { useState, useEffect, useCallback } from 'react';

import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import { useAuth } from '../../hooks/auth';

import {
  Container,
  Header,
  HeaderTitle,
  UserName,
  GroupList,
  GroupListTitle,
  GroupContainer,
  GroupInfo,
  GroupName,
} from './styles';

import Grupo from './Interfaces/Grupo';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [grupos, setGrupos] = useState<Grupo[]>([]);

  useEffect(() => {
    api.get('GestaoItem/api/grupo/grupos').then((response) => {
      setGrupos(response.data);
    });
  }, []);

  const handleSelectGroup = useCallback(
    (group: Grupo) => {
      navigation.navigate('ChooseNextStep', { groupId: group.id, groupName: group.nome });
    },
    [navigation],
  );

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Bem vindo, {'\n'}
          <UserName>{user.nome}</UserName>
        </HeaderTitle>
      </Header>

      <GroupList
        data={grupos}
        keyExtractor={(group) => group.id}
        ListHeaderComponent={
          <GroupListTitle>Grupos</GroupListTitle>
        }
        renderItem={({ item: group }) => (
          <GroupContainer onPress={() => handleSelectGroup(group)}>           
            <GroupInfo>
              <GroupName>{group.nome}</GroupName>              
            </GroupInfo>
          </GroupContainer>
        )}
      />
    </Container>
  );
};

export default Dashboard;