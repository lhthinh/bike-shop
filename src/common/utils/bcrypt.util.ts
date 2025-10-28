import bcrypt from 'bcrypt'

// Mã hóa mật khẩu
export const encryptPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10)
}

export const comparePassword = async (
  password: string,
  encryptedPassword: string,
) => {
  return await bcrypt.compare(password, encryptedPassword)
}
