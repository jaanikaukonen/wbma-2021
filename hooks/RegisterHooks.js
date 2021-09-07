import { useState } from "react";
import { useUser } from "./ApiHooks";
import { validator } from "../utils/validator";

const constraints = {
  username: {
    presence: true,
    length: {
      minimum: 3,
      message: "^Username must be at least 3 characters long"
    }
  },
  password: {
    presence: true,
    length: {
      minimum: 6,
      message: "^Password must be at least 6 characters"
    }
  },
  confirm_password: {
    presence: true,
    equality: {
      attribute: "password",
      message: "^Passwords doesn't match",
    }

  },
  email: {
    presence: true,
    email: {
      message: "^Enter a valid email address"
    }
  },
  full_name: {
    format: {
      pattern: "[a-zA-Z]+",
      message: "^Full name can only contain letters"
    }
  }

};

const useSignUpForm = (callback) => {
  const { checkIfUsernameIsAvailable } = useUser();
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    email: "",
    full_name: ""
  });

  const [registerErrors, setRegisterErrors] = useState({});

  const handleInputChange = (name, text) => {
    setInputs((inputs) => {
      return {
        ...inputs,
        [name]: text
      };
    });
  };

  const handleOnEndEditing = (name, text) => {

    let error = validator(name, text, constraints);

    if (name === 'confirm_password') {
      error = validator(name, {password: inputs.password, confirm_password: text}, constraints)
    } else {
      error = validator(name, text, constraints);
    }

    setRegisterErrors((registerErrors) => {
      return {
        ...registerErrors,
        [name]: error
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
        setRegisterErrors((registerErrors) => {
          return { ...registerErrors, username: "Username already exists" };
        });
      }
    } catch (e) {
      console.log("checkUsername failed" + e.message);
    }
  };

  return {
    handleInputChange,
    handleOnEndEditing,
    inputs,
    registerErrors,
    setRegisterErrors,
    checkUsername

  };
};

export default useSignUpForm;
