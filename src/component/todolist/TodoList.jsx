import React, { useState, useEffect } from 'react';
import TodoCard from '/src/component/card-todo/Card-todo';
import Footer from '/src/component/footer/Footer'

function TodoList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({title: '', description: ''});
    const [showForm, setShowForm] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            setTasks(JSON.parse(savedTasks));
        }
    }, []);
    
    const addTask = () => {
        if (!newTask.title || !newTask.description) {
            return;
        }

        const updatedTask = [newTask, ...tasks];
        setTasks(updatedTask);
        setNewTask({ title: '', description: '' });
        setShowForm(false);
        setError(null);

        localStorage.setItem('tasks', JSON.stringify(updatedTask));
    };

    const deleteTask = (index) => {
        const updatedTask = tasks.filter((_, i) => i !== index);
        setTasks(updatedTask);

        localStorage.setItem('tasks', JSON.stringify(updatedTask));
    };

    return (
        <section className='absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-center h-[90vh] w-3/4 bg-blue-400 p-10'>
            <h1 className='bg-blue-800 rounded-xl p-2 text-3xl text-white font-medium'>To-Do List</h1>
            {error && <p>{error}</p>}
            {showForm ? (
                <div className='bg-blue-800 p-5 rounded-gl my-5'>
                    <form className='flex flex-col gap-2 bg-slate-100 p-5 rounded-md'
                    onSubmit={(e) => { e.preventDefault(); addTask(); }}>
                        <label>
                            <input className='w-full px-5 py-1 bg-none border-2 hover:border-blue-800 rounded-xl border-slate-400 text-l text-slate-900 '
                                placeholder='Add Tittle'
                                type="text"
                                value={newTask.title}
                                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} 
                            />
                        </label>
                        <label>
                            <textarea className='w-full align- px-5 py-1 bg-none border-2 hover:border-blue-800 rounded-xl border-slate-400 text-slate-500'
                                placeholder='Description'
                                value={newTask.description}
                                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                            />
                        </label>
                        <button className='bg-blue-800 w-max m-auto px-5 py-2 rounded-xl text-slate-200 hover:text-slate-600 hover:bg-blue-300'
                        type="submit">Add Task</button>
                    </form>
                </div>
            ) : (
                <button className='bg-blue-800 hover:bg-blue-600 rounded-full w-1/2 p-1 text-xl text-white hover:text-blue-100 m-3'
                    onClick={() => setShowForm(true)}>Add Todo</button>
            )}

            {tasks.length === 0 ? (
                    <h3 className='bg-blue-800 text-slate-200 py-5'>This Empty</h3>
                  ) : (
                    <div className="flex flex-col gap-2 sm:flex sm:flex-wrap sm:flex-row p-4 bg-blue-800 sm:w-11/12 h-3/5 overflow-x-hidden m-auto rounded-xl">
                    {tasks.map((task, index) => (
                      <TodoCard
                        key={index}
                        title={task.title}
                        description={task.description}
                        onDelete={() => deleteTask(index)}
                      />
                    ))}
                  </div>
                  )}
                        
            <Footer />
        </section>
    );
}

export default TodoList;