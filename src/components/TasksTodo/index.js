import {Component} from 'react'
import {v4 as id} from 'uuid'

import TaskView from '../TaskView'
import Tags from '../Tags'
import './index.css'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class TasksTodo extends Component {
  state = {
    taskTodo: '',
    categoryOfTask: 'HEALTH',
    taskTodoList: [],
    filterTodoList: [],
  }

  handleChangeInUserInput = event => {
    this.setState({taskTodo: event.target.value})
  }

  handleChangeInCategoryOfTask = event => {
    this.setState({categoryOfTask: event.target.value})
  }

  handleSubmitForm = event => {
    event.preventDefault()
    const {taskTodo, categoryOfTask} = this.state
    const newTaskAsObj = {taskTodo, categoryOfTask, id: id()}
    this.setState(prevState => ({
      taskTodoList: [...prevState.taskTodoList, newTaskAsObj],
      taskTodo: '',
      categoryOfTask: 'HEALTH',
    }))
  }

  handleFilterByTag = (tag, isTagActive) => {
    const {taskTodoList} = this.state
    const toUpdateTaskList = taskTodoList.map(
      eachTodo =>
        eachTodo.categoryOfTask.toLowerCase() === tag.toLowerCase() && {
          ...eachTodo,
          isTagActive,
        },
    )
    const filterToUpdateTaskLis = toUpdateTaskList.filter(
      eachTodo => eachTodo.isTagActive,
    )
    this.setState({
      filterTodoList: filterToUpdateTaskLis,
    })
  }

  handleDeleteTask = taskId => {
    const {taskTodoList} = this.state
    const todoListAfterDelete = taskTodoList.filter(task => task.id !== taskId)
    const filterListAfterDelete = taskTodoList.filter(
      task => task.id !== taskId,
    )

    this.setState({
      taskTodoList: todoListAfterDelete,
      filterTodoList: filterListAfterDelete,
    })
  }

  renderTaskView = () => {
    const {taskTodoList, filterTodoList} = this.state
    console.log(taskTodoList, filterTodoList)

    return filterTodoList.length !== 0 ? (
      <ul className="tags-unordered-list">
        {filterTodoList.map(each => (
          <TaskView
            key={each.id}
            taskDetails={each}
            handleDeleteTask={this.handleDeleteTask}
          />
        ))}
      </ul>
    ) : (
      <ul className="tags-unordered-list">
        {taskTodoList.map(each => (
          <TaskView
            key={each.id}
            taskDetails={each}
            handleDeleteTask={this.handleDeleteTask}
          />
        ))}
      </ul>
    )
  }

  //   renderTaskView = () => {
  //     const {taskTodoList, filterTodoList} = this.state

  //     const tasks = filterTodoList.length !== 0 ? filterTodoList : taskTodoList

  //     return (
  //       <ul className="tags-unordered-list">
  //         {tasks.map(each => (
  //           <li key={each.id} className="task-item">
  //             <span className="task-text">{each.taskTodo}</span>
  //             <span className="task-type">{each.categoryOfTask}</span>
  //             <button
  //               type="button"
  //               className="delete-button"
  //               onClick={() => this.handleDeleteTask(each.id)}
  //             >
  //               {' '}
  //               Delete
  //             </button>
  //           </li>
  //         ))}
  //       </ul>
  //     )
  //   }

  render() {
    const {categoryOfTask, taskTodo, taskTodoList} = this.state
    // console.log(taskTodo)
    // console.log(categoryOfTask)
    return (
      <div className="main-container">
        <div className="create-task-container">
          <h1 className="create-task-heading">Create a task!</h1>
          <form onSubmit={this.handleSubmitForm} className="form-container">
            <label className="label" htmlFor="task-input">
              Task
            </label>
            <br />
            <input
              type="text"
              className="input-element"
              id="task-input"
              placeholder="Enter the task here"
              value={taskTodo}
              onChange={this.handleChangeInUserInput}
            />
            <br />
            <label className="label" htmlFor="task-type">
              Tags
            </label>
            <br />
            <select
              value={categoryOfTask}
              onChange={this.handleChangeInCategoryOfTask}
              className="input-element"
              id="task-type"
              name="tags"
            >
              {tagsList.map(each => (
                <option key={each.optionId} value={each.optionId}>
                  {each.displayText}
                </option>
              ))}
            </select>
            <button className="add-task-button" type="submit">
              Add Task
            </button>
          </form>
        </div>
        <div className="tags-task-view-container">
          <div className="tags-container">
            <h1 className="tags-heading">Tags</h1>
            <ul className="tags-unordered-list">
              {tagsList.map(each => (
                <Tags
                  key={each.optionId}
                  tagDetails={each}
                  handleFilterByTag={this.handleFilterByTag}
                />
              ))}
            </ul>
          </div>
          <div>
            <h1 className="tags-heading">Tasks</h1>
            {taskTodoList.length === 0 ? (
              <div>
                <p>No Tasks Added Yet</p>
              </div>
            ) : (
              this.renderTaskView()
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default TasksTodo
