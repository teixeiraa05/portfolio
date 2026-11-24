# Code activity

GitHub Actions fetches GitHub and GitLab activity on pushes to `main`, every six
hours, and when you run **Refresh contribution activity** manually. It writes
each successful calendar to Directus. If one provider fails, its previous
calendar stays available and the workflow reports the failure.

The portfolio reads the daily totals and intensity levels from Directus when
opened and hourly while it stays open. The bundled calendar is used before the
first successful read. A refresh updates the live site without a rebuild or
deployment.

## Local Directus

Create an ignored `.env.directus.local` file with these settings. Use a valid
email address and a different random value for each of the three credentials.

```dotenv
DIRECTUS_URL=http://127.0.0.1:8055
DIRECTUS_ADMIN_EMAIL=admin@example.com
DIRECTUS_ADMIN_PASSWORD=
DIRECTUS_SECRET=
DIRECTUS_WRITE_TOKEN=
```

You can generate a random value with `openssl rand -hex 32`. Then start Directus
and run the setup once its login page is available at
[localhost:8055/admin](http://127.0.0.1:8055/admin).

```sh
docker compose --env-file .env.directus.local up -d
node --env-file=.env.directus.local scripts/setup-activity.mjs
npm run dev
```

The setup imports the saved calendars, enables public reads of those two
records, and creates a service account that can update them. Running setup again
preserves existing calendars and the service account's token. To rotate that
token, edit the service account in Directus and update the GitHub secret.

## Production

1. Host Directus 11 on a server with persistent storage and a public HTTPS address.
   Run the same setup script against that address with the instance's admin
   credentials and a new write token. In Directus, enable CORS and allow the
   deployed site's origin.
2. In the GitHub repository under **Settings → Secrets and variables → Actions**,
   add `DIRECTUS_URL` as a repository variable and `DIRECTUS_WRITE_TOKEN` as a
   repository secret. The workflow also uses the existing GitHub and GitLab
   secrets and the GitLab profile variable. It skips refreshes until
   `DIRECTUS_URL` is set.
3. In Vercel, set `VITE_DIRECTUS_URL` to the public Directus address and deploy.
   This URL is the only Directus setting the browser needs.
4. In GitHub **Actions → Refresh contribution activity**, choose **Run workflow**
   to publish the first live update.
