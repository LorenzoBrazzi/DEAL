import HttpService from "./HttpService";

export default class UserService {
  static baseURL() {
    return "http://localhost:3001/auth";
  }

  static register(user, pass, email, address, city, postcode, tel) {
    return new Promise((resolve, reject) => {
      HttpService.post(
        `${UserService.baseURL()}/register`,
        {
          name: user,
          password: pass,
          email: email,
          address: address,
          city: city,
          postcode: postcode,
          tel: tel,
          imageUrl: "nopic",
          ratings: [],
        },
        function (data) {
          resolve(data);
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static login(user, pass) {
    return new Promise((resolve, reject) => {
      HttpService.post(
        `${UserService.baseURL()}/login`,
        {
          name: user,
          password: pass,
        },
        function (data) {
          resolve(data);
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static logout() {
    window.localStorage.removeItem("jwtToken");
  }

  static getUser(id) {
    return new Promise(async (resolve, reject) => {
      HttpService.get(
        `${UserService.baseURL()}/me/${id}`,
        function (data) {
          const data2 = { user: data };
          if (data !== undefined || Object.keys(data).length !== 0) {
            resolve(data2);
          } else {
            reject("Error while retrieving user");
          }
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static update(user) {
    return new Promise((resolve, reject) => {
      HttpService.put(
        `${UserService.baseURL()}/${user._id}`,
        user,
        function (data) {
          resolve(data);
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static getUserName(id) {
    return new Promise(async (resolve, reject) => {
      HttpService.get(
        `${UserService.baseURL()}/name/${id}`,
        function (data) {
          if (data !== undefined || Object.keys(data).length !== 0) {
            resolve(data);
          } else {
            reject("Error while retrieving user's name");
          }
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static getUserRating(id) {
    return new Promise(async (resolve, reject) => {
      HttpService.get(
        `${UserService.baseURL()}/rating/${id}`,
        function (data) {
          if (data !== undefined || Object.keys(data).length !== 0) {
            resolve(data);
          } else {
            reject("Error while retrieving user's rating");
          }
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static getUserImage(id) {
    return new Promise(async (resolve, reject) => {
      HttpService.get(
        `${UserService.baseURL()}/image/${id}`,
        function (data) {
          if (data !== undefined || Object.keys(data).length !== 0) {
            resolve(data);
          } else {
            reject("Error while retrieving user's rating");
          }
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static getOtherUser(id) {
    return new Promise(async (resolve, reject) => {
      HttpService.get(
        `${UserService.baseURL()}/other/${id}`,
        function (data) {
          if (data !== undefined || Object.keys(data).length !== 0) {
            resolve(data);
          } else {
            reject("Error while retrieving user");
          }
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }
}
