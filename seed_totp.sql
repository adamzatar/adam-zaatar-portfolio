CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Example user ID (use the same one in both places)
-- 11111111-1111-1111-1111-111111111111

INSERT INTO "users" ("id","username","status","createdAt")
VALUES ('11111111-1111-1111-1111-111111111111','seed','active', NOW())
ON CONFLICT ("id") DO NOTHING;

-- Insert TOTP secret (raw bytes; NOT base32)
-- secretCiphertext = ASCII bytes for "12345678901234567890"
INSERT INTO totp_secrets
  ("id","userID","secretCiphertext","version","revoked","createdAt")
VALUES
  (gen_random_uuid(),
   '11111111-1111-1111-1111-111111111111',
   E'\\x3132333435363738393031323334353637383930',
   2,
   FALSE,
   NOW());
