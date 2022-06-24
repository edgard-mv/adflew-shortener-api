import { sign, SignOptions, verify } from "jsonwebtoken";
import { readFileSync } from "fs";
import path from "path";
import { PASS_PHRASE } from "../constants";
import Payload from "types/Payload";

export const generateToken = (payload: Partial<Payload>) => {
  if (!PASS_PHRASE) {
    throw new Error("Missing pass phrase");
  }

  const privateKey = readFileSync(path.join(__dirname, "./../../private.key"));

  if (!privateKey) {
    throw new Error("Missing private.key file");
  }

  const signInOptions: SignOptions = {
    // RS256 uses a public/private key pair. The API provides the private key
    // to generate the JWT. The client gets a public key to validate the
    // signature
    algorithm: "RS256",
    expiresIn: "24h",
  };

  return sign(
    payload,
    { key: privateKey, passphrase: PASS_PHRASE },
    signInOptions
  );
};

export const validateToken = (token: string): Promise<Payload> => {
  const publicKey = readFileSync(path.join(__dirname, "./../../public.key"));

  if (!PASS_PHRASE) {
    throw new Error("Missing pass phrase");
  }

  return new Promise((resolve, reject) => {
    verify(
      token,
      publicKey,
      {
        algorithms: ["RS256"],
        complete: true,
      },
      (error, decoded) => {
        if (error) return reject(error);

        resolve(decoded?.payload as Payload);
      }
    );
  });
};
