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
            let size = buffer.readUInt16LE(pos);
            if (size === 0) size = 0x10000;
            pos += 3;
            const data = buffer.slice(pos, pos + size);
            pos += size;
            chunks.push(new Chunk(chunkType, bank, data));
        }

        return new TICFile(chunks);
    }
}
