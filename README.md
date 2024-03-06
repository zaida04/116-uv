# 116 autolab output uploader

This is used for `cse116` to see compilation err on student submissions without leaking the output to the students.

## Deploying API
1. Install [bun](https://bun.sh) & [Node.JS](https://nodejs.org)
2. Install pm2 `bun install --global pm2`
3. Clone this repo `git clone https://github.com/zaida04/116-uv.git`
4. `cd 116-uv/api`
5. Install dependencies `bun install`
6. Run database migrations `bun run migrate:run`
6. Deploy `pm2 start`
  
You can set a port by using a `.env` file in the `api/` folder with `PORT`.  
You can test it by doing `curl http://localhost:3000`.  
You can view the database at `sqlite.db`

## Deploying Reverse Proxy
1. Install [Caddy](https://caddyserver.com)
2. Assume you've already cloned this repo.
3. `cd 116-uv/reverse_proxy`
4. `sudo caddy start`
  
You can test it by doing `curl http://localhost`. If you want to use the subdomain, you'll need to set up a DNS record to point to your server. 
  
We use cloudflare, so we set up a `A` record to point to our server for the `ta-api.trc.lol` subdomain. Make sure the cloud is set to orange (that means cloudflare is proxying our records). Make sure your SSL setting is set to `Full (Strictest)`.  

## Deploying Frontend

I'm using vercel, so it's as simple as making a project and deploying the frontend dir.


# License

Created by Zaid, usable/modifiable by any instructor/TA staff in cse116 at SUNY University at Buffalo. Anyone else, nope.