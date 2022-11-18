function login(email : string, password : string) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === "elon@mercdev.com" && password === "twitter") {
        resolve({ data: { avatar: "/avatar.jpeg", name: "Elon" } });
      } else {
        reject({ error: "Incorrect email or password" });
      }
    }, 1000);
  });
}

export default login