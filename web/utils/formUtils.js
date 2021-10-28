export const textFieldChanged = (setter) => {
  return ($e) => {
    setter($e.target.value);
  };
};