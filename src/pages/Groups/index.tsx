import React, { useState, useEffect, useCallback } from 'react';

import { useNavigation, useRoute } from '@react-navigation/native';
import api from '../../services/api';

import RouteParams from './Interfaces/RouteParams'
import Group from './Interfaces/Group'

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

const Groups: React.FC = () => {
  const { user } = useAuth();
  const route = useRoute();
  const navigation = useNavigation();
  const params = route.params as RouteParams;

  const [groups, setGroups] = useState<Group[]>([]);

  useEffect(() => {
    api.get('GestaoItem/api/grupo/grupos/' + params.groupId).then((response) => {
      setGroups(response.data);
    });
  }, []);

  const handleSelectOption = useCallback(
    (groupId: number) => {
      navigation.navigate('ChooseNextStep', { groupId });
    },
    [navigation],
  );

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Bem vindo, {'\n'}
          <UserName>{ user.nome }</UserName>
        </HeaderTitle>
      </Header>

      <GroupList
        data={groups}
        keyExtractor={(group) => group.id}
        ListHeaderComponent={
          <GroupListTitle>Grupos do grupo { params.groupName  }</GroupListTitle>
        }
        renderItem={({ item: group }) => (
          <GroupContainer onPress={() => handleSelectOption(group.id)}>           
            <GroupInfo>
              <GroupName>{ group.nome }</GroupName>              
            </GroupInfo>
          </GroupContainer>
        )}
      />
    </Container>
  );
};

export default Groups;