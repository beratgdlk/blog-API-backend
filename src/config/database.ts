/**
 * @deprecated Bu dosya bakım amaçlı tutulmaktadır. 
 * Yeni çalışmalarda prisma.ts dosyasını kullanın.
 */
import prisma from './prisma.js';

// Uyumluluk için db değişkenini export ediyoruz
// Ancak yeni implementasyonlarda doğrudan prisma istemcisini kullanın
const db = prisma;

export { db };