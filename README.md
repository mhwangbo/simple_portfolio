# Simple-portfolio Website
Very simple portfolio website for artist. Built using a MERN stack.

### [Site Link](https://simple-portfolio-hs.herokuapp.com/collection "Site Link")

### Features

------------
- [ ] User Update
- [x] Portfolio Update
- [x] Site Info Update
- [x] Horizontal Scroll
	- [ ] Change image size
	- [ ] Change number of rows

### Usage

------------
####  Env Variables
Create a .env file in the root and add the following variables

	NODE_ENV = development   // production for deployment
	PORT = 5000
	MONGO_URL = {mongodb uri} 
	JWT_SECRET = {token string}

### Install Dependencies

	npm install
	cd frontend
	npm install

### Run
 run frontend and backend
`npm run dev `
or
`npm run server`
`npm run client` 

### Build & Deploy

	cd frontend
	npm run build

project is initially setup for heroku

#### Used versions
- Node: 14.15.3
- npm: 6.14.9
- react.js: 17.0.1
