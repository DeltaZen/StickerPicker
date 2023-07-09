# StickerPicker [![CI](https://github.com/DeltaZen/StickerPicker/actions/workflows/ci.yml/badge.svg)](https://github.com/DeltaZen/StickerPicker/actions/workflows/ci.yml) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

A simple sticker picker for DeltaLab.

## Developing

### Installing Dependencies

After cloning this repo for the first time, install dependecies:

```
pnpm i
```

### Running tests

```
pnpm test
```

### Testing the app in the browser

To test your work in your browser (with hot reloading!) while developing:

```
pnpm dev-mini
# Alternatively to test in a more advanced WebXDC emulator:
npm run dev
```

**💡 TIP:** To debug inside Delta Chat, uncomment the `script` tag at the end of
`index.html` file and your WebXDC will be packaged with developer tools inside!

### Building

To package the WebXDC file:

```
pnpm build
```

The resulting optimized `.xdc` file is saved in `dist-xdc/` folder.

### Releasing

To automatically build and create a new GitHub release with your `.xdc` file:

```
git tag v1.0.1
git push origin v1.0.1
```

## Credits

The app icon is a modified version of an image taken from: <a href="https://www.flaticon.com/free-icons/sticker" title="sticker icons">Sticker icons created by Freepik - Flaticon</a>
