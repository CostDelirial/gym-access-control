import bcrypt from 'bcrypt'

export class DataHasher {
  private static readonly SALT_ROUNDS = 10

  static async hashPassword(plainPassword: string): Promise<string> {
   
    if (!plainPassword || plainPassword.trim().length === 0) {
      throw new Error("La contraseña es requerida")
    }
    if (Buffer.byteLength(plainPassword, 'utf8') > 72) {
      throw new Error("La contraseña es demasiado larga (máx. 72 bytes)")
    }
    return bcrypt.hash(plainPassword, DataHasher.SALT_ROUNDS)
  }

  static async comparePassword(plainPassword: string, storedHash: string): Promise<boolean> {

    if (!plainPassword || !storedHash) return false
    try {
      return await bcrypt.compare(plainPassword, storedHash)
    } catch {
      return false
    }
  }
}