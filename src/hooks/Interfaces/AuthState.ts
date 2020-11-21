import User from '../Interfaces/User';

export default interface AuthState {
  token: string;
  user: User;
}