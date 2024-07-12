"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { FormEvent, useState } from "react";
import LoadingComponent from "../loading/loading-component";
import ErrorModal from "../error-modal";
import Cookies from "js-cookie";

export default function CreateTask(props: any) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [openErrorModal, setOpenErrorModal] = useState<boolean>(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData(event.currentTarget);
      const formObject: { [key: string]: any } = {};
      formData.forEach((value, key) => {
        formObject[key] = value;
      });

      const response = await fetch("http://localhost:8000/tasks/create", {
        method: "POST",
        body: JSON.stringify(formObject),
        headers: {
          "Authorization": `Bearer ${Cookies.get('accessToken')}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.detail);
        setOpenErrorModal(true);
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
      props.setOpen(false)
    }
  }

  return (
    <>
      {isLoading && <LoadingComponent />}
      {openErrorModal && (
        <ErrorModal
          title={"Error at while creating a task"}
          msg={error}
          openerHandler={setOpenErrorModal}
        />
      )}
      <Dialog
        open={props.open}
        onClose={props.setOpen}
        className="relative z-10"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <DialogPanel
                transition
                className="pointer-events-auto relative w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
              >
                <TransitionChild>
                  <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 duration-500 ease-in-out data-[closed]:opacity-0 sm:-ml-10 sm:pr-4">
                    <button
                      type="button"
                      onClick={() => {
                        props.setOpen(false);
                      }}
                      className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                    >
                      <span className="absolute -inset-2.5" />
                      <span className="sr-only">Close panel</span>
                      <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                    </button>
                  </div>
                </TransitionChild>
                <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                  <div className="px-4 sm:px-6">
                    <DialogTitle className="text-base font-semibold leading-6 text-gray-900">
                      Create task
                    </DialogTitle>
                  </div>
                  <div className="relative mt-6 flex-1 px-4 sm:px-6">
                    <form onSubmit={handleSubmit}>
                      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8">
                        <div className="col-span-full">
                          <label
                            htmlFor="username"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Title
                          </label>
                          <div className="mt-2">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                              <input
                                id="title"
                                name="title"
                                type="text"
                                placeholder="Your title here..."
                                className="block flex-1 border-0 bg-transparent p-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                required
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-span-full">
                          <label
                            htmlFor="description"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Description
                          </label>
                          <div className="mt-2">
                            <textarea
                              id="description"
                              name="description"
                              rows={3}
                              className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              defaultValue={""}
                              required
                            />
                          </div>
                          <p className="mt-3 text-sm leading-6 text-gray-600">
                            Write a description about the task you want to
                            create.
                          </p>
                        </div>
                        <div className="col-span-full">
                          <label
                            htmlFor="username"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Due date
                          </label>
                          <div className="mt-2">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                              <input
                                id="due_date"
                                name="due_date"
                                type="text"
                                placeholder="YYYY-MM-DD"
                                className="block flex-1 border-0 bg-transparent p-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                required
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-10 flex justify-end">
                        <button
                          type="submit"
                          className="flex w-2/5 justify-center rounded-md bg-purple-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Create task
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}
