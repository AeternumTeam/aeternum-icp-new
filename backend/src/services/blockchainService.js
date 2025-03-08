import { StatusCodes } from "http-status-codes";
import { Blockchain } from "../controllers/Blockchain.js";
import { getUserLocaleDate } from "../utils/date.js";

const blockchain = new Blockchain();

const blockchainServices = {
    getBlocks: async (data) => {
        try {
            const { id } = data;

            const blocks = blockchain.chain.map(block => {
                if (id === block.data.id_issuer) {
                    return {
                        index: block.index,
                        hash: block.hash,
                        previousHash: block.previousHash,
                        timestamp: block.timestamp,
                        data: block.data
                    };
                }
                return null;
            }).filter(block => block !== null);

            return { blocks }
        } catch (error) {
            return {
                status: StatusCodes.BAD_REQUEST,
                message: 'Bad Request',
                error: error.message
            };
        }
    },

    addBlock: async (data) => {
        try {
            const { recipient, id_issuer, issuer, certificateName } = data;
            const issueDate = getUserLocaleDate();

            const certificateData = {
                certificateId: `CERT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                recipient,
                certificateName,
                id_issuer,
                issuer,
                publishedUsing: 'Aeternum',
                issueDate,
                issuedOn: new Date().toISOString(),
                status: 'ISSUED'
            };

            blockchain.addBlock(certificateData);
            const latestBlock = blockchain.getLatestBlock();
            
            return {
                hash: latestBlock.hash,
                block: latestBlock
            };
        } catch (error) {
            return {
                status: StatusCodes.INTERNAL_SERVER_ERROR,
                message: 'Internal Server Error',
                error: error.message
            };
        }
    },

    verifyBlockchain: async (data) => {
        try {
            const { credential } = data;
            
            const block = blockchain.chain.find(block => block.hash === credential);
            if (!block) {
                return {
                    status: StatusCodes.NOT_FOUND,
                    message: 'Not Found',
                    error: 'Certificate not found' 
                };
            }

            const isValid = block.isValid();
            if(!isValid) { 
                return {
                    status: StatusCodes.BAD_REQUEST,
                    message: 'Bad Request',
                    error: 'Certificate is not valid'
                } 
            }

            return { certificate : block.data };
        } catch (error) {
            return {
                status: StatusCodes.INTERNAL_SERVER_ERROR,
                message: 'Internal Server Error',
                error: error.message
            };
        }
    }
};

export default blockchainServices;