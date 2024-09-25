"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DBJsonDK_1 = require("./DBJsonDK");
const usuarios = new DBJsonDK_1.DBJsonDK('./usuarios.json');
// Mostrar todos los usuarios al inicio
console.log('BD Usuarios creada:', usuarios.getAll());
// Agregar nuevos usuarios
usuarios.add({
    usuario: 'admin',
    clave: 'password',
    datos: 'Administrador del sistema'
});
usuarios.add({
    usuario: 'test',
    clave: 'password',
    datos: 'Usuario de prueba'
});
usuarios.add({
    usuario: 'master',
    clave: 'password',
    datos: 'Usuario master'
});
usuarios.add({
    usuario: 'eliminar',
    clave: 'eliminar',
    datos: 'Usuario para eliminar',
    fecha: new Date()
}, false);
usuarios.add({
    usuario: 'super',
    clave: 'passsword',
    datos: 'Usuario super',
    fecha: new Date()
}, false);
console.log('Usuarios agregados:', usuarios.getAll());
// Actualizar un usuario existente
const userIdToUpdate = usuarios.getAll()[1].id; // Obtener el ID
const updateSuccess = usuarios.update(userIdToUpdate, { datos: 'ACTUALIZADO' });
const userIdToUpdate1 = usuarios.getAll()[3].id; // Obtener el ID
const updateSuccess1 = usuarios.update(userIdToUpdate1, { datos: 'ACTUALIZADO 1' });
if (updateSuccess && updateSuccess1) {
    console.log(`Usuario con ID ${userIdToUpdate} y ${userIdToUpdate1} actualizado.`);
}
else {
    console.log(`No se encontró el usuario con ID ${userIdToUpdate} y ${userIdToUpdate1}.`);
}
// Mostrar todos los usuarios después de la actualización
console.log('Usuarios después de la actualización:', usuarios.getAll());
// Eliminar un usuario existente (cambia el ID por uno válido)
const userIdToDelete = usuarios.getAll()[4].id; // Obtener el ID 
const deleteSuccess = usuarios.delete(userIdToDelete);
if (deleteSuccess) {
    console.log(`Usuario con ID ${userIdToDelete} eliminado.`);
}
else {
    console.log(`No se encontró el usuario con ID ${userIdToDelete}.`);
}
// Mostrar todos los usuarios después de la eliminación
console.log('Usuarios después de la eliminación:', usuarios.getAll());
// Búsqueda avanzada
const searchResult = usuarios.search({ usuario: 'admin' });
console.log('Resultados de búsqueda (usuario: admin):', searchResult);
// Búsqueda por múltiples campos
const multiFieldSearch = usuarios.search({ usuario: 'test', clave: 'password' });
console.log('Resultados de búsqueda (usuario: test, clave: password):', multiFieldSearch);
// Contar registros
const recordCount = usuarios.count();
console.log('Número de registros:', recordCount);
// Limpiar el contenido del archivo
usuarios.clear();
// Mostrar todos los usuarios después de limpiar
console.log('Usuarios después de limpiar:', usuarios.getAll());
