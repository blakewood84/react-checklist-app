import React, { Component } from 'react';

//------------ASSETS-----------
import './assets/css/main.css';
import ellipsis from './assets/images/ellipsis.png';

import { FaPlus, FaMinus } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

export default class TodoApp extends Component{
    constructor(props){
        super(props);
        this.state = {
            todos: [
                {id: 0 , text: "Sample 1", isChecked: false},
                {id: 1 , text: "Sample 2", isChecked: false}
            ],
        }
    }
    Crossline(id){
        var row = document.querySelector(`.row${id}`);
        row.classList.toggle('crossout');
    }
    render(){
        return(
            <div>
                <table cellPadding='3' cellSpacing='3'>
                    <tbody>
                    {
                        this.state.todos.map(todo => {
                            return (
                                <tr key={todo.id}>
                                    <td className={'row'+todo.id}>Text: {todo.text}</td>
                                    <td ><input onClick={() => this.Crossline(todo.id)} type='checkbox' /> Mark Finished</td>
                                    <td><input type='checkbox' />Delete Task</td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}