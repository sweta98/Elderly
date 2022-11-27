# Elderly
## File Strcture
.
├── README.md
├── app.js
├── backend
│   ├── controllers =====> backend utility functions
│   │   ├── bannedUsername.js
│   │   ├── encryptor.js
│   │   └── errorHandler.js
│   ├── models: =====> classes
│   │   └── User.js
│   ├── routes: =====> routes and apis
│   │   ├── router.js
│   │   └── users.js
│   ├── services: =====> Database
│   │   ├── DAO.js
│   │   ├── dbMongo.js
│   │   └── mongoose =====> Mongoose Schema
│   │       └── userModel.js
│   └── sockets
│       └── socket.js
├── frontend
│   ├── css
│   │   ├── bootstrap.min.css
│   │   ├── bulma.min.css
│   │   └── login.css
│   ├── img
│   │   ├── background_2.jpg
│   │   ├── pwd.png
│   │   ├── tartans.png
│   │   └── usr.png
│   ├── js
│   ├── utils
│   │   └── user.js
│   └── views
│       └── index.html
├── package-lock.json
└── package.json