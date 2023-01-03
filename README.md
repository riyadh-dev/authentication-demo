# <img src="./packages/client/public/logo512.png" width="24"/> Authentication Demo

An Auth demo using HTTPOnly cookies and CSRF protection

<p align="center">
    <img src="https://riyadh-dev.github.io/portfolio-website-react/images/authentication-demo/2.png" width="90%"/>
<p>

**Live preview:** [Authentication Demo](https://authentication-demo.up.railway.app/)

## Installation

Use the package manager [yarn](https://classic.yarnpkg.com/en/docs/install#windows-stable) project dependencies.

```bash
yarn
```

You also need a running local instance of mongodb server, or if you are using a remote instance change the **MONGODB_URI** in .env.development

`.env.development`

```.env
MONGODB_URI=<past your uri here>
```

## Usage

```bash
# start dev backend server
yarn server start:dev

# start dev backend server with debugging
yarn server start:debug

# start dev client server
yarn client start
```

You can check other scripts in `package.json` of the root repo and each package