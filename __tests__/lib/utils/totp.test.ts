import { describe, it, expect } from 'jest'
import { generateTOTP } from '@/lib/utils/totp'

describe('TOTP Utils', () => {
  it('should generate a valid TOTP code', () => {
    const secret = 'JBSWY3DPEHPK3PXP'
    const code = generateTOTP(secret)
    expect(code).toHaveLength(6)
    expect(Number(code)).not.toBeNaN()
  })
})