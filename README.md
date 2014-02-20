CCSP Website
============

Development
----------

We are developing in `dev` branch (and individual feature branches) since `master` branch is used in Github organization page.

To get it running:

```
git checkout dev
npm install
bower install
npm run dev
```

It will run development environment and serve the site at port 8000 with watch & livereload support.

If you get `ECMDERR` when using bower, try running `git config --global url."https://".insteadOf git://` first, as instructed in [an issue of bower](https://github.com/bower/bower/issues/713#issuecomment-27484926).

Public
----------
See `gulpfile.ls` public task.

It will run production environment and serve the site at port 8000.

```
npm run public
```

Release
----------

See `gulpfile.ls` release task.

```
npm run release
```
