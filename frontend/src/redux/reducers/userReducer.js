const getUser = () => {
  if (window.localStorage["jwtToken"]) {
    let token = window.localStorage["jwtToken"];
    let base64Url = token.split(".")[1];
    let base64 = base64Url.replace("-", "+").replace("_", "/");
    let userJson = JSON.parse(window.atob(base64));
    // if token is expired delete it and return {}
    // --> User is not logged in anymore.
    if (userJson.exp > Date.now()) {
      window.localStorage.removeItem("jwtToken");
      return {};
    }
    return {
      user: {
        _id: userJson.id,
        name: userJson.name,
        email: userJson.email,
        address: userJson.address,
        city: userJson.city,
        postcode: userJson.postcode,
        tel: userJson.tel,
        imageUrl: userJson.imageUrl,
        ratings: userJson.ratings,
      },
    };
  }
  return {};
};

export default function user(state = getUser(), action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { user: action.user };
    case "LOGIN_FAILURE":
      return { loginError: "Password or username incorrect." };
    case "FETCH_FAILURE":
      return { fetchError: "Something went wrong. Please try later :(" };
    case "FETCH_FAILURE":
      return { error: "Connection not possible." };
    case "LOGIN_RESET":
      return {};
    case "LOGOUT":
      return {};
    case "UPDATEUSER_SUCCESS":
      return { user: action.user };
    case "UPDATEUSER_FAILURE":
      return { updateError: action.error };
    default:
      return state;
  }
}
