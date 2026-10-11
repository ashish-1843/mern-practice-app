const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');

/**
 * @route /api/user/create-note
 * @description Create a new note for the authenticated user
 * @access Private      
 */
userRouter.post('/create-note', authMiddleware.authUser, userController.createNote);

/**
 * @route /api/user/get-notes
 * @description Get all notes for the authenticated user
 * @access Private
 */

userRouter.get('/get-notes', authMiddleware.authUser, userController.getNotes);

/**
 * @route /api/user/update-note/:noteId
 * @description Update a note for the authenticated user
 * @access Private  
 */

userRouter.put('/update-note/:noteId', authMiddleware.authUser, userController.updateNote);

module.exports = userRouter;