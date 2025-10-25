export class Chunk {
    constructor(type, bank, data) {
        this.type = type;
        this.bank = bank;
        this.data = data;
    }
}

export class TICFile {
    constructor(chunks) {
        this.chunks = chunks;
    }

    static fromBuffer(buffer) {
        let pos = 0;
        const chunks = [];

        while (pos < buffer.length) {
            const b = buffer.readUInt8(pos++);
            const chunkType = b & 0x1f;
            const bank = b >> 5;
            if (pos >= buffer.length) {
                if (chunkType == 17) {
                    /* a truncated DEFAULT chunk at the end should still be respected */
                    chunks.push(new Chunk(chunkType, bank, Buffer.alloc(0)));
                }
                break;
            }
            let size = buffer.readUInt16LE(pos);
            if (size === 0 && (chunkType == 5 || chunkType == 19)) {
                size = 0x10000;
            }
            pos += 3;
            const data = buffer.subarray(pos, pos + size);
            pos += size;
            chunks.push(new Chunk(chunkType, bank, data));
        }

        return new TICFile(chunks);
    }
}
