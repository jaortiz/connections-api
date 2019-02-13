import crypto from "crypto";

export const decrypt = encrypted => {
  const decipher = crypto.createDecipher("aes192", "secretCipher");
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};
