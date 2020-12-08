import React, { useState, useEffect, useCallback } from 'react';

import { useNavigation, useRoute } from '@react-navigation/native';
import api from '../../services/api';

import RouteParams from './Interfaces/RouteParams'
import Items from './Interfaces/Items'

import { useAuth } from '../../hooks/auth';
import {
  Container,
  Header,
  HeaderTitle,
  UserName,
  ItemsList,
  ItemsListTitle,
  ItemsContainer,
  ItemsInfo,
  ItemsName,
} from './styles';

const Groups: React.FC = () => {
  const { user } = useAuth();
  const route = useRoute();
  const navigation = useNavigation();
  const params = route.params as RouteParams;

  const [groups, setGroups] = useState<Items[]>([]);

  useEffect(() => {
    api.get('GestaoItem/api/grupo/grupos/' + params.grupoId).then((response) => {
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
          <UserName>{user.nome}</UserName>
        </HeaderTitle>

      </Header>

      <ItemsList
        data={groups}
        keyExtractor={(group) => group.id}
        ListHeaderComponent={
          <ItemsListTitle>Escolha o próximo passo</ItemsListTitle>
        }
        renderItem={({ item: group }) => (
          <ItemsContainer onPress={() => handleSelectOption(group.id)}>           
            <ItemsInfo>
              <ItemsName>{group.name}</ItemsName>              
            </ItemsInfo>
          </ItemsContainer>
        )}
      />
    </Container>
  );
};

export default Groups;