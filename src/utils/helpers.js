import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

/**
 * Calculate how much time since the post date
 * It uses a npm package called javascript-time-ago
 * (https://www.npmjs.com/package/javascript-time-ago)
 * 
*/ 
export function timeSince(date) {
  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo('en-US');
  return timeAgo.format(new Date(date));
}

function generateID(){
  return Math.random().toString(36).substring(2, 15) 
    + Math.random().toString(36).substring(2, 15);
}

export function formatPost({title, body, author, category}){
  return {
    id : generateID(),
    author,
    title,
    body,
    category,
    timestamp : Date.now(),
  }
}

export function formatComment({body, author, parentId}){
  return {
    id : generateID(),
    author,
    body,
    parentId,
    timestamp : Date.now(),
  }
}

//use the id of content as index of the array
export function getIdAsIndex(array) {
  return (
    array.reduce((all, line) => {
      all[line.id] = line
      return all
    }, {})
  )
} 

/**
 * 
 * Ordena o array de acordo com o parametro desejado ('key').
 * Se order = true -> ordena asc
 * Se order = false -> ordena desc
 * 
 * Source: código base de Olayinka Omole
 * (https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/)
 * 
 * @param {any} key 
 * @param {bool} order 
 */
export function sortList(key, order) {
  return function(a, b) {
    const varA = (typeof a[key] === 'string') ? 
      a[key].toUpperCase() : a[key];
    const varB = (typeof b[key] === 'string') ? 
      b[key].toUpperCase() : b[key];
      
    let comparison = 0;
    if (varA > varB) {
      comparison = -1;
    } else if (varA < varB) {
      comparison = 1;
    }

    return order ? comparison : (comparison * -1);
  
  };  
}

/**
 * Reseta os campos do formulário.
 * IMPORTANTE: Os campos TEM de receber useFormImput() quando estanciados
 * ex: const nome = useFormImput('')
 * ex: const sobrenome = useFormImput('Silva')
 * 
 * @param  {...any} args //campos que serão resetados
 */
export function resetFields(params) {
  console.log(`estou no resete em helpers: `, params)
  return Object.values(params).map(f => f.bind.reset());
}