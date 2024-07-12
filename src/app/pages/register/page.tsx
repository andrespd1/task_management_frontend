"use client"

import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import ErrorModal from "../../components/error-modal";
import { redirect, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import LoadingComponent from "@/app/components/loading/loading-component";

export default function RegisterPage() {

  useEffect(() => {
    if(Cookies.get('accessToken')){
      redirect('/pages/tasks')
    }
  }, []);
  
  const router = useRouter()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [openErrorModal, setOpenErrorModal] = useState<boolean>(false)

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
      const formData = new FormData(event.currentTarget)
      if(formData.get('password') != formData.get('repeat_password')){
        setOpenErrorModal(true)
        setError("The password doesn't match")
      } else{
          try{
            const formObject: { [key: string]: any } = {}
            formData.forEach((value, key) => {
              formObject[key] = value
            })
            const response = await fetch('http://localhost:8000/users/signup',{
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(formObject),
            })
            const data = await response.json();
            if(!response.ok && !openErrorModal){
              setError(data.detail instanceof String ? data.detail : 'An error has occurred!')
              setOpenErrorModal(true)
            } else{
              Cookies.set('accessToken', data.token.access_token, {expires: (1/24)})
              router.push("/pages/tasks")
            }
          } catch(error: any){
            setError(error.message)
          } finally{
            setIsLoading(false)
        }
      }
  }

  return (
    <>
    {isLoading && <LoadingComponent/>}
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign up
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-6" onSubmit={onSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                Full name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Repeat password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="repeat_password"
                  name="repeat_password"
                  type="password"
                  required
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-purple-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already an user?{' '}
            <a href="/pages/login" className="font-semibold leading-6 text-purple-600 hover:text-purple-800">
              Sign in
            </a>
          </p>
        </div>
        {openErrorModal && <ErrorModal title={"Error at Sign Up"} msg={error} openerHandler = {setOpenErrorModal}/>}
    </div> 
    </>
  );
}
