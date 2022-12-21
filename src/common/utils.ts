export interface FlexibleObject {
  [key: string]: any;
}

export const utils = {
  SALT: 10,
};

export const jsonResponseParsed = (status, data, message) => {
  return {
    status,
    data,
    message,
  };
};
