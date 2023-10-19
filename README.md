
1. **Generate the Private Key**:

   Use the following command to generate a 2048-bit RSA private key and save it to a file named `private-key.pem`:

   ```bash
   openssl genrsa -out private-key.pem 2048
   ```

   This command creates a 2048-bit RSA private key and stores it in the file `private-key.pem`.

2. **Extract the Public Key**:

   Use the following command to extract the public key from the `private-key.pem` file and save it to a file named `public-key.pem`:

   ```bash
   openssl rsa -in private-key.pem -pubout > public-key.pem
   ```

   This command extracts the public key from the `private-key.pem` file and redirects it to the `public-key.pem` file.

3. **Generate a Base64-encoded Private Key**:

   Use the following command to encode the private key to Base64 and save it to a file named "private-key-base64":

   ```bash
   openssl base64 -in private-key.pem -out private-key-base64.txt
   ```

   This command encodes the content of `private-key.pem` in Base64 format and saves it in a file named "private-key-base64".

4. **Generate a Base64-encoded Public Key**:

   Use the following command to encode the public key to Base64 and save it to a file named "public-key-base64":

   ```bash
   openssl base64 -in public-key.pem -out public-key-base64.txt
   ```

   This command encodes the content of `public-key.pem` in Base64 format and saves it in a file named "public-key-base64".

