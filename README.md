# GeoCodingChallange

## Install
You first need to install several packages.

I used an Ubuntu distribution of Linux to create and host this, so all
commands will be Ubuntu based.

```
sudo apt-get intall nodejs npm nginx
```

nodejs runs the application server
npm is the package manager
nginx is the server that handles http requests to the outside world

next go to the directory you want to install the app on

```
cd /srv
```

and clone this repo

```
git clone <git url>
```

go into the directory and install all needed packages

```
cd GeoCodingChallenge
npm install
```

Included in this repo is a distribution file of the config that nginx uses
you can choose to use this as an example or configure nginx your own way

remember to restart nginx to encorporate changes

run the nodejs app from the app folder

```
nodejs ./bin/www
```
