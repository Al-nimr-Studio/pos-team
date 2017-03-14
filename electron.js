const {app, BrowserWindow} = require('electron')
// const express = require('./server/main'); //your express app
let win

function createWindow(){
     
  win = new BrowserWindow({
    width:800,
    height:600
  });

  win.loadURL(`http://localhost:3000`)

  win.on('closed', ()=>{
    win = null;
  })
 // Open the DevTools.
  win.webContents.openDevTools()

//   win.webContents.on('devtools-opened', () => {
//     win.webContents.closeDevTools();
//   })

}

app.on('ready', createWindow)

app.on('all-window-closed', () =>{
  app.quit();
})