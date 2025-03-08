import pkg from 'crypto-js';
const { SHA256 } = pkg;

class Block {
    #hash;
    
    constructor(index, timestamp, data, previousHash = "") {
        if (!Number.isInteger(index) || index < 0) {
            throw new Error("Index must be a non-negative integer");
        }
        
        this.index = Object.freeze(index); // Immutable
        this.timestamp = Object.freeze(timestamp);
        this.data = Object.freeze(JSON.parse(JSON.stringify(data))); // Deep clone and freeze
        this.previousHash = previousHash;
        this.#hash = this.calculateHash();
    }

    calculateHash() {
        const blockString = `${this.index}${this.previousHash}${this.timestamp}${JSON.stringify(this.data)}`;
        return '0x' + SHA256(blockString).toString();
    }

    get hash() {
        return this.#hash;
    }

    isValid() {
        return this.#hash === this.calculateHash();
    }
}


class Blockchain {
    #chain;

    constructor() {
        this.#chain = [this.#createGenesisBlock()];
    }
    
    #createGenesisBlock() {
        return new Block(0, new Date().toISOString(), "Genesis Block", "0");
    }

    getLatestBlock() {
        return this.#chain[this.#chain.length - 1];
    }

    get chain() {
        return Object.freeze([...this.#chain]);
    }

    addBlock(data) {
        const previousBlock = this.getLatestBlock();
        const newIndex = previousBlock.index + 1;
        const newBlock = new Block(
            newIndex,
            new Date().toISOString(),
            data,
            previousBlock.hash
        );

        if (!this.isChainValid()) {
            throw new Error("Cannot add block to invalid chain");
        }

        this.#chain.push(newBlock);

        if (!this.isChainValid()) {
            this.#chain.pop();
            throw new Error("Adding block would invalidate chain");
        }
    }

    isChainValid() {
        if (!this.#chain[0].isValid()) {
            return false;
        }

        for (let i = 1; i < this.#chain.length; i++) {
            const currentBlock = this.#chain[i];
            const previousBlock = this.#chain[i - 1];

            if (!currentBlock.isValid()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }

            if (currentBlock.index !== previousBlock.index + 1) {
                return false;
            }
        }

        return true;
    }
}

export { Block, Blockchain }