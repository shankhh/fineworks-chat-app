
export const submitValidator = (credentials,type, cb) => {
  console.log(credentials);
  if(type === "signup") {
    if(credentials.username.length < 1) {
      cb(true, "Please enter a valid username.")
      return;
    }
  }
 
  if(credentials.email.length < 1) {
    cb(true, "Please enter a valid email");
    return;
  }

  if(credentials.password.length < 1) {
    cb(true, "Please enter a valid password");
    return;
  }

  cb(false, "");
}