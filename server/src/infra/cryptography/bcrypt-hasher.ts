import { hash, compare } from 'bcrypt'
import { HashComparer } from '@app/cryptography/hash-comparer'
import { HashGenerator } from '@app/cryptography/hash-generator'
import { Injectable } from '@nestjs/common'

@Injectable()
export class BcryptHasher implements HashGenerator, HashComparer {
  private HASH_SALT_LENGTH = 8

  hash(plain: string): Promise<string> {
    return hash(plain, this.HASH_SALT_LENGTH)
  }

  compare(plain: string, hash: string): Promise<boolean> {
    return compare(plain, hash)
  }
}