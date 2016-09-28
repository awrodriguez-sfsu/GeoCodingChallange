# GeoCodingChallange

## Overview
This was a good coding challenge as I have never used NodeJS

I chose to do so because I wanted a challenge and several people that
I know have been clamoring on about how awesome it is.

The API is build as the background of this project and can be accessed by
going to www.awrodriguez.com/list

It can take several different get parameters depending on what information you want.

?address=<address>

?lat=37.7&lng=-122.3

it also handles an optional ?distance parameter that wil default to 20

I ended up having to add another functionality to get a specific property from
a list when I needed it in the front end.

/list/property/:id

The UI is built on top of this API and I decided to go with a single page app
mostly because I have never done one.

The tools that I used were:
Bootstrap: front and css ui
NodeJS: application server
GoogleMapsAPI: reverse geo coding address to lat lng
JQuery: front end DOM
npm packages that can be found in package.json

## Install
You first need to install several packages.

I used an Ubuntu distribution of Linux to create and host this, so all
commands will be Ubuntu based.

```
sudo apt-get intall nodejs npm
```

nodejs runs the application server
npm is the package manager

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

run the nodejs app from the app folder each on a different terminal

```
npm run-script run-service
npm run-script run-client
```

Navigate to localhost:3000 for client
Navigate to localhost:3001 for serviceg
