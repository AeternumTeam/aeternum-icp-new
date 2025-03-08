import db from "../config/database.js";

export const getTokens = async () => {
    try {
        const tokens = await db.query("SELECT * FROM users_token");
        return tokens.rows;
    } catch (error) {
        console.log(error)
    }
    
}

export const getTokenByPayload = async (data) => {
    try {
        const payload = await db.query("SELECT payload, expired FROM users_token WHERE payload = $1", [data.payload]);
        return payload.rows[0];
    } catch (error) {
        console.log(error)
    }
}

export const createToken = async (data) => {
    try {
        await db.query("INSERT INTO users_token VALUES ($1, $2, $3, $4, $5, $6)", [data.id, data.user, data.payload, data.expired, data.created_at, data.updated_at]);

        const token = await db.query("SELECT * FROM users_token WHERE id= $1", [data.id]);
        return token.rows[0];
    } catch (error) {
        console.log(error)
    }
} 

export const updateToken = async (data) => {
    try {
        await db.query("UPDATE users_token SET payload = $1, expired= $2, updated_at= $3 WHERE payload= $4", [data.payload, data.expired, data.updated_at, data.payloadOld]);

        const token = await db.query("SELECT * FROM users_token WHERE payload= $1", [data.payload]);
        return token.rows[0];
    } catch (error) {
        console.log(error)
    }
} 

export const updateTokenExpiration = async (data) => {
    try {
        await db.query("UPDATE users_token SET expired= $1, updated_at= $2 WHERE payload= $3", [data.expired, data.updated_at, data.payload]);

        const token = await db.query("SELECT * FROM users_token WHERE payload= $1", [data.payload]);
        return token.rows[0];
    } catch (error) {
        console.log(error)
    }
} 