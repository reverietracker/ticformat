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

test("handles zero-length default chunks", () => {
    const buf = readFileSync(join(__dirname, 'ghostflowers.tic'));
    const tic = TICFile.fromBuffer(buf);

    assert.strictEqual(tic.chunks.length, 5);
    assert.strictEqual(tic.chunks[0].type, 17);
    assert.strictEqual(tic.chunks[0].bank, 0);
    assert.strictEqual(tic.chunks[0].data.length, 0);
});

test("can read truncated .tic files", () => {
    const buf = readFileSync(join(__dirname, 'neasden-ballet.tic'));
    const tic = TICFile.fromBuffer(buf);

    assert.strictEqual(tic.chunks.length, 2);
    assert.strictEqual(tic.chunks[0].type, 16);
    assert.strictEqual(tic.chunks[0].bank, 0);
    assert.strictEqual(tic.chunks[0].data.length, 247);
    assert.strictEqual(tic.chunks[1].type, 17);
    assert.strictEqual(tic.chunks[1].bank, 0);
    assert.strictEqual(tic.chunks[1].data.length, 0);
});
