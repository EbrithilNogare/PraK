# Install and run

## Install and configure nginx
### Download from
[nginx.com](https://www.nginx.com/)

### Create config
in `.../ChocoInstallFolder/nginx-x.xx.x/conf/nginx.conf`

with this code, where paths are altered to your system
```
server {
    listen 50080 default_server;
    server_name _;

    # React app & frontend files
    location /prak/ {
        root C:/dev/PraK/frontend/build/;
        rewrite ^ /index.html break;
    }

    location /prak/static/{ alias C:/dev/PraK/frontend/build/static/; }
    location /prak/images/{ alias C:/dev/PraK/frontend/build/images/; }
    location /prak/locales/{ alias C:/dev/PraK/frontend/build/locales/; }
    location /prak/public/{ alias C:/dev/PraK/frontend/build/public/; }
    location /prak/modules/{ alias C:/dev/PraK/modules/; }
    location /prak/uploads/{ alias C:/dev/PraK/uploads/; }

    # node API reverse proxy
    location /prak/api/ { proxy_pass http://localhost:50081/; }
}
```

and apply it
linux: `sudo systemctl reload nginx`
windows: `nginx -s reload`

### Create and fill ./backend/.env
```
DBUsername = 
DBPassword = 
DBName = 

GMAILusername = 
GMAILpassword = 
```

### Run in project root
```
# frontend npm install
cd frontend
npm install

# frontend build
npm run build

# backend npm install
cd ../backend
npm install
node server
```

### DONE
run at [localhost:50080/prak/](http://localhost:50080/prak/)
