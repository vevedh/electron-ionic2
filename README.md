# electron-ionic2
Electron starter app with ionic 2

I have create a base to run ionic 2 application with electron it's a idea  from original repo : https://github.com/bsanth/electron-ionic2.git

* Git clone the repo to your root ionic 2 starter application.

    ```git clone https://github.com/vevedh/electron-ionic2.git```
* Get Node Package Manager ready.

    ``` npm init```
    
    
    Original repository
    git repository: (https://github.com/bsanth/electron-angular2.git) 
    keywords: 
    author: Santhosh Kumar Bala Krishnan
    license: (ISC) MIT
    
    
    Here's how mine looks:
    
    ```
    name: (electron-ionic2) 
    version: (1.0.0) 0.0.0
    description: Starter app for electron-ionic2
    entry point: (index.js) app/index.js
    test command: electron .
    git repository: (https://github.com/vevedh/electron-ionic2.git) 
    
    {
      "name": "electron-ionic2",
      "version": "0.0.0",
      "description": "Starter app for electron-ionic2",
      "main": "app/index.js",
      "scripts": {
        "test": "electron ."
      },
      "repository": {
        "type": "git",
        "url": "git+https://github.com/vevedh/electron-ionic2.git"
      },
      "author": "Herve de CHAVIGNY",
      "license": "MIT",
      "bugs": {
        "url": "https://github.com/vevedh/electron-ionic2/issues"
      },
      "homepage": "https://github.com/vevedh/electron-ionic2#readme"
    }
    ```
    

* I installed electron globally and added electron as a dependency to this project next.

    ```
    npm install electron-prebuilt -g
    npm install electron-prebuilt --save-dev
    ```

* Let's base index file:

    ```
    ../../../www/index.html
    ```
* Let's now write the entry point js file to electron. Go to index.js file and type out the following. This is directly taken from electron starter app. [https://github.com/atom/electron/blob/master/docs/tutorial/quick-start.md](https://github.com/atom/electron/blob/master/docs/tutorial/quick-start.md)

    Only change I made was the path to the index.html file. 

    ```
    var app = require('app');  // Module to control application life.
    var BrowserWindow = require('browser-window');  // Module to create native browser window.
    
    // Report crashes to our server.
    require('crash-reporter').start();
    
    // Keep a global reference of the window object, if you don't, the window will
    // be closed automatically when the JavaScript object is GCed.
    var mainWindow = null;
    
    // Quit when all windows are closed.
    app.on('window-all-closed', function() {
      // On OS X it is common for applications and their menu bar
      // to stay active until the user quits explicitly with Cmd + Q
      if (process.platform != 'darwin') {
        app.quit();
      }
    });
    
    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    app.on('ready', function() {
      // Create the browser window.
      mainWindow = new BrowserWindow({width: 800, height: 600});
    
      // and load the index.html of the app.
      mainWindow.loadUrl('file://' + __dirname + '/../../www/index.html');
    
      // Open the devtools.
      mainWindow.openDevTools();
    
      // Emitted when the window is closed.
      mainWindow.on('closed', function() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
      });
    });
    ```
    