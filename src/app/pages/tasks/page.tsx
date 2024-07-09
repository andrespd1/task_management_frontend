"use client"

import Image from 'next/image'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'


export default function Tasks() {

  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const token = Cookies.get('accessToken');
    if (token) {
      fetch('http://localhost:8000/tasks', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(data => setTasks(data))
        .catch(error => console.error('Error fetching tasks:', error));
    }
  }, []);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Your tasks</h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          { tasks.length > 0 ? (tasks.map((task: any) => (
            <div key={task.id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <Image
                  alt={"Task image icon"}
                  src={"/assets/task_icon.png"}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  width={2000}
                  height={2000}
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={""}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {task.title}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{task.description}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">{task.due_date}</p>
              </div>
            </div>
          ))) : <p>No tasks available</p>}
        </div>
      </div>
    </div>
  )
}
