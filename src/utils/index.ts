import * as bcrypt from 'bcrypt';

const isPasswordMatch = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

export { isPasswordMatch };
