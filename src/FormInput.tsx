import React, {ChangeEvent,Component} from 'react';
import './FormInput.css';
import {Input} from './components/Input/Input.component';
import { usernameErrors } from './constants/errorMessages';
import { usernameValidation } from './utils/formValidation';

interface State {
  username: {
    value: string;
    isValidLength: {
      errorMessage: string;
      hasError: boolean;
    };
    hasSpecialChars: {
      errorMessage: string;
      hasError: boolean;
    }
  }
}

class FormInput extends Component {
  state: State = {
    username: {
      value: '',
      isValidLength: {
        errorMessage: usernameErrors.isValidLength,
        hasError: false
      },
      hasSpecialChars: {
        errorMessage: usernameErrors.hasSpecialChars,
        hasError: false
      }
    }
  }

 onChange = (field: string, event: ChangeEvent<HTMLInputElement>): void => {
   const value = event.target.value;

   if(field === 'username') {
     this.handleUsernameValidation(value)
   }
 };

 handleUsernameValidation = (value: string):void => {
   this.setState({
    username: {
      value,
      isValidLength: {
        errorMessage: usernameErrors.isValidLength,
        hasError: usernameValidation.invalidLength(value)
      },
      hasSpecialChars: {
        errorMessage: usernameErrors.hasSpecialChars,
        hasError: usernameValidation.hasSpecialChars(value)
      }
    }
   })
 }

  render() {
    return (
      <div className="simple-form">
        <Input
          id="username"
          name="username"
          placeholder="Username"
          type="text"
          value={this.state.username.value}
          onChange={this.onChange.bind(this, 'username')}
        />
      </div>
    );
  }
}

export default FormInput;
