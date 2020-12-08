import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import  ChooseItems  from '../ChooseNextStep/Interfaces/ChooseItems';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  padding: 24px;
  padding-top: ${getStatusBarHeight() + 24}px;
  background: #28262e;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderTitle = styled.Text`
  color: #f4ede8;
  font-size: 20px;
  font-family: 'RobotoSlab-Regular';
  line-height: 28px;
`;

export const UserName = styled.Text`
  color: #ff9000;
  font-family: 'RobotoSlab-Medium';
`;

export const ChooseItemsList = styled(
  FlatList as new () => FlatList<ChooseItems>,
).attrs({
  contentContainerStyle: {
    paddingTop: 32,
    paddingBottom: 16,
    paddingHorizontal: 24,
  },
})``;

export const ChooseItemsListTitle = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: #f4ede8;
  font-size: 24px;
  margin-bottom: 24px;
`;

export const ChooseItemsContainer = styled(RectButton)`
  flex-direction: row;
  align-items: center;
  padding: 20px;
  margin-bottom: 16px;
  background: #3e3b47;
  border-radius: 10px;
`;

export const ChooseItemsInfo = styled.View`
  flex: 1;
  margin-left: 20px;
`;

export const ChooseItemsName = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 18px;
  color: #f4ede8;
`;
