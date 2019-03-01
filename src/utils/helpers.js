/**
 * Converte o 'timestamp' recebido para o formato brasileiro de data dd/mm/yy
 * Souce: code extracted from Udacity course, "Clone Tweet"
 *
 * @export
 * @param {any} timestamp
 * @returns
 */
export function formatDate(timestamp){
  const d = new Date(timestamp)
  const time = d.toLocaleDateString()
  // return time.substr(0, 5) + '/' + time.slice(-2) + ' | ' + d.toLocaleDateString()
  return  time.substr(0, 5) + '/' + time.slice(-2)
}

/**
 * 
 * Ordena o array de acordo com o parametro desejado ('key').
 * Se order = true -> ordena asc
 * Se order = false -> ordena desc
 * 
 * Souce: código baseado de Olayinka Omole
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
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }

    return order ? comparison : (comparison * -1);
  
  };
}