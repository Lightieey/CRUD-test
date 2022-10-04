import express from 'express';
const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const responseMessage = require('../modules/responseMessage');
const dbConnect = require('../loaders/db');
const postService = require('../services/post');

const createPost = async (req, res) => {
    const { title, content, category } = req.body;
    let client;
    try {
        client = await dbConnect.connect(req);
        const data = await postService.createPost(client, title, content, category);
        res.status(statusCode.CREATED).send(util.success(statusCode.CREATED, responseMessage.OK, data));
    } catch (error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
    } finally {
        client.release();
    }
};

const getList = async (req, res) => {
    const { category } = req.params;
    let client;
    try {
        client = await dbConnect.connect(req);
        const data = await postService.getList(client, category);
        res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.OK, data));
       } catch (error) {
        
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
    } finally {
        client.release();
    }
};

const getPost = async (req, res) => {
    const { postId } = req.params;
    let client;
    try {
        client = await dbConnect.connect(req);
        const data = await postService.getPost(client, postId);
        res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.OK, data));
    } catch (error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
    } finally {
        client.release();
    }
};

const updatePost = async (req, res) => {
    const { postId } = req.params;
    const { title, content, category } = req.body;
    let client;
    try {
        client = await dbConnect.connect(req);
        const data = await postService.updatePost(client, postId, title, content, category);
        res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.OK, data));
    } catch (error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
    } finally {
        client.release();
    }
};

const deletePost = async (req, res) => {
    const { postId } = req.params;
    let client;
    try {
        client = await dbConnect.connect(req);
        const data = await postService.deletePost(client, postId);
        res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.OK, data));
    } catch (error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
    } finally {
        client.release();
    }
};

module.exports = { createPost, getList, getPost, updatePost, deletePost };