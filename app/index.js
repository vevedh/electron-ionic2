var app = require('app'); // Module to control application life.
var BrowserWindow = require('browser-window'); // Module to create native browser window.


var exec = require('child_process').exec;

const path = require('path');
const electron = require('electron');
const ipc = require('electron').ipcMain;
const crashReporter = electron.crashReporter;
const parse = require('url-parse');
const restify = require('restify');
const remote = require('electron').remote;
const Menu = electron.Menu;



const bat = exec('ionic serve --nobrowser', {
    cwd: __dirname + '/../../'
});



let appIcon = null;

// Report crashes to our server.
require('crash-reporter').start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is GCed.
var mainWindow = null;



function createWindow() {
    var windowOptions = {
        width: 1080,
        minWidth: 680,
        height: 840
    }
    if (process.platform === 'linux') {
        windowOptions.icon = path.join(__dirname, '/assets/app-icon/png/512.png')
    }
    // Create the browser window.
    mainWindow = new BrowserWindow(windowOptions);

    mainWindow.setMenu(null);
    mainWindow.loadURL('http://localhost:8100');
    //mainWindow.loadURL('file://' + __dirname + '/www/index.html');
    //mainWindow.loadURL('file://' + __dirname + '/../../www/index.html');
    //mainWindow.loadURL(path.join('file://', __dirname, '/index.html'))

    // Launch fullscreen with DevTools open, usage: npm run debug
    //if (debug) {
    mainWindow.webContents.openDevTools()
    mainWindow.maximize()
        //}

    mainWindow.on('closed', function() {
        mainWindow = null
    })

}

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


    bat.stdout.on('data', (data) => {

        console.log("Ionic serve est lancé!", data);
        mainWindow.reload();
    });

    bat.stderr.on('data', (data) => {
        console.log(data);
    });

    bat.on('exit', (code) => {
        console.log('Child exited with code ${code}');
    });

    createWindow()


});


app.on('activate', function() {
    if (mainWindow === null) {
        createWindow()
    }
});




ipc.on('put-in-tray', function(event) {
    const iconPath = path.join(__dirname, 'iconTemplate.png')
    appIcon = new electron.Tray(iconPath)
    const contextMenu = electron.Menu.buildFromTemplate([{
        label: 'Remove',
        click: function(menuItem, browserWindow) {
            event.sender.send('tray-removed')
            appIcon.destroy()
        }
    }])
    appIcon.setToolTip('Electron Demo in the tray.')
    appIcon.setContextMenu(contextMenu)
})

ipc.on('remove-tray', function(event) {
    appIcon.destroy()
})








// webservices

console.log("Port", process.env.PORT);
console.log("Chemin de l'application:", process.cwd);
// Start Restify API Server 
let port = process.env.PORT || 3000;
var server = restify.createServer({
    name: 'electron-backend',
    version: '0.0.1'
});

restify.CORS.ALLOW_HEADERS.push('my-custom-header');

server.use(restify.CORS({
    headers: ['my-custom-header'],
    origins: ['*']
}));
server.use(restify.fullResponse());
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.post('/crashes', (req, res, next) => {
    console.log(req.body);
    res.send(200);
});

server.get('/echo', (req, res, next) => {
    console.log('echo called.');
    res.send('Bonjour herve (depuis electron)!');
});

server.get('/info', (req, res, next) => {
    console.log('info called.');

    res.send({
        nodeVersion: process.versions.node,
        chromeVersion: process.versions.chrome,
        electronVersion: process.versions.electron
    });
});



server.get('/auth/azureoauth/callback', (req, res, next) => {
    mainWindow.loadURL('file://' + __dirname + '/index.html');
});

server.listen(port, () => {
    console.log('server running on port ' + port);
});