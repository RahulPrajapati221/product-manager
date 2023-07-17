export const successMsg = {
  success: "Successful",
  login: "Logged in successfully",
  Logout: "Logged out successful",
  created: "Created successfully",
};

export const statusCode = {
  success: 200,
  created: 201,
  badRequest: 400,
  unauthorized: 401,
  notFound: 404,
  serverError: 500,
  forbidden: 403,
};

export const errorMsg = {
  loginError: "invalid Email or Password",
  passError: 'Password cannot contain "password"',
  invalidEmail: "Invalid Email",
  ageError: "Age must be positive",
  badRequest: "Invalid request",
  serverError: "There is an internal server error.",
  unauthorized: "Access denied",
  notFound: (value: string) => `${value} Not found, Please try again.`,
  forbidden: "You don't have permission to access this resource",
};

export const alertMsg = {
  invalidUpdate: (value: string[]) =>
    !`${value}`
      ? `All fields are correct`
      : `( ' ${value} ' ) are invalid field or Update not allowed`,
};
export const constants = {
  user: "User",
  product: "product",
};
