export interface FlexibleObject {
  [key: string]: any;
}

export const utils = {
  SALT: 10,
};

export const DEFAULT_PAGE = 1;

export const DEFAULT_LIMIT = 50;

export const jsonResponseParsed = (status, data, message) => {
  return {
    status,
    data,
    message,
  };
};

export const config = () => ({
  BUCKET: process.env.BUCKET,
  REGION: process.env.REGION,
  ACCESS_KEY_ID: process.env.ACCESS_KEY_ID,
  SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY,
});
