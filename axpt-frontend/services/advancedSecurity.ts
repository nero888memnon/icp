import crypto from 'crypto'

/**
 * Hashes a message using SHA-256
 * @param {string} message - The message to hash
 * @returns {string} The SHA-256 hash of the message
 */
export function hashMessage(message: string): string {
  return crypto.createHash('sha256').update(message).digest('hex')
}

/**
 * Signs a message using RSA private key
 * @param {string} message - The message to sign
 * @param {string} privateKey - The private key in PEM format
 * @returns {string} The signature (base64 encoded)
 */
export function signMessageWithRSA(message: string, privateKey: string): string {
  const sign = crypto.createSign('SHA256')
  sign.update(message)
  sign.end()
  const signature = sign.sign(privateKey, 'base64')
  return signature
}

/**
 * Verifies a signature using RSA public key
 * @param {string} message - The message that was signed
 * @param {string} signature - The signature to verify
 * @param {string} publicKey - The public key in PEM format
 * @returns {boolean} True if the signature is valid, false otherwise
 */
export function verifySignatureWithRSA(message: string, signature: string, publicKey: string): boolean {
  const verify = crypto.createVerify('SHA256')
  verify.update(message)
  verify.end()
  return verify.verify(publicKey, signature, 'base64')
}

/**
 * Generates a Zero-Knowledge Proof (ZKP) using a random secret
 * @param {string} secret - The secret value
 * @returns {object} A proof object containing the commitment and challenge
 */
export function generateZeroKnowledgeProof(secret: string) {
  const commitment = crypto.createHash('sha256').update(secret).digest('hex')
  const challenge = crypto.randomBytes(32).toString('hex')
  const response = crypto.createHash('sha256').update(commitment + challenge).digest('hex')

  return { commitment, challenge, response }
}
