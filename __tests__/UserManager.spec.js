// Test para UserManager

// Objetivo: Asegurar que la clase UserManager gestiona correctamente la lista de usuarios.

// Descripción General de los Tests:
// - Las pruebas deben verificar la funcionalidad clave de UserManager, incluyendo la adición de usuarios y la búsqueda por nombre.

/*
1. Prueba de Adición de Usuarios:
   - Verificar que un usuario se añade correctamente a la lista interna.
   - Comprobar que la longitud de la lista de usuarios incrementa adecuadamente después de la adición.
   - Asegurar que el usuario añadido se encuentra efectivamente en la lista.
*/

/*
2. Prueba de Búsqueda de Usuarios por Nombre:
   - Confirmar que la búsqueda por nombre retorna el usuario correcto si el nombre existe en la lista.
   - Verificar que la búsqueda es precisa y solo retorna el usuario que exactamente coincide con el nombre buscado.
   - Evaluar el comportamiento cuando se busca un nombre que no existe en la lista (e.g., retornar `undefined` o null).
*/

/*
3. Pruebas de Casos Especiales:
   - Probar la adición y búsqueda de múltiples usuarios con el mismo nombre para ver cómo gestiona la clase estas situaciones.
   - Evaluar el comportamiento al intentar añadir un usuario sin nombre o un objeto usuario vacío.
*/

/*
4. Pruebas de Robustez:
   - Comprobar cómo se manejan entradas no válidas, como intentar añadir un usuario nulo o buscar con un parámetro no string.
   - Asegurar que la clase gestiona correctamente situaciones de error o entradas inesperadas.
*/

// Nota: Estos comentarios sirven como guía para el desarrollo de las pruebas unitarias de la clase UserManager.
// Implementar cada caso de prueba asegurará que UserManager funciona como se espera bajo diferentes condiciones y con diversos tipos de entrada.

const UserManager = require("../src/UserManager");

describe("UserManager", () => {
  let userManager;

  beforeEach(() => {
    userManager = new UserManager();
  });
  
  it("should add user", () => {
    const user = {
      name: "paco",
      age: 42,
    };

    userManager.addUser(user);
    expect(userManager.users.length).toBe(1);
  });

  it("should only accept valid user objects", () => {
   const user = {
      name: "paco",
    };
    
   userManager.addUser(user)
   expect(userManager.users.length).toBe(0)

  });

  it("should only accept valid types insideuser objects", () => {
   const user = {
      name: "paco",
      age: "42"
    };
    
   userManager.addUser(user)
   expect(userManager.users.length).toBe(0)

  });

  it("should search user by name", () => {
    const user = { name: "paco", age: 20 };
    userManager.addUser({ name: "jose", age: 20 });
    userManager.addUser(user);
    expect(userManager.findUserByName("paco")).toEqual(user);
  });

  it("should return undefined for non-existend user", () => {
    const user = { name: "paco", age: 20 };
    userManager.addUser(user);
    expect(userManager.findUserByName("pepe")).toBeUndefined();
  });
});
