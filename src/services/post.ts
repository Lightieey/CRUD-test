import { DiagnosticCategory } from "typescript";

const convertSnakeToCamel = require('../modules/convertSnakeToCamel');
//const moment = require('moment');
//require('moment-timezone');

const createPost = async (client, title, content, category) => {
    const { rows } = await client.query(
        `
        INSERT INTO post (title, content, category, createdAt)
        VALUES ($1, $2, $3, NOW())
        RETURNING *
        `,
        [title, content, category],
    );
    return convertSnakeToCamel.keysToCamel(rows[0]);
};

const getList = async (client, category) => {
    const { rows } = await client.query(
        `
        SELECT *
        FROM post
        WHERE category = $1
        `,
        [category],
    );
    return convertSnakeToCamel.keysToCamel(rows);
}

const getPost = async (client, postId) => {
    const { rows } = await client.query(
        `
        SELECT *
        FROM post
        WHERE id = $1
        `,
        [postId],
    );
    return convertSnakeToCamel.keysToCamel(rows[0]);
};

const updatePost = async (client, postId, title, content, category) => {
    const { rows } = await client.query(
        `
        UPDATE post
        SET title = $2, content = $3, category = $4
        WHERE id = $1
        RETURNING *
        `,
        [postId, title, content, category],
    );
    return convertSnakeToCamel.keysToCamel(rows[0]);
};

const deletePost = async (client, postId) => {
    const { rows } = await client.query(
        `
        DELETE FROM post
        WHERE id = $1
        RETURNING *
        `,
        [postId],
    );
    return convertSnakeToCamel.keysToCamel(rows[0]);
};

module.exports = {
    createPost,
    getList,
    getPost,
    updatePost,
    deletePost
};