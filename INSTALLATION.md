# Self hosting

Here is the instructions to deploy KUKU on your local machine.

1.  First clone ([Kuku](https://github.com/hyuse202/KUKU)) to your local machine.

   Run these to install all the independencies:

   ```bash
   cd KUKU

   npm i
   ```
2.   After that, rename `.env-example` to `.env` and fill all the variables

   ```
   See https://docs.anify.tv/start#api-keys

   NEXT_PUBLIC_ANIFY_KEY=
  ```
3.   Then, run these to start the server

   ```bash
   npm run build

  npm run format
   ```
The website should start on `http://localhost:3000`.

