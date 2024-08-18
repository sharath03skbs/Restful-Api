//Body validation using express-yup-middleware
import * as Yup from "yup";

const MIN_LENGTH = {
  name: 3,
  city: 2,
  country: 2,
};
const MAX_LENGTH = {
  name: 15,
  city: 10,
  country: 10,
  email: 25,
};

export const getUserSchema = {
  schema: {
    params: {
      yupSchema: Yup.object().shape({
        id: Yup.number().required(),
      }),
    },
  },
};

export const addUserSchema = {
  schema: {
    body: {
      yupSchema: Yup.object().shape({
        name: Yup.string().min(MIN_LENGTH.name).max(MAX_LENGTH.name),
        email: Yup.string().max(MAX_LENGTH.email),
        city: Yup.string().min(MIN_LENGTH.city).max(MAX_LENGTH.city),
        country: Yup.string().min(MIN_LENGTH.country).max(MAX_LENGTH.country),
      }),
      validateOptions: {
        strict: true,
      },
    },
  },
};

export const updateUserSchema = {
  schema: {
    params: {
      yupSchema: Yup.object().shape({
        id: Yup.number().required(),
      }),
    },
    body: {
      yupSchema: Yup.object().shape({
        name: Yup.string().min(MIN_LENGTH.name).max(MAX_LENGTH.name),
        email: Yup.string().max(MAX_LENGTH.email),
        city: Yup.string().min(MIN_LENGTH.city).max(MAX_LENGTH.city),
        country: Yup.string().min(MIN_LENGTH.country).max(MAX_LENGTH.country),
      }),
      validateOptions: {
        strict: true,
      },
    },
  },
};

export const deleteUserSchema = {
  schema: {
    params: {
      yupSchema: Yup.object().shape({
        id: Yup.number().required(),
      }),
    },
  },
};
