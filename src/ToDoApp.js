import React, { Component } from 'react';

//------------ASSETS-----------
import './assets/css/main.css';
import ellipsis from './assets/images/ellipsis.png';
import '../src/index.css';
import { FaPlus, FaMinus, FaTrashAlt, FaCheckSquare } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const API_URL = 'http://localhost:3001/todos';

const Title = ({todocount}) => {
    return <h1 style={{}} className='uppercase'>Todo List ({todocount})</h1>
}

const Form = ({addTodo}) =>{
    let input;
    return(
        
        <form className='w-full max-w-sm' onSubmit={(e) => {
            e.preventDefault();
            addTodo(input.value);
            input.value = '';
            }}>

            <input ref={node => {
                input = node;
            }} 
            type='text'
            className='input-style'
            style={{
                width:"350px",
                fontSize:"20px",
                backgroundColor: "#edf2f7" ,
                border:"2px solid #edf2f7",
                textAlign:"center",
                color:"#4a5568",
                padding:"4px"

            }} />
            <h3 style={{marginTop:"10px"}} className='text-center'>Enter a Task and Press Enter</h3>
        </form>
    )
}


const TodoList = ({todos, remove, crossline}) => {
    return (
        <table style={{padding:"50px"}} className="shadow bg-white" cellPadding='5' cellSpacing='20'>
            <tbody>
            {
                todos.map(todo => {
                    return (
                        
                        <tr className='row-style' key={todo.id}>
                            <td className={'rowDate'+todo.id}>{todo.date}</td>
                            <td className={'rowText'+todo.id}>{todo.text}</td>
                            <td><FaCheckSquare onClick={() => crossline(todo.id)} /></td>
                            <td><FaTrashAlt onClick={() => remove(todo.id)} /></td>
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
    )
}



export default class TodoApp extends Component{
    constructor(props){
        super(props);
        this.state = {
            todos: [],
        }
    }
    componentDidMount(){
        axios.get(API_URL)
            .then(res => {
                const todos = res.data;
                this.setState({
                    todos: todos,
                })
            })
    }
    AddTodo(text){
        let getdate = new Date();
        let date = getdate.toDateString();
        axios.post(API_URL, {text, date})
        .then(res => {
            console.log(res.data);
            this.state.todos.push(res.data);
            this.setState({
                todos: this.state.todos,
            })
        })
    }

    RemoveTodo(id){

        axios.delete(`http://localhost:3001/todos/${id}`)
            .then(res => {
                let newList;
                newList = this.state.todos.filter(todos => todos.id !== id);
                this.setState({
                    todos: newList,
                })
            })
    }

    Crossline(id){
        var rowDate = document.querySelector(`.rowDate${id}`);
        var rowText = document.querySelector(`.rowText${id}`);
        rowDate.classList.toggle('crossout');
        rowText.classList.toggle('crossout');
    }
    render(){
        return(
            <div className='flex justify-center flex-col items-center'>
                <Title className='' todocount={this.state.todos.length} />
                <Form addTodo={this.AddTodo.bind(this)} />
                <TodoList crossline={this.Crossline.bind(this)} todos={this.state.todos} remove={this.RemoveTodo.bind(this)} />
            </div>
        )
    }
}