import UserService from "../../services/UserService";

export function login(name, password) {
  function onSuccess(user) {
    return { type: "LOGIN_SUCCESS", user: user };
  }
  function onFailure(error) {
    if (error === "Failed to fetch") {
      return { type: "FETCH_FAILURE", fetchError: error };
    } else {
      return { type: "LOGIN_FAILURE", loginError: error };
    }
  }

  return async (dispatch) => {
    try {
      let resp = await UserService.login(name, password);
      dispatch(onSuccess(resp.user));
    } catch (e) {
      dispatch(onFailure(e));
    }
  };
}

export function logout() {
  UserService.logout();
  return { type: "LOGOUT" };
}

export function loginReset() {
  return { type: "LOGIN_RESET" };
}

export function register(name, password, email, address, city, postcode, tel) {
  function onSuccess(user) {
    return { type: "LOGIN_SUCCESS", user: user };
  }
  function onFailure(error) {
    return { type: "FETCH_FAILURE", fetchError: error };
  }

  return async (dispatch) => {
    try {
      let resp = await UserService.register(
        name,
        password,
        email,
        address,
        city,
        postcode,
        tel
      );
      dispatch(onSuccess(resp.user));
    } catch (e) {
      dispatch(onFailure(e));
    }
  };
}

export function updateUser(changedUser) {
  function onSuccess(user) {
    return { type: "UPDATEUSER_SUCCESS", user: user };
  }
  function onFailure(error) {
    return { type: "UPDATEUSER_FAILURE", updateError: error };
  }

  return async (dispatch) => {
    try {
      let resp = await UserService.update(changedUser);
      dispatch(onSuccess(resp));
    } catch (e) {
      dispatch(onFailure(e));
    }
  };
}

export function getUser(id) {
  function onSuccess(user) {
    return { type: "LOGIN_SUCCESS", user: user };
  }
  function onFailure(error) {
    return { type: "LOGIN_FAILURE", error: error };
  }

  return async (dispatch) => {
    try {
      let resp = await UserService.getUser(id);
      dispatch(onSuccess(resp.user));
    } catch (e) {
      dispatch(onFailure(e));
    }
  };
}

export function getUserName(id) {
  function onSuccess(userIdName) {
    return { type: "GETUSERNAME_SUCCESS", userIdName: userIdName };
  }
  function onFailure(error) {
    return { type: "GETUSERNAME_ERROR", error: error };
  }

  return async (dispatch) => {
    try {
      let resp = await UserService.getUserName(id);
      dispatch(onSuccess(resp));
    } catch (e) {
      dispatch(onFailure(e));
    }
  };
}

export function getUserRating(id) {
  function onSuccess(userIdRating) {
    return { type: "GETUSERRATING_SUCCESS", userIdRating: userIdRating };
  }
  function onFailure(error) {
    return { type: "GETUSERRATING_ERROR", error: error };
  }

  return async (dispatch) => {
    try {
      let resp = await UserService.getUserRating(id);

      dispatch(onSuccess(resp));
    } catch (e) {
      dispatch(onFailure(e));
    }
  };
}

export function getUserImage(id) {
  function onSuccess(userIdImageurl) {
    return { type: "GETUSERIMAGE_SUCCESS", userIdImageurl: userIdImageurl };
  }
  function onFailure(error) {
    return { type: "GETUSERIMAGE_ERROR", error: error };
  }

  return async (dispatch) => {
    try {
      let resp = await UserService.getUserImage(id);
      dispatch(onSuccess(resp));
    } catch (e) {
      dispatch(onFailure(e));
    }
  };
}

export function getOtherUser(id) {
  function onSuccess(otherUser) {
    return { type: "GETOTHERUSER_SUCCESS", otherUser: otherUser };
  }
  function onFailure(error) {
    return { type: "GETOTHERUSER_ERROR", error: error };
  }

  return async (dispatch) => {
    try {
      let resp = await UserService.getOtherUser(id);
      dispatch(onSuccess(resp));
    } catch (e) {
      dispatch(onFailure(e));
    }
  };
}

export function updateOtherUser(changedUser) {
  function onSuccess(user) {
    return { type: "UPDATEOTHERUSER_SUCCESS", updatedOtherUser: user };
  }
  function onFailure(error) {
    return { type: "UPDATEPTHERUSER_ERROR", updatedOtherUserError: error };
  }

  return async (dispatch) => {
    try {
      let resp = await UserService.update(changedUser);
      dispatch(onSuccess(resp));
    } catch (e) {
      dispatch(onFailure(e));
    }
  };
}
