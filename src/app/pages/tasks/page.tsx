"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import CreateTask from "@/app/components/createTask/createTask-component";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [openCreate, setOpenCreate] = useState(false);
  const [form, setForm] = useState({dueDate: new Date()});

  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (token) {
      fetch("http://localhost:8000/tasks", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.status === 401) {
            return 401;
          }
          return response.json();
        })
        .then((data) => {
          if (data === 401) {
            Cookies.remove("accessToken");
            redirect("/pages/login");
          } else {
            setTasks(data);
          }
        })
        .catch((error) => console.error("Error fetching tasks:", error));
    } else {
      redirect("/pages/login");
    }
  }, [openCreate]);

  const handleCreate = () => {
    setOpenCreate(true);
  };

  return (
    <>
      {openCreate && <CreateTask open={openCreate} setOpen={setOpenCreate} form={form} handleForm={setForm}/>}
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Your tasks
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {tasks.length > 0 ? (
              tasks.map((task: any) => (
                <div key={task.id} className="group relative">
                  <div className="mt-4 flex justify-between bg-slate-50 rounded-lg p-5 drop-shadow-xl h-30">
                    <div className="w-2/3">
                      <h3 className="text-sm text-gray-700">
                        <a href={""}>
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
                          <b>{task.title}</b>
                        </a>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {task.description}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      {task.due_date}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <></>
            )}
            <div className="mt-4 flex bg-slate-50 rounded-lg drop-shadow-xl h-30 outline-dashed">
              <button
                onClick={handleCreate}
                className="w-full h-full items-center group relative flex justify-center"
              >
                <PlusCircleIcon className="size-14" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
