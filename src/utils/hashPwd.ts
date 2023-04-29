import { hash } from 'bcrypt';

export const hashPwd = async (password: string): Promise<string> => {
  return hash(password, 10);
};