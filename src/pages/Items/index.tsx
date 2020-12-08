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

const Items: React.FC = () => {
  const { user } = useAuth();
  const route = useRoute();
  const navigation = useNavigation();
  const params = route.params as RouteParams;

  const [items, setItems] = useState<Items[]>([]);

  useEffect(() => {
      // const chooseItem: ChooseItems[] =[
      //   {id: 1, name: 'Grupos', groupId: params.grupoId},
      //   {id: 2, name: 'Items', groupId: params.grupoId}
      // ]    
      // console.log(chooseItem);
      // setOptions(chooseItem);

    api.get('GestaoItem/api/item/' + params.grupoId).then((response) => {
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
          <UserName>{user.nome}</UserName>
        </HeaderTitle>

      </Header>

      <ItemsList
        data={items}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <ItemsListTitle>Escolha o próximo passo</ItemsListTitle>
        }
        renderItem={({ item: item }) => (
          <ItemsContainer onPress={() => handleSelectOption(item.id)}>           
            <ItemsInfo>
              <ItemsName>{item.name}</ItemsName>              
            </ItemsInfo>
          </ItemsContainer>
        )}
      />
    </Container>
  );
};

export default Items;