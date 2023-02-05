// CSS
import styles from './Form.module.css'

// hooks
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';

// Interfaces
import { ITask } from '../interfaces/ITask';


interface Props {
    btnText: string;
    taskList: ITask[];
    setTaskList?: React.Dispatch<React.SetStateAction<ITask[]>>;
    task?:ITask | null;
    handleUpdate?(id: number, title: string, time: string): void
}

const Form = ({btnText, taskList, setTaskList, task, handleUpdate}: Props) => {

    const [id, setId] = useState<number>(0);
    const [title, setTitle] = useState<string>("");
    const [time, setTime] = useState<string>("");

    useEffect(() => {

        if (task) {
            setId(task.id);
            setTitle(task.title);
            setTime(task.time);
        }
    }, [task])

    const addTaskHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (handleUpdate) {
           handleUpdate(id, title, time)
        } else {
            const id:number = Math.floor(Math.random() * 1000)
            const newTask: ITask = {id, title, time}
            
            setTaskList!([...taskList, newTask]);
            
            setTitle("");
            setTime("");
        } 
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {

        if (e.target.name === "title") {
            setTitle(e.target.value)
        } else {
            setTime(e.target.value)
        }
    }

  return (
    <form onSubmit={addTaskHandler} className={styles.form}>
        <div className={styles.input_container}>
            <label htmlFor="title">Título:</label>
            <input 
                type="text" 
                name='title' 
                placeholder='Título da tarefa' 
                onChange={handleChange}
                value={title}
                required 
            />
        </div>
        <div className={styles.input_container}>
            <label htmlFor="time">Horário:</label>
            <input 
                type="text" 
                name='time' 
                placeholder='Horário da tarefa' 
                onChange={handleChange}
                value={time}
                required
            />
        </div>
        <input 
            type="submit" 
            value={btnText} 
        />
    </form>
  )
}

export default Form