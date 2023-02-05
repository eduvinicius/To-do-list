// CSS
import styles from './App.module.css'
// Components
import Footer from './components/Footer';
import Form from './components/Form';
import Header from './components/Header';
import TaskList from './components/TaskList';
import Modal from './components/Modal';

// hooks
import { useState } from 'react';

// Interfaces
import { ITask } from './interfaces/ITask';


function App() {

  const [taskList, setTaskList] = useState<ITask[]>([]);
  const [taskToUpdate, setTaskToUpdate] = useState<ITask | null>(null);

  const dateOfToday = (): string => {
    const date: Date = new Date();
    let dateToday: string = date.toLocaleDateString();

    return dateToday;
  }

  const deleteTask = (id: number) => {
    setTaskList(
      taskList.filter((task) => {
        return task.id !== id
      })
    )
  }

  const hideOrShowModal = (display: boolean) => {
    const modal = document.querySelector("#modal");
    if (display) {
      modal!.classList.remove("hide")
    } else {
      modal!.classList.add("hide")
    }
  }

  const editTask = (task: ITask): void => {
    hideOrShowModal(true);
    setTaskToUpdate(task)
  }

  const updateTask = (id: number, title: string, time: string) => {

    const updateTask: ITask = {id, title, time}

    const updatedItens = taskList.map((task) => {
      return task.id === updateTask.id ? updateTask : task
    });

    setTaskList(updatedItens);
    hideOrShowModal(false);
  }

  return (
    <div>
      <Modal children={<Form 
        btnText='Editar' 
        task={taskToUpdate} 
        taskList={taskList}
        handleUpdate={updateTask} 
        />} 
      />
      <Header />
      <main className={styles.main}>
        <div>
          <h2>O que você vai fazer hoje?</h2>
          <h4>Data de hoje: {dateOfToday()}</h4>
          <Form 
            btnText='Criar Tarefa' 
            taskList={taskList}
            setTaskList={setTaskList}
          />
        </div>
        <div>
          <h2>Suas tarefas do dia:</h2>
          <TaskList 
            taskList={taskList}
            handleDelete={deleteTask}
            handleEdit={editTask} 
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
