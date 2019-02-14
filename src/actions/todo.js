export function addTodo(text = 'teste') {
  console.log('actions: ', text)
  return {
    type : 'ASYNC_ADD_TODO',
    text,
  }
}