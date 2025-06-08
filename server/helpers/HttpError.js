const messages = {
  400: "Bad request",
  403: "Forbidden",
  404: "Not found",
  409: "Conflict"
}

const HttpError = (status, message = messages[status]) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

export default HttpError;