# StickerPicker [![CI](https://github.com/DeltaZen/StickerPicker/actions/workflows/ci.yml/badge.svg)](https://github.com/DeltaZen/StickerPicker/actions/workflows/ci.yml) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

A simple sticker picker for DeltaLab.

## Contributing

### Installing Dependencies

After cloning this repo, install dependencies:

```
pnpm i
```

### Checking code format

```
pnpm check
```

### Testing the app in the browser

To test your work in your browser (with hot reloading!) while developing:

```
pnpm start
```

### Building

To package the WebXDC file:

```
pnpm build
```

To package the WebXDC with developer tools inside to debug in Delta Chat, set the `NODE_ENV`
environment variable to "debug":

```
NODE_ENV=debug pnpm build
```

The resulting optimized `.xdc` file is saved in `dist-xdc/` folder.

### Releasing

To automatically build and create a new GitHub release with the `.xdc` file:

```
git tag v1.0.1
git push origin v1.0.1
```

## Credits

The app icon is a modified version of an image taken from: <a href="https://www.flaticon.com/free-icons/sticker" title="sticker icons">Sticker icons created by Freepik - Flaticon</a>
