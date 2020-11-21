import User from '../Interfaces/User';
import SignInCredentials from '../Interfaces/SignInCredentials';

export default interface AuthContextData {
  user: User;
  loading: boolean;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}
