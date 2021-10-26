import { API_URL } from '../../App';
import useHttp from '../../hooks/use-http';

import Section from '../UI/Section';
import TaskForm from './TaskForm';

const NewTask = (props) => {
    const { isLoading, error, sendRequest: addTask } = useHttp();

    const applyData = (taskText, data) => {
        const generatedId = data.name; // firebase-specific => "name" contains generated id
        const createdTask = { id: generatedId, text: taskText };

        props.onAddTask(createdTask);
    };

    const enterTaskHandler = async (taskText) => {
        addTask(
            {
                url: API_URL,
                method: 'POST',
                body: { text: taskText },
                headers: { 'Content-Type': 'application/json' }
            },
            applyData.bind(null, taskText)
        );
    };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
