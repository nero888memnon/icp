import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

/**
 * Generates a secure AES-256 secret key
 * @returns {string} A 32-byte base64-encoded secret key
 */
export function generateSecretKey(): string {
  const secretKey = crypto.randomBytes(32).toString('base64');
  return secretKey;
}

/**
 * Generates an RSA key pair (Public and Private keys)
 * @returns {Promise<{ publicKey: string, privateKey: string }>}
 */
export async function generateRSAKeyPair(): Promise<{ publicKey: string; privateKey: string }> {
  return new Promise((resolve, reject) => {
    crypto.generateKeyPair(
      'rsa',
      {
        modulusLength: 2048,
        publicKeyEncoding: { type: 'spki', format: 'pem' },
        privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
      },
      (err, publicKey, privateKey) => {
        if (err) reject(err);
        resolve({ publicKey, privateKey });
      }
    );
  });
}

/**
 * Generates an ECDSA key pair (Public and Private keys)
 * @returns {Promise<{ publicKey: string, privateKey: string }>}
 */
export async function generateECDSAKeyPair(): Promise<{ publicKey: string; privateKey: string }> {
  return new Promise((resolve, reject) => {
    crypto.generateKeyPair(
      'ec',
      {
        namedCurve: 'P-256',
        publicKeyEncoding: { type: 'spki', format: 'pem' },
        privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
      },
      (err, publicKey, privateKey) => {
        if (err) reject(err);
        resolve({ publicKey, privateKey });
      }
    );
  });
}

/**
 * Generates an EdDSA (Ed25519) key pair (Public and Private keys)
 * @returns {Promise<{ publicKey: string, privateKey: string }>}
 */
export async function generateEdDSAKeyPair(): Promise<{ publicKey: string; privateKey: string }> {
  return new Promise((resolve, reject) => {
    crypto.generateKeyPair(
      'ed25519',
      {
        publicKeyEncoding: { type: 'spki', format: 'pem' },
        privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
      },
      (err, publicKey, privateKey) => {
        if (err) reject(err);
        resolve({ publicKey, privateKey });
      }
    );
  });
}

/**
 * Writes a secret key to the .env file
 * @param {string} keyName - The name of the key to store in .env
 * @param {string} keyValue - The value of the key to store in .env
 */
export function writeKeyToEnvFile(keyName: string, keyValue: string): void {
  const envPath = path.join(process.cwd(), '.env');
  const keyEntry = `\n${keyName}=${keyValue}\n`;

  if (!fs.existsSync(envPath)) {
    fs.writeFileSync(envPath, keyEntry);
  } else {
    fs.appendFileSync(envPath, keyEntry);
  }

  console.log(`${keyName} has been added to the .env file.`);
}

/**
 * Example usage (for testing and generating keys)
 */
async function runExample() {
  try {
    console.log('🔐 Generating AES-256 Secret Key...');
    const secretKey = generateSecretKey();
    writeKeyToEnvFile('AES_SECRET_KEY', secretKey);
    console.log('AES-256 Secret Key:', secretKey);

    console.log('\n🔐 Generating RSA Key Pair...');
    const rsaKeys = await generateRSAKeyPair();
    writeKeyToEnvFile('RSA_PUBLIC_KEY', rsaKeys.publicKey);
    writeKeyToEnvFile('RSA_PRIVATE_KEY', rsaKeys.privateKey);
    console.log('RSA Public Key:', rsaKeys.publicKey);
    console.log('RSA Private Key:', rsaKeys.privateKey);

    console.log('\n🔐 Generating ECDSA Key Pair...');
    const ecdsaKeys = await generateECDSAKeyPair();
    writeKeyToEnvFile('ECDSA_PUBLIC_KEY', ecdsaKeys.publicKey);
    writeKeyToEnvFile('ECDSA_PRIVATE_KEY', ecdsaKeys.privateKey);
    console.log('ECDSA Public Key:', ecdsaKeys.publicKey);
    console.log('ECDSA Private Key:', ecdsaKeys.privateKey);

    console.log('\n🔐 Generating EdDSA (Ed25519) Key Pair...');
    const eddsaKeys = await generateEdDSAKeyPair();
    writeKeyToEnvFile('EDDSA_PUBLIC_KEY', eddsaKeys.publicKey);
    writeKeyToEnvFile('EDDSA_PRIVATE_KEY', eddsaKeys.privateKey);
    console.log('EdDSA Public Key:', eddsaKeys.publicKey);
    console.log('EdDSA Private Key:', eddsaKeys.privateKey);
  } catch (error) {
    console.error('❌ Error generating keys:', error);
  }
}

// Uncomment this line to test the key generation and storage
// runExample();
