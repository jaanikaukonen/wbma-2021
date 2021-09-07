import {useState} from 'react';
import { useUser } from "./ApiHooks";

const useSignUpForm = (callback) => {
  const {checkIfUsernameIsAvailable} = useUser();
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
    email: '',
    full_name: '',
  });

  const [registerErrors, setRegisterErrors] = useState({});

  const handleInputChange = (name, text) => {

    setInputs((inputs) => {
      return {
        ...inputs,
        [name]: text,
      };
    });
  };

  const checkUsername = async (username) => {

    if (username.length < 1) {
      return;
    }

    try {
      const availability = await checkIfUsernameIsAvailable(username);

      if (!availability) {
        setRegisterErrors( (registerErrors) => {
          return {...registerErrors, username: 'Username already exists'};
        });
      } else {
        setRegisterErrors( (registerErrors) => {
          return {...registerErrors, username: null};
        });
      }

    } catch (e) {
      console.log('checkUsername failed' + e.message)
    }
  };

  return {
    handleInputChange,
    inputs,
    registerErrors,
    setRegisterErrors,
    checkUsername,

  };
};

export default useSignUpForm;
