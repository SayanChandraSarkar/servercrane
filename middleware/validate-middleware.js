const validate = (schema) => async (req, res, next) => {
  try {
    const parseBody = await schema.parseAsync(req.body);

    req.body = parseBody;

    next();
  } catch (err) {
    const status = 422;
    const message = "Fill up the input Properly";

    const errorMessages = err.errors.map((error) => error.message);
    console.error(errorMessages);

    // const extraDetails = err.errors[0].message;
    // res.status(400).json({ msg: extraDetails });

    const extraDetails = errorMessages.join(", "); // Concatenate all error messages
    res.status(status).json({ message, extraDetails });

    const error = {
      status,
      message,
      extraDetails,
    };
    console.log(error);

    next(error);
  }
};

module.exports = validate;
