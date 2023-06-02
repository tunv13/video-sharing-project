import Api from "../Api";
const registerUrl = "/register";
class AuthService {
  register(body) {
    return Api.post(registerUrl, body);
  }
}

const instanceAuthSerice = new AuthService();

export default instanceAuthSerice;
