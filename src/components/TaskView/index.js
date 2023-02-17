import {BsFillArchiveFill} from 'react-icons/bs'
import './index.css'

const TaskView = props => {
  const {taskDetails, handleDeleteTask} = props
  const {taskTodo, categoryOfTask, id} = taskDetails

  const onClickDelete = () => {
    handleDeleteTask(id)
    console.log(id)
  }

  return (
    <>
      <input
        type="checkbox"
        id={`checkbox-${id}`}
        name={`checkbox-${id}`}
        value={taskTodo}
      />
      <label className="label" htmlFor={`checkbox-${id}`}>
        <li className="each-todo-task">
          <div contentEditable="true" id="editable-paragraph">
            <span className="task-text">{taskTodo}</span>
          </div>
          <div className="tag-delete-container">
            <p className="tag-span">{categoryOfTask}</p>
            <button
              type="button"
              className="delete-button"
              onClick={onClickDelete}
            >
              <BsFillArchiveFill className="delete-icon" />
            </button>
          </div>
        </li>
      </label>
    </>
  )
}

export default TaskView
