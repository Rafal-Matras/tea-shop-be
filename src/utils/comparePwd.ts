import { compare } from 'bcrypt';

export const comparePwd = async (password: string, hashPwd: string): Promise<boolean> => {
  return compare(password, hashPwd);
};