# Kickstart

This starter pack uses webpack, gulp, and more to make local development super easy.

## Getting started

#### Installation
```
npm install
```

#### Local server

Runs a server on http://localhost:3000 with BrowserSync.
```
gulp
```

#### Build files

Builds image, style, and script files into `/public/assets`
```
gulp build
```

#### Deploy files
Builds and deploys files over rsync sftp.
```
gulp deploy
```


## Styles

You can use SASS easily in `source/styles/main.scss` and create and include modules as needed.

There is also a web toolkit, loosely based on BEM with different responsive components and utilities.

Peruse `source/styles/toolkit` for what's available and edit to your liking.


## Scripts

This kit uses Webpack to include javascript files in the AMD format. This way you can create and include Javascript components easily.

There's also a few components such as a reusable module, overlay, and scroll handler.


#### Shoutouts
A lot of the gulpfile is based on the [kirby-kit](https://github.com/yoeran/kirby-kit) repository. Web toolkit, and some overlay modules are inspired by work done by the amazing engineers and designers of Etsy.
