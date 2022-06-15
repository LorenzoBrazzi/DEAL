"use strict";

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const middlewares = require("../../middlewares");
const AuthController = require("../controllers/authController");

/**
 * @swagger
 *  components:
 *    schemas:
 *      UserSchema:
 *        type: object
 *        required:
 *          - name
 *          - password
 *          - email
 *          - address
 *          - city
 *          - postcode
 *          - tel
 *        properties:
 *          name:
 *            type: String
 *          password:
 *            type: String
 *          email:
 *            type: String
 *          address:
 *            type: String
 *          city:
 *            type: String
 *          postcode:
 *            type: Number
 *          tel:
 *            type: Number
 *          imageUrl:
 *            type: String
 *          ratings:
 *            type: [Number]
 *
 *
 */


/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The users api
 */

/**
 * @swagger
 * /auth/login:
 *  post:
 *      description: Use to log in to the platform
 *      tags: [Users]
 *      responses:
 *          "400":
 *              description: Bad Request-The request body must contain a password property
 *          "404":
 *              description: User Not Found
 *          "200":
 *              description: Everything went well!
 */
router.post("/login", AuthController.login);
/**
 * @swagger
 * /auth/register:
 *  post:
 *      description: Registration in the platform
 *      tags: [Users]
 *      responses:
 *          "400":
 *              description: Bad Request-The request body must contain a password property or User already exists
 *          "500":
 *              description: Internal server error
 *          "200":
 *              description: Everything went well!
 */
router.post("/register", AuthController.register);
/**
 * @swagger
 * /auth/{id}:
 *  put:
 *      description: Update informations
 *      tags: [Users]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *            required: true
 *            description: The user id
 *      responses:
 *          "400":
 *              description: Request body is empty
 *          "500":
 *              description: Internal server error
 *          "200":
 *              description: Everything went well!
 *              contens:
 *                application/json:
 *                  schema:
 *                    $ref: '#/components/schemas/UserSchema'
 */
router.put("/:id", AuthController.update);
/**
 * @swagger
 * /auth/me/{id}:
 *  get:
 *      description: Get the current user
 *      tags: [Users]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: The user id
 *      responses:
 *          "404":
 *              description: User not found
 *          "500":
 *              description: Internal server error
 *          "200":
 *              description: Everything went well!
 *              contens:
 *                application/json:
 *                  schema:
 *                    $ref: '#/components/schemas/UserSchema'
 */
router.get("/me/:id", middlewares.checkAuthentication, AuthController.me);
/**
 * @swagger
 * /auth/logout:
 *  get:
 *      description: Logout from the currect account
 *      tags: [Users]
 *      responses:
 *          "404":
 *              description: User not found
 *          "500":
 *              description: Internal server error
 *          "200":
 *              description: Everything went well!
 *              content:
 *                  application/json:
 *                    schema:
 *                      type: array
 *                      items:
 *                        $ref: '#components/schemas/UserSchema'
 *
 */
router.get("/logout", middlewares.checkAuthentication, AuthController.logout);
/**
 * @swagger
 * /auth/name/{id}:
 *  get:
 *      description: Get the User with the id
 *      tags: [Users]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: The user id
 *      responses:
 *          "404":
 *              description: User not found
 *          "500":
 *              description: Internal server error
 *          "200":
 *              description: Everything went well!
 *              contens:
 *                application/json:
 *                  schema:
 *                    $ref: '#/components/schemas/UserSchema'
 */
router.get("/name/:id", AuthController.name);
/**
 * @swagger
 * /auth/rating/{id}:
 *  get:
 *      description: Get the rating of the user with the id
 *      tags: [Users]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: The user id
 *      responses:
 *          "404":
 *              description: User not found
 *          "500":
 *              description: Internal server error
 *          "200":
 *              description: Everything went well!
 *              contens:
 *                application/json:
 *                  schema:
 *                    $ref: '#/components/schemas/UserSchema'
 */
router.get("/rating/:id", AuthController.calculateRating);
/**
 * @swagger
 * /auth/other/{id}:
 *  get:
 *      description: Get the other user with the id
 *      tags: [Users]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: The user id
 *      responses:
 *          "404":
 *              description: User not found
 *          "500":
 *              description: Internal server error
 *          "200":
 *              description: Everything went well!
 *              contens:
 *                application/json:
 *                  schema:
 *                    $ref: '#/components/schemas/UserSchema'
 */
router.get("/other/:id", AuthController.other);

/**
 * @swagger
 * /auth/image/{id}:
 *  get:
 *      description: Get the image of the user with the id
 *      tags: [Users]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: The user id
 *      responses:
 *          "404":
 *              description: User not found
 *          "500":
 *              description: Internal server error
 *          "200":
 *              description: Everything went well!
 *              contens:
 *                application/json:
 *                  
 */
router.get("/image/:id", AuthController.image);

module.exports = router;
