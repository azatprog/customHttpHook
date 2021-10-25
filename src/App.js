import React, { useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp from './hooks/use-http';

export const API_URL = 'https://react-http-69bef-default-rtdb.firebaseio.com/tasks.json';

function App() {
    const [tasks, setTasks] = useState([]);

    const transformTasks = tasksObject => {
        const loadedTasks = [];

        for (const taskKey in tasksObject) {
            loadedTasks.push({ id: taskKey, text: tasksObject[taskKey].text });
        }

        setTasks(loadedTasks);
    };

    const { isLoading, error, sendRequest: fetchTasks } = useHttp({url: API_URL}, transformTasks);

    useEffect(() => {
        fetchTasks();
    }, []);

    const taskAddHandler = (task) => {
        setTasks((prevTasks) => prevTasks.concat(task));
    };

    return (
        <React.Fragment>
        <NewTask onAddTask={taskAddHandler} />
        <Tasks
            items={tasks}
            loading={isLoading}
            error={error}
            onFetch={fetchTasks}
        />
        </React.Fragment>
    );
}

export default App;
