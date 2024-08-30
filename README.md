# Diep client

Diep client is a project written in javascript
One of features is mods support
Theres no server

[Original Game](https://diep.io/)

## Build
1. `npm install`
2. `npm run dev`
3. Open browser and go to `http://127.0.0.1:24828`
4. Done

## Mods
### [list.txt](https://github.com/GDenisC/diep-client/blob/main/public/mods/list.txt)
List of mods to load
### [scrollFovMod.js](https://github.com/GDenisC/diep-client/blob/main/public/mods/scrollFovMod.js)
You can change your Field of View with mouse wheel
### [windowExportsMod.js](https://github.com/GDenisC/diep-client/blob/main/public/mods/windowExportsMod.js)
You can use `exports` in browser console

## Modding
```js
({
    load: exports => {}, // called once
    tick: () => {}, // called every exports.constants.gameTps/second
    render: () => {} // called every frame
})
```