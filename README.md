CCSP Website
============

Development
-----------

We are developing in `dev` branch (and individual feature branches) since `master` branch is used in Github organization page.

To get it running:

```
git checkout dev
npm install
bower install
grunt
```

If you get `ECMDERR` when using bower, try running `git config --global url."https://".insteadOf git://` first, as instructed in [an issue of bower](https://github.com/bower/bower/issues/713#issuecomment-27484926).

Push to `master`
------------------

The following command will

1. Create or clear `build/`
1. Copy relevant files into `build/`
1. Compile sass files again using compressed output style
1. [TODO] Minify and concatenate javascript
1. Copy relevant files into a secret directory (.grunt) to be pushed to `master` branch.

```
grunt push
```

### Inner Workings

It is composed of the following two commands:

```
grunt build
grunt gh-pages
```

The latter is derived from [grunt-gh-pages](https://www.npmjs.org/package/grunt-gh-pages) package.

If you wish to browse the website inside `build/`, use `grunt test` in terminal to open up the website in `build/` in `http://localhost:8000`.


to do
------

- pie chart animation
- icon list pop up animation
- whern windows resize, auto detect js event 
- footer
