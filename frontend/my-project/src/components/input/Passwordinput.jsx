import React, { useState } from 'react';
import {FaRegEye, FaRegEyeSlash} from 'react-icons/fa6'

const Passwordinput = ({ value, onChange, placeholder }) => {
  // value: The current value of the input box
  // onChange: A function that updates the input value when the user types
  // placeholder: Optional text shown when the input is empty

  const [isShowPassword, setIsShowPassword] = useState(false);
  // isShowPassword is false at first (password hidden)
  // setIsShowPassword is the function to change the value

  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };
  // This function toggles the password visibility

  return (
    <div className='flex items-center bg-transparent border-[1.5px] px-5 rounded mb-3'>
      <input
        value={value}
        onChange={onChange}
        type={isShowPassword ? 'text' : 'password'} // shows/hides password
        placeholder={placeholder || 'Password'}
        className='w-full text-sm bg-transparent py-3 mr-3 rounded outline-none'
      />
      {isShowPassword ? <FaRegEye
        size={22}
        className='text-primary cursor-pointer'
        onClick={() => toggleShowPassword()}
        /> :
        <FaRegEyeSlash
        size={22}
        className='text-slate-400 cursor-pointer'
        onClick={() => toggleShowPassword()}
        />}
    </div>
  );
};

export default Passwordinput;
