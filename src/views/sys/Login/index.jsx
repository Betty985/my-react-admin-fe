import React from 'react'
import LoginForm from './LoginForm';
import './index.module.scss'
const Login=()=>{
   return (
    <div className="relative w-full h-full px-4">
    <div className="flex items-center absolute right-4 top-4">
        todo
    </div>

    <span className="-enter-x xl:hidden">
    AppLogo
    </span>

    <div className="container relative h-full py-2 mx-auto sm:px-10">
      <div className="flex h-full">
        <div className="hidden min-h-full pl-4 mr-4 xl:flex xl:flex-col xl:w-6/12">
          AppLogo 
          <div className="my-auto">
            <img
              alt={'title'}
              className="w-1/2 -mt-16 -enter-x"
            />
            <div className="mt-10 font-medium text-white -enter-x">
              <span className="inline-block mt-4 text-3xl"> todo</span>
            </div>
            <div className="mt-5 font-normal text-white dark:text-gray-500 -enter-x">
             todo
            </div>
          </div>
        </div>
        <div className="flex w-full h-full py-5 xl:h-auto xl:py-0 xl:my-0 xl:w-6/12">
          <div
            className="relative w-full px-5 py-8 mx-auto my-auto rounded-md shadow-md xl:ml-16 xl:bg-transparent sm:px-8 xl:p-4 xl:shadow-none sm:w-3/4 lg:w-2/4 xl:w-auto enter-x"
          >
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  </div>
   )
}
export default Login