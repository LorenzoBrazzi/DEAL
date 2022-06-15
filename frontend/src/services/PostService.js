import HttpService from "./HttpService";

export default class PostService {
  static baseURL() {
    return "http://localhost:3001";
  }

  static getPosts() {
    return new Promise(async (resolve, reject) => {
      HttpService.get(
        this.baseURL(),
        function (data) {
          resolve(data);
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static getPost(id) {
    return new Promise(async (resolve, reject) => {
      HttpService.get(
        `${PostService.baseURL()}/${id}`,
        function (data) {
          if (data !== undefined || Object.keys(data).length !== 0) {
            resolve(data);
          } else {
            reject("Error while retrieving post");
          }
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static deletePost(id) {
    return new Promise((resolve, reject) => {
      HttpService.remove(
        `${PostService.baseURL()}/${id}`,
        function (data) {
          if (data.message !== undefined) {
            resolve(data.message);
          } else {
            reject("Error while deleting");
          }
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static updatePost(post) {
    return new Promise((resolve, reject) => {
      HttpService.put(
        `${PostService.baseURL()}/${post._id}`,
        post,
        function (data) {
          resolve(data);
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static getRating(postId) {
    return new Promise((resolve, reject) => {
      HttpService.get(
        `${this.baseURL()}/rate/${postId}`,
        function (data) {
          resolve(data);
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static ratePost(postId, rating) {
    return new Promise((resolve, reject) => {
      HttpService.put(
        `${this.baseURL()}/rate/${postId}`,
        { rating: rating },
        function (data) {
          resolve(data);
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static createPost(post) {
    return new Promise((resolve, reject) => {
      HttpService.post(
        "http://localhost:3001/createPost",
        post,
        function (data) {
          resolve(data);
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  // get posts by the user id as creator
  static getPostsByCreator(creatorId) {
    return new Promise(async (resolve, reject) => {
      HttpService.get(
        `${PostService.baseURL()}/creator/${creatorId}`,
        function (data) {
          if (data !== undefined || Object.keys(data).length !== 0) {
            resolve(data);
          } else {
            reject("Error while retrieving post");
          }
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  // get posts by the matched user id
  static getPostsByRequstingId(requestingId) {
    return new Promise(async (resolve, reject) => {
      HttpService.get(
        `${PostService.baseURL()}/requesting/${requestingId}`,
        function (data) {
          if (data !== undefined || Object.keys(data).length !== 0) {
            resolve(data);
          } else {
            reject("Error while retrieving post");
          }
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }
}
