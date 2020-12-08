import React, { useState, useEffect, useCallback } from 'react';

import { useNavigation, useRoute } from '@react-navigation/native';

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

  const [options, setOptions] = useState<Items[]>([]);

  useEffect(() => {
      // const chooseItem: ChooseItems[] =[
      //   {id: 1, name: 'Grupos', groupId: params.grupoId},
      //   {id: 2, name: 'Items', groupId: params.grupoId}
      // ]    
      // console.log(chooseItem);
      // setOptions(chooseItem);
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
        data={options}
        keyExtractor={(option) => option.id}
        ListHeaderComponent={
          <ItemsListTitle>Escolha o próximo passo</ItemsListTitle>
        }
        renderItem={({ item: option }) => (
          <ItemsContainer onPress={() => handleSelectOption(option.id)}>           
            <ItemsInfo>
              <ItemsName>{option.name}</ItemsName>              
            </ItemsInfo>
          </ItemsContainer>
        )}
      />
    </Container>
  );
};

export default Items;