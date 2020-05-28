# DoclerChat FrontEnd

## What is it ?

This is a chat client coded in React, using TypeScript.

## How does it work ?

This application connects to a socket server using **WebSocket**. It uses **localStorage** to store user settings.

## How to run

First, you need to install node and yarn on your machine.

- Node: [Get Node](https://nodejs.org/en/download/)
- Yarn: [Install Yarn](https://classic.yarnpkg.com/en/docs/install/)

Then, you should also have the **DoclerChat Socket Server** running.

- DoclerChat SocketServer: (Get fron GitHub)(https://github.com/Scalpweb/doclerchat-server)

Finally, you open a terminal window, and run the following command to start the **DoclerChat FrontEnd**:

`yarn dev`

By default, it will try to connect to the **DoclerChat Socket Server** on localhost via port **3003**. If you want to specify another endpoint, you can specify it using the **SOCKET_SERVER_HOST** environment variable:

`SOCKET_SERVER_HOST=http://localhost:1234 yarn dev`

## How to build

To build the **DoclerChat FrontEnd**, you need to run the following command:

`yarn build`

You can also specify the server address:

`SOCKET_SERVER_HOST=http://localhost:1234 yarn build`

The build version will be stored in the **dist** folder.

## Run test

To run the tests, use the following command:

`yarn test`

## Implemented features

- [x] React framework
- [x] SASS preprocessors
- [x] SASS modules
- [x] Coded in TypeScript
- [x] Works on desktop, tablet and phone
- [x] Works on Chrome, Firefox, and Safari
- [x] CRA was not used
- [x] Based on socket.io
- [x] Chat messages are displayed depending on author
- [x] Input field and button at botto of page
- [x] Tab will blink if receiving message when on another tab
- [x] Has unread messages count when on settings page
- [x] Link parser for youtube, image and other links
- [x] Support emoticons
- [x] Implement an emoticon selector
- [x] User can modify name, interface color, clock display, and message send shortcut
- [x] User can swap between french and english
- [x] Settings are stored in localStorage
- [x] User can reset settings to default
