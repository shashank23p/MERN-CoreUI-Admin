# Mern CoreUI Admin
Template for MERN Admin Dashboard with CoreUI, React and Redux with Refresh JWT Token login implementation.

## Installation:
**1) Pull Git Repo**
```bash
git pull https://github.com/shashank23p/MERN-CoreUI-Admin
```
**2) Install both React Client and Node Server dependencies**
```bash
npm run install-both
```
**3) Create mongoDB and create collection users and insert a dummy admin user data**
```json
{
    "group": "admin",
    "is_admin": true,
    "name": "admin",
    "email": "admin@admin.com",
    "password": "$2a$10$p3uvFJkPVJ.hsOaU7o2FDeCyQZLi4LqkHCvk5u2oksWNzYlzOmyhy",
    "date": {
        "$date": "2020-07-24T23:01:01.465Z"
    }
}
```
**4) Create file with name .env in root folder and add following details**
```bash
DB_CONNECTION= mongoConnectionString
TOKEN_SEC= authTokenSecret
TOKEN_EXPIRY=10m // token expiration_time
REFRESH_SEC= refreshTokenSecret  //must be diffent from TOKEN_SEC
```
**5) Running developer servers**
run dev server for both React and node. Node server will start on port 5000 and react dev server on port 3000
```bash
npm start
```
you can also run only node server using 
```bash
npm run server
```
