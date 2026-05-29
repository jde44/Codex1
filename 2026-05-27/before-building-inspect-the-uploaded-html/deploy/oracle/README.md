# Oracle Free Tier Deployment

This app can run on an Oracle Cloud Free Tier VM as a Node/Next.js service behind Nginx.

## Target Shape

```text
Internet
  -> Oracle VCN security list opens 80/443
  -> Ubuntu VM public IP
  -> Nginx reverse proxy
  -> Next.js app on localhost:3000
  -> Supabase managed Postgres/Auth when enabled
```

## 1. Create the VM

In Oracle Cloud Infrastructure:

1. Create an Ubuntu compute instance.
2. Use an Always Free eligible shape if available.
3. Add your SSH public key.
4. In the VCN security list or network security group, allow inbound TCP `80` and `443`.
5. Keep SSH `22` limited to your IP when possible.

## 2. Install Runtime Packages

SSH into the VM:

```bash
sudo apt update
sudo apt install -y git nginx nodejs npm
node --version
npm --version
```

Use Node 22 LTS or newer for this project. If Ubuntu's default Node is older, install Node from NodeSource before building.

## 3. Upload or Clone the App

Recommended path:

```bash
sudo mkdir -p /opt/veris
sudo chown -R ubuntu:ubuntu /opt/veris
cd /opt/veris
git clone <your-repo-url> .
```

If this is not in Git yet, copy the project folder to `/opt/veris` with `scp` or `rsync`.

## 4. Configure Environment

```bash
cp .env.example .env.production
nano .env.production
```

For the current mock-data build, Supabase values can remain blank. When Supabase is connected, set:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

## 5. Build and Start

```bash
npm install
npm run test
npm run build
sudo cp deploy/oracle/veris.service /etc/systemd/system/veris.service
sudo systemctl daemon-reload
sudo systemctl enable veris
sudo systemctl start veris
sudo systemctl status veris
```

## 6. Configure Nginx

```bash
sudo cp deploy/oracle/nginx.veris.conf /etc/nginx/sites-available/veris
sudo ln -s /etc/nginx/sites-available/veris /etc/nginx/sites-enabled/veris
sudo nginx -t
sudo systemctl reload nginx
```

Visit:

```text
http://<oracle-public-ip>
```

## 7. Optional Domain and HTTPS

Point a DNS `A` record to the Oracle public IP, then install Certbot:

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## 8. Operational Checks

```bash
curl -I http://localhost:3000
curl -I http://<oracle-public-ip>
sudo journalctl -u veris -f
sudo tail -f /var/log/nginx/access.log
```

## Notes

- Do not put service role keys in public client code.
- Keep Oracle ingress to `80`, `443`, and tightly restricted `22`.
- Add Supabase RLS before enabling real member data.
- Keep mock records scrubbed of confidential client data.
