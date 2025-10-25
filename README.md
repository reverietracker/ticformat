# ticformat

A parser for the TIC-80 .tic file format

## Installation

```
npm install ticformat
```

## Usage

This package exports a class `TICFile` with a static `fromBuffer` method, which accepts a buffer containing the binary data of the .tic file.

```javascript
import { readFileSync } from "node:fs";
import { TICFile } from "ticformat";

const buf = readFileSync("example.tic");
const tic = TICFile.fromBuffer(buf);
```

The `TICFile` object provides a `chunks` attribute, giving a list of the chunks in the file. Each chunk has the attributes:

* `type` - [numeric identifier for the chunk type](https://github.com/nesbox/TIC-80/wiki/.tic-File-Format#chunk-types)
* `bank` - bank number
* `data` - chunk data, as a buffer
