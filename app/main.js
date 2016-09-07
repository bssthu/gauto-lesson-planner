const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

var mainWindow = null;

app.on('window-all-closed', function() {
    app.quit();
});

app.on('ready', function() {
    mainWindow = new BrowserWindow({
        name: "gauto-lesson-planner",
        width: 1280,
        height: 720,
        toolbar: false
    });

    mainWindow.loadURL('file://' + app.getAppPath() + "/index.html");

    mainWindow.on('closed', function() {
        mainWindow = null;
    });
});
