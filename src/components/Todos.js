import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as TodoActions from '../actions/todo'

// const { todos, addTodo } = this.props

const Todos = ({ todos, addTodo}) => (
  // <div>teste</div>
  <div>
   <ul>
      { todos.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      )) }
    </ul>
    <button onClick={() => addTodo('Fazer café')}>Novo Todo</button>
  </div>
);

const mapStateToProps = store => {
  return{
  todos: store.todos,
}}

const mapDispatchToProps = dispatch => bindActionCreators(TodoActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
