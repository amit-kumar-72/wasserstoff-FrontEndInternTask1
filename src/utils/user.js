import { v4 as uuidv4 } from 'uuid';

export function getUser() {
  let name = sessionStorage.getItem('username');  //  use sessionStorage here 
  if (!name) {
    name = prompt('Enter your username') || `User-${uuidv4().slice(0, 5)}`;
    sessionStorage.setItem('username', name);
  }
  return name;
}
