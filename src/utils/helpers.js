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