import { Encrypter } from '@app/cryptography/encrypter'
import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class JwtEncrypter implements Encrypter {
  constructor(private jwtService: JwtService) { }

  encrypt(payload: Record<string, unknown>, options: { expiresIn: string | number }): Promise<string> {
    return this.jwtService.signAsync(payload, options)
  }
}