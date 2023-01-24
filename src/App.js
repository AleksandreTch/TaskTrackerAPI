import React, { useEffect, useState } from "react";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import useHttp from "./hooks/use-http";

function App() {
  const [tasks, setTasks] = useState([]);

  const transformTasks = (taskObj) => {
    const loadedTasks = [];

    for (const taskKey in taskObj) {
      loadedTasks.push({
        id: taskKey,
        text: taskObj[taskKey].text,
      });
    }

    setTasks(loadedTasks);
  };

  const {isLoading, error, sendRequest: fetchTasks} = useHttp({
    url: "https://react-http-ace5c-default-rtdb.firebaseio.com/tasks.json", transformTasks
  });

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const taskAddHandler = async (task) => {
    const response = await fetch(
      "https://taskapp-c158b-default-rtdb.firebaseio.com/tasks.json",
      {
        method: "POST",
        body: JSON.stringify(task),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
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
