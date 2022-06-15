"use strict";

const express = require("express");
const router = express.Router();
const Post = require("../models/postModel");

const postController = require("../controllers/postController");

/**
 * @swagger
 *  components:
 *    schemas:
 *      PostSchema:
 *        type: object
 *        required:
 *          - offerOrRequest
 *          - title
 *          - description
 *          - category
 *          - price
 *          - address
 *          - postCode
 *          - town
 *          - date
 *        properties:
 *          offerOrRequest:
 *            type: String
 *          title:
 *            type: String
 *          description:
 *            type: String
 *          category:
 *            type: String
 *          price:
 *            type: Number
 *          address:
 *            type: String
 *          postCode:
 *            type: Number
 *          town:
 *            type: String
 *          date:
 *            type: Date
 *
 *
 */

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: The posts api
 */

/**
 * @swagger
 * /:
 *  get:
 *      description: List all posts
 *      tags: [Posts]
 *      responses:
 *          "500":
 *              description: Internal server error
 *          "200":
 *              description: Everything went well!
 *              content:
 *                  application/json:
 *                    schema:
 *                      type: array
 *                      items:
 *                        $ref: '#components/schemas/PostSchema'
 *
 */
router.get("/", postController.list);
/**
 * @swagger
 * /createPost:
 *  post:
 *      description: Create a new post
 *      tags: [Posts]
 *      responses:
 *          "400":
 *              description: Bad Request-The request body is empty
 *          "500":
 *              description: Internal server error
 *          "201":
 *              description: Everything went well, the post was created!
 */
router.post("/createPost", postController.create); //

/**
 * @swagger
 * /filterte:
 *  get:
 *      description: Get the filtered list of posts
 *      tags: [Posts]
 *      responses:
 *          "500":
 *              description: Internal Server Error
 *          "200":
 *              description: Everything went well!
 */
router.get("/filterte", postController.filterteList); //

/**
 * @swagger
 * /{id}:
 *  get:
 *      description: Read a post by Id
 *      tags: [Posts]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: The post id
 *      responses:
 *          "500":
 *              description: Internal Server Error
 *          "404":
 *              description: Post Not Found
 *          "200":
 *              description: Everything went well!
 *              contens:
 *                application/json:
 *                  schema:
 *                    $ref: '#/components/schemas/PostSchema'
 */
router.get("/:id", postController.read);

/**
 * @swagger
 * /{id}:
 *  put:
 *      description: Update a post by Id
 *      tags: [Posts]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: The post id
 *      responses:
 *          "400":
 *              description: Bad Request-The request body is empty
 *          "500":
 *              description: Internal Server Error
 *          "200":
 *              description: Everything went well!
 *              contens:
 *                application/json:
 *                  schema:
 *                    $ref: '#/components/schemas/PostSchema'
 */
router.put("/:id", postController.update);

/**
 * @swagger
 * /{id}:
 *  delete:
 *      description: Delete a post by Id
 *      tags: [Posts]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: The post id
 *      responses:
 *          "500":
 *              description: Internal Server Error
 *          "200":
 *              description: Everything went well!
 *              contens:
 *                application/json:
 *                  schema:
 *                    $ref: '#/components/schemas/PostSchema'
 */
router.delete("/:id", postController.remove);

/**
 * @swagger
 * /creator/{id}:
 *  get:
 *      description: List all posts, which are created by this userID
 *      tags: [Posts]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: The post id
 *      responses:
 *          "500":
 *              description: Internal Server Error
 *          "404":
 *              description: Posts Not Found
 *          "200":
 *              description: Everything went well!
 *              contens:
 *                application/json:
 *                  schema:
 *                    $ref: '#/components/schemas/PostSchema'
 */
router.get("/creator/:id", postController.creatorList);

/**
 * @swagger
 * /matched/{id}:
 *  get:
 *      description: List all posts, which are matched by this userID
 *      tags: [Posts]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: The post id*
 *      responses:
 *          "500":
 *              description: Internal Server Error
 *          "404":
 *              description: Posts Not Found
 *          "200":
 *              description: Everything went well!
 *              contens:
 *                application/json:
 *                  schema:
 *                    $ref: '#/components/schemas/PostSchema'
 */
router.get("/requesting/:id", postController.requestingList);

module.exports = router;
