const validUsersnameRegex = RegExp(/[^A-Za-z0-9]+/g);

export const usernameValidation = {
  invalidLength: (value: string):boolean => {
    return value.length < 6 || value.length > 15;
  },
  hasSpecialChars: (value: string):boolean => {
    return !!value.match(validUsersnameRegex);
  }
}