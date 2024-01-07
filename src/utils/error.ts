export const errorFunction = (errorBit: boolean, msg: string, data?: any) => {
  if (errorBit) return { is_error: errorBit, message: msg };
  else return { is_error: errorBit, message: msg, data };
};
