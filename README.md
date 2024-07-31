# Frontend codebase template

This repository serves as a codebase template for creating frontend portions of websites.  All that actually means is that I've collected a number of tools together and configured most if not all of them.  This means you can spend less time on setup and more time developing.  I've put a few examples together as well, in addition to some other standard UI components that typically come in handy.

## Getting Started
Although this project puts a number of things together for you, there are a few manual steps you have to do first.

(Pre-reqs: make sure you have nodejs, webpack, and typescript installed)
1. Copy the `./.env.example` file into a new `./.env` file, this is an env file used to store environment variables and is required to run your builds.
2. In the home directory of the project, run the following:
```
npm install
npm run build
npm run local
```
3. At this point your local server should be running, and you should be able to access it on your device's browser using the url [localhost:8080](http://localhost:8080).

After you verify the website it up, you then know everything is installed, setup, and works! You can start developing a website.

### Workflow advice
I suggest opening two terminals at the project directory.  One to host the server (ie running 'npm run local').  The other will watch the frontend code and build on any changes to the frontend code (run 'npm run WP:watch').  This way you don't have to keep running the build command every time you make a change.

For faster build time ensure `NODE_ENV='development'` is in your `./.env` file.  Switch it to `NODE_ENV='production'` to slim down your compiled files in the `./public` directory.

## Tools / Packages / Frameworks
You can just look at the `./package.json` file to know for sure what tools/packages/frameworks are being used, but I want to explicitely list out some important ones.

This codebase uses [react](https://react.dev/), [tailwindcss](https://tailwindcss.com/), and [daisyui](https://daisyui.com/).  See their website docs for more information.

For development purposes, it runs on a simple expressjs server.  I promise you it really should only be used for development, since it would be kinda shit otherwise.

## Codebase Structure
Although the project actually has more files/directories, these are the ones you'll most likely interact with the most (or are good examples for explanation).  I would highly recommend ignoring the config files as much as you can, they're finicky and super annoying.
```
.
├── .env                            (1)
├── public - - - - - - - - - - - - -(2)
│   └── index.html                  (3)
├── server.js - - - - - - - - - - - (4)
├── src                             (5)
│   ├── general - - - - - - - - - - (6)
│   │   └── *
│   └── landing                     (7)
│       ├── exampleComponent.tsx - -
│       ├── landing.css
│       └── landing.tsx - - - - - - (8)
├── tailwind.config.landing.js      (9)
└── webpack.config.js - - - - - - -(10)
```
1. The `./.env` file is used to store environment variables and is required to run your builds.
2. The `./public` directory is where all public (ie, browser [except for maybe the server.js file?]) facing files are.  The build process will create/compile files, and place them in this directory.
3. The `./public/index.html` is the default html page that will be served, this will load in the default `./public/landing.js` and `./public/styles/landing.css` files which are created during the build process.
4. The `./server.js` file is strictly supposed to be used for development purposes, it runs the simple web server on your local device.  You might make changes to this file if you introduce new .html files or other things.
5. The `./src` directory stores the files that are developed (or used for development), and are used to create/compile the public facing files.
6. The `./src/general` directory stores generalized components (and respective css modules) that could be used across projects.  This may eventually be moved into a separate repository, but for now it's here.
7. The `./src/landing` directory is used to hold all the files for an example page (in this case, the landing page), the default js used by `./public/index.html`.  Although you can structure your source files however you'd like, I find it easiest to store each page in it's own directory.  Note, since there is currently only one page, by default it's technically a SPA.
8. The `./src/landing/landing.tsx` file is the react file used to render dom elements on the landing page.  It imports `./src/landing/landing.css` and `./src/landing/exampleComponent.tsx`.  The exampleComponent.tsx file's relationship with the landing.tsx file is a good example of how you can compartmentalize components/sections.
9. The `./tailwind.config.landing.js` file is a configuration file for tailwindcss, you can update this to apply styling to all css files that use tailwind css.  See their docs for more/better info.
10. The `./webpack.config.js` file is a configuration file for webpack, which is a development tool that this project uses for the build process.  You may want to update this if you end up needing to do something complicated.

## Production Ready
Once you're happy with your product and you want to send it off, you should only need to provide the `./public` directory.  For instance, just store it's contents on your own github pages repository, and you're good to go!