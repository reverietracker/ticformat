import { readFileSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";
import assert from 'node:assert/strict';

import { TICFile } from '../index.js';

const __dirname = import.meta.dirname;

test("can read .tic files", () => {
    const buf = readFileSync(join(__dirname, 'waferscale.tic'));
    const tic = TICFile.fromBuffer(buf);

    assert.strictEqual(tic.chunks.length, 1);
    assert.strictEqual(tic.chunks[0].type, 16);
    assert.strictEqual(tic.chunks[0].bank, 0);
    assert.strictEqual(tic.chunks[0].data.length, 251);
});
