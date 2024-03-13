// eslint-disable 
/**
 * Ejercicio de testing para testeo de clases
 * 
 * Especicificaciones:
 * 1. Debe tener una clase constructora que se llame UserManager
 * 
 * 2. Método para añadir un usuario a la lista
 *  - Parámetros: objeto usuario (nombre, edad)
 *  - Acción: Añade el usuario a la lista interna
 * 
 * 3. Método para buscar un usuario por nombre
 *  - Parámetros: nombre del usuario a buscar
 *  - Acción: Retorna el primer usuario que coincida con el nombre proporcionado
 *  - Nota: Considerar qué hacer si no se encuentra el usuario
 * 
 */

class UserManager {
  
  constructor() {
    this.users = [];
  }

  addUser(user) {

    if (user['name'] && typeof user['name'] === 'string' && user['age'] && typeof user['age'] ===  'number')
        this.users.push(user);
  
  }

  findUserByName(name) {
    return this.users.find((user) => user.name === name);
  }
}

module.exports = UserManager