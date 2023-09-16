export const validation = async(schema, data) => {
  const validationResult = schema.validate(data, { abortEarly: false });

  if (validationResult.error) throw new Error(validationResult.error);
  return;
};
