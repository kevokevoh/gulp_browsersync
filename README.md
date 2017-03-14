# gulp_browsersync
A nitty base build that uses gulp,browserify,watchify and optionally browsersync to do an easy ajax request.
Compiles and concatenates included file in app/src/js to app/dist/js

# To setup clone the repo and run
```bash
$ npm install
```
This should install all dependencies and development dependencies in package.json

To start the gulp task that runs browserify,watchify and the concatenates js files into app/dist/js you can do this by running
```bash
$ gulp
```
You can also run gulp in the background by running
```bash
$ npm start
```
For individual gulp task just check the /gulpfile.js file to see how they are declared.

# Optionally you can hook up browser sync
On a second tab run
```bash
$ gulp serve
```
which will start browser sync and give local url which you can paste in browser or even automatically visit the url in your default browser

Cheers

