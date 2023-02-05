// CSS
import styles from './TaskList.module.css'

// Interfaces
import { ITask } from '../interfaces/ITask'
import { useState } from 'react';

interface Props {
  taskList: ITask[];
  handleDelete(id:number): void;
  handleEdit(task:ITask): void;
}

const TaskList = ({taskList, handleDelete, handleEdit}: Props) => {

  return (
    <>
      {taskList.length > 0 ? (
        taskList.map((task, index) => (
          <div id={`${task.id}`} key={task.id} className={styles.task}>
            <div className={styles.details}>
              <h4>{task.title}</h4>
              <p>Horário: {task.time}</p>
              <p id={`${index}`} className={styles.status}>Status da tarefa: </p>
            </div>
            <div className={styles.actions}> 
               <i className="bi bi-check2-circle" onClick={(e: React.MouseEvent<HTMLElement>) => {
                  if (e.target) {
                    let currentDiv = document.getElementById(`${task.id}`)
                    currentDiv?.classList.add(styles.task_done)
                    let status = document.getElementById(`${index}`)
                    status?.classList.add(styles.status_done)       
                  }
                 }}
                ></i> 
              
                <i className="bi bi-clipboard-x" onClick={(e: React.MouseEvent<HTMLElement>) => {
                    if (e.target) {
                      let currentDiv = document.getElementById(`${task.id}`)
                      currentDiv?.classList.remove(styles.task_done)
                      let status = document.getElementById(`${index}`)
                      status?.classList.remove(styles.status_done) 
                    }
                  }}
                ></i>
              
              <i 
                className='bi bi-pencil' 
                onClick={() => {
                  handleEdit(task)
                }}
              ></i>
              <i 
                className='bi bi-trash' 
                onClick={() => {
                  handleDelete(task.id)
                  }}
              ></i>
            </div>
          </div>
        ))
      ) : (
        <p>Não há tarefas</p>
      )}
    </>
  )
}

export default TaskList;