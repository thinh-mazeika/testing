import React from 'react';
import { render, fireEvent, waitForElement, cleanup, wait } from '@testing-library/react';

import Form from '../../components/Form/Form';
import { usernameErrors } from '../../constants/errorMessages';

// https://testing-library.com/docs/react-testing-library/intro 
// this is what I used to test this form thinh :)
// look at the documentation for queries, firing events, and async utilities
describe('Form component', () => {
    describe('Username input', () => {
        // cleanup - Unmounts React trees that were mounted with render
        afterEach(cleanup);

        test('valid username :) (no error messages)', async () => {
            const form = render(<Form />)

            const usernameInput = form.getByTestId('username');

            fireEvent.change(usernameInput, {
                target: {
                    value: 'Thinh12345' // valid username entered
                }
            });

            // waits before checking if error elements exist
            await wait();

            // queryByText returns null if the text is not found
            expect(form.queryByText(usernameErrors.isValidLength)).toBeNull();
            expect(form.queryByText(usernameErrors.hasSpecialChars)).toBeNull();
        });

        test('show error message when username is too short', async () => {
            // renders a Form
            const form = render(<Form />)

            // find the input where data-testid is 'username' in Form
            const usernameInput = form.getByTestId('username');

            // fires change event for username input 
            // (simulates typing the text 'thinh' into the username input element)
            // this username is too short
            fireEvent.change(usernameInput, {
                target: {
                    value: 'Thinh'
                }
            });

            // waits for element with error text to appear in Form
            // getByText throws an error if the text can't be found (failing the test)
            await waitForElement(() => form.getByText(usernameErrors.isValidLength));
        });

        test('show error message when username is too long', async () => {
            const form = render(<Form />)
            const usernameInput = form.getByTestId('username');

            fireEvent.change(usernameInput, {
                target: {
                    value: 'ThisIsMySuperLongUsernameThatIsLongerThan30Characters'
                }
            });

            await waitForElement(() => form.getByText(usernameErrors.isValidLength));
        });

        test('show error message when username has special characters', async () => {
            const form = render(<Form />)
            const usernameInput = form.getByTestId('username');

            fireEvent.change(usernameInput, {
                target: {
                    value: 'Thinh123!'
                }
            });

            await waitForElement(() => form.getByText(usernameErrors.hasSpecialChars));
        });

        test('show multiple error messages when username is too short and has special characters', async () => {
            const form = render(<Form />)
            const usernameInput = form.getByTestId('username');

            fireEvent.change(usernameInput, {
                target: {
                    value: 'Kyle!'
                }
            });

            await waitForElement(() => form.getByText(usernameErrors.isValidLength));
            await waitForElement(() => form.getByText(usernameErrors.hasSpecialChars));
        });

        test('error message should disappear after username is valid', async () => {
            const form = render(<Form />)
            const usernameInput = form.getByTestId('username');

            fireEvent.change(usernameInput, {
                target: {
                    value: 'Thinh!'
                }
            });

            await waitForElement(() => form.getByText(usernameErrors.hasSpecialChars));

            fireEvent.change(usernameInput, {
                target: {
                    value: 'ThinhIsValid'
                }
            });

            await wait();

            expect(form.queryByText(usernameErrors.hasSpecialChars)).toBeNull();
        });
    });
});