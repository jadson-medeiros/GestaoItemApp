import React, { useState, useEffect, useCallback } from 'react';

import { useNavigation, useRoute } from '@react-navigation/native';

import RouteParams from './Interfaces/RouteParams'
import ChooseItems from './Interfaces/ChooseItems'

import { useAuth } from '../../hooks/auth';
import {
  Container,
  Header,
  HeaderTitle,
  UserName,
  ChooseItemsList,
  ChooseItemsListTitle,
  ChooseItemsContainer,
  ChooseItemsInfo,
  ChooseItemsName,
} from './styles';

const ChooseNextStep: React.FC = () => {
  const { user } = useAuth();
  const route = useRoute();
  const navigation = useNavigation();
  const params = route.params as RouteParams;

  const [options, setOptions] = useState<ChooseItems[]>([]);

  useEffect(() => {
      const chooseItem: ChooseItems[] =[
        {id: 1, name: 'Grupos', groupId: params.groupId },
        {id: 2, name: 'Itens', groupId: params.groupId }
      ]    
      setOptions(chooseItem);
  }, []);

  const handleSelectOption = useCallback(
    (option: ChooseItems) => {
      if (option.name === 'Itens')  {
        navigation.navigate('Items', { groupId : option.groupId, groupName : params.groupName });
      } else {
        navigation.navigate('Groups', { groupId : option.groupId, groupName : params.groupName });
      }
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

      <ChooseItemsList
        data={options}
        keyExtractor={(option) => option.id}
        ListHeaderComponent={
          <ChooseItemsListTitle>Escolha o próximo passo para o grupo { params.groupName } </ChooseItemsListTitle>
        }
        renderItem={({ item: option }) => (
          <ChooseItemsContainer onPress={() => handleSelectOption(option)}>           
            <ChooseItemsInfo>
              <ChooseItemsName>{option.name}</ChooseItemsName>              
            </ChooseItemsInfo>
          </ChooseItemsContainer>
        )}
      />
    </Container>
  );
};

export default ChooseNextStep;