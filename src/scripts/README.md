# DXF Conversion Script

A quickie script to read in a directory of dxf files, strip out most of the layers, and write to SVG and JSON formats. 

Used as the first stage of [My Mapping Project][1].

## Conversion

1. Copy all dxf files into `./dxf`.

2. `npm start`

This will generate svg files for each layer in the `svg/` directory, and convert each layer to JSON in the `json/` directory.

## Uploading

The script in `upload.js` can be used to push complete building objects into the mongo database. 

1. Clone and setup the [main mapping app][1] in a separate directory.
2. Start the mapping application with `docker-compose up`
3. In this directory, run `npm run upload`

## Compatibility

This script uses the [fs.Promises API][2], which requires `node >= 10.0.0`. 

[1]: https://github.com/jonseitz/inclusive-harvard-map
[2]: https://nodejs.org/dist/latest-v11.x/docs/api/fs.html#fs_fs_promises_api
