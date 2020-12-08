import React, { useState, useEffect, useCallback } from 'react';

import { useNavigation, useRoute } from '@react-navigation/native';
import api from '../../services/api';

import RouteParams from './Interfaces/RouteParams'
import Item from './Interfaces/Item'

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
  ItemsMeta,
  ItemsMetaText
} from './styles';

const Items: React.FC = () => {
  const { user } = useAuth();
  const route = useRoute();
  const navigation = useNavigation();
  const params = route.params as RouteParams;

  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    api.get('GestaoItem/api/item/' + params.groupId).then((response) => {
      setItems(response.data);
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

      <ItemsList
        data={items}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <ItemsListTitle>Itens do grupo { params.groupName }</ItemsListTitle>
        }
        renderItem={({ item: item }) => (
          <ItemsContainer onPress={() => handleSelectOption(item.id)}>     
            <ItemsMeta>
              <ItemsMetaText>{ item.codigoComprasnet }</ItemsMetaText>              
            </ItemsMeta>      
            <ItemsInfo>
              <ItemsName>{ item.nome }</ItemsName>              
            </ItemsInfo>
          </ItemsContainer>
        )}
      />
    </Container>
  );
};

export default Items;