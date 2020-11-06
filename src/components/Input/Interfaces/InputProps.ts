import { TextInputProps } from 'react-native';

export default interface InputProps extends TextInputProps {
  name: string;
  icon: string;
}
