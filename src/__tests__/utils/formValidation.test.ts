import { usernameValidation } from "../../utils/formValidation";

describe('form validation functions', () => {
    describe('username errors', () => {
        describe('invalidLength()', () => {
            test('too short', () => {
                const hasError = usernameValidation.invalidLength(':)');
                expect(hasError).toBe(true);
            });

            test('too long', () => {
                const hasError = usernameValidation.invalidLength('thisUsernameIsFarTooLongToBeAValidUsername');
                expect(hasError).toBe(true);
            });

            test('valid length', () => {
                const hasError = usernameValidation.invalidLength('Im valid');
                expect(hasError).toBe(false);
            });
        });

        describe('hasSpecialChars()', () => {
            test('has a special character', () => {
                const hasError = usernameValidation.hasSpecialChars('cool!');
                expect(hasError).toBe(true);
            });

            test('has a space', () => {
                const hasError = usernameValidation.hasSpecialChars('two words');
                expect(hasError).toBe(true);
            });

            test('no special characters', () => {
                const hasError = usernameValidation.hasSpecialChars('cool');
                expect(hasError).toBe(false);
            });
        });
    });
});
