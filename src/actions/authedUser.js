import { SET_AUTHED_USER } from './const'

export function setAuthedUser(id) {
  return{
    type : SET_AUTHED_USER,
    id
  }
}