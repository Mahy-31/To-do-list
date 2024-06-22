import React,{useState, useEffect} from 'react';
import './App.css';
import { MdOutlineDelete } from "react-icons/md";
import { TiTickOutline } from "react-icons/ti";
import { FaStepBackward } from "react-icons/fa";

function App() {
  
  const [isComplete,setIsComplete] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescr, setNewDescr] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);

  const addTodo = () => {
    let newTodoItem = {
      title: newTitle,
      description: newDescr
    }

    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);
    localStorage.setItem('todolist',JSON.stringify(updatedTodoArr));
  };

  const deleteTodo = (index) => {
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index,1);
    localStorage.setItem('todolist',JSON.stringify(reducedTodo));
    setTodos(reducedTodo);
  };

  const handleComplete = (index) => {
    let now = new Date ();
    let dd = now.getDate ();
    let mm = now.getMonth () + 1;
    let yyyy = now.getFullYear ();
    let h = now.getHours ();
    let m = now.getMinutes ();
    let s = now.getSeconds ();
    let completedOn =
      dd + '-' + mm + '-' + yyyy + ' at ' + h + ':' + m + ':' + s;

    let filteredItem = {
      ...allTodos[index],
      completedOn: completedOn
    }

    let updatedCompletedArr = [...completedTodos]
    updatedCompletedArr.push(filteredItem);
    setCompletedTodos(updatedCompletedArr);
    localStorage.setItem('completedTodos',JSON.stringify(updatedCompletedArr));
    deleteTodo(index);
  }

  const deleteCompletedTodo  = (index) => {
    let reducedTodo = [...completedTodos];
    reducedTodo.splice(index,1);
    localStorage.setItem('completedTodos',JSON.stringify(reducedTodo));
    setCompletedTodos(reducedTodo);
  }
  const addBackTodo = (index) => {
    let newAddTodoItem = completedTodos[index];

    let newUpdatedTodoArr = [...allTodos, newAddTodoItem];
    setTodos(newUpdatedTodoArr);
    localStorage.setItem('todolist', JSON.stringify(newUpdatedTodoArr));
    deleteCompletedTodo(index);
  }

  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem('todolist'));
    let savedCompletedTodos = JSON.parse(localStorage.getItem('completedTodos'));
    if(savedTodo){
      setTodos(savedTodo);
    } 

    if(savedCompletedTodos){
      setCompletedTodos(savedCompletedTodos);
    }
  },[])

  return (
    <div className="App">
      <div className="header">
        <h1>MY TO-DO LIST</h1>
      </div>
      <div className="to-do-box">
        <div className="form">
          <div className='task-name'>
          <label>Task name</label>
          <input type = "text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder='Type your task here' />
          </div>
          <div className='describe'>
          <label>Description</label>
          <input type = "text" value={newDescr} onChange={(e) => setNewDescr(e.target.value)} placeholder='Describe your task' />
          </div>
          <div className='add-btn'>
          <button type="button" onClick={addTodo} className='primaryBtn'>Add</button>
          </div>
        </div>
        <div className='btn-area'>
            <button className={`isComplete ${isComplete === false && 'active'}`} onClick={() => setIsComplete(false)}>To-do list</button>
            <button className={`isComplete ${isComplete === true && 'active'}`} onClick={() => setIsComplete(true)}>Completed list</button>
        </div>
        <div className='todo-list'>
          {isComplete===false && allTodos.map((item,index)=>{
            return(
              <div className='todo-list-item' key={index}>
                <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                </div>
                <div>
                <MdOutlineDelete className='del-icon' onClick={()=>deleteTodo(index)} />
                <TiTickOutline className='tick-icon' onClick={() => handleComplete(index)}/>
                </div>
              </div>
            )
          })}

          {isComplete===true && completedTodos.map((item,index)=>{
            return(
              <div className='todo-list-item' key={index}>
                <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <p><small>Completed On: {item.completedOn}</small></p>
                </div>
                <div>
                <MdOutlineDelete className='del-icon' onClick={()=>deleteCompletedTodo(index)} />
                <FaStepBackward className='back-icon' onClick={() => addBackTodo(index)}/>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
