# DBJsonDK v:1.0.0

Primer verión de DBJsonDK, una base de datos con archivos JSON.  

### Instalación

```cmd
npm install DBJsonDK --save
```

### Librerías de uso

Este proyecto utiliza las siguientes librerías para su funcionamiento:  
* uuid
* moment

### Como se implementa

````javascript

// Importar librería
import { DBJsonDK } from './DBJsonDK';

// Crear nueva base de datos
const usuarios = new DBJsonDK('./usuarios.json');

````

### Lista de comandos

* ``getAll()`` Muestra todos los registros de la BD.
* ``getById(id)`` Muestra el registro que coincida por el ID de la BD.
* ``add(item, includeDates)`` Agrega un nuevo registro a la BD, (tu puedes establecer si requieres la fecha de creación y edición).
* ``update(id, updatedItem)`` Actualizar el registro por el id ingresado.
* ``delete(id)`` Elimina el registro con el id ingresado.
* ``search(criteria)`` Busqueda avanada de registros.
* ``count()`` Conteo de registros totales en la BD.
* ``clear()`` Limpia la BD.

### Uso de comados

#### getAll()

````javascript

// Mostrar todos los usuarios
console.log('BD Usuarios creada:', usuarios.getAll());

/*
Ejemplo de mostrar laBD usuarios

BD Usuarios creada: []
*/

````

#### getById(id)

````javascript

// Mostrar usuario por id
const userID = usuarios.getById('794a5efe-6bfe-415e-a12e-d64e7a8d404e');
console.log(userID);

/*
Ejemplo de búsqueda por id

[{
  id: '794a5efe-6bfe-415e-a12e-d64e7a8d404e',
  usuario: 'admin',
  clave: 'password',
  datos: 'Administrador del sistema',
  createdAt: '24/09/2024, 3:22:21pm',
  updatedAt: ''
  }]
*/

````

#### add(item, includeDates)

````javascript 

// Agregar nuevos usuarios, especificas mendiante FALSE si NO requieres que agregue los campos de fechas(createAt y updateAt)
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

/*
Ejemplo de campos insertados

Usuarios agregados: [
  {
    id: '794a5efe-6bfe-415e-a12e-d64e7a8d404e',
    usuario: 'admin',
    clave: 'password',
    datos: 'Administrador del sistema',
    createdAt: '24/09/2024, 3:22:21pm',
    updatedAt: ''
  },
  {
    id: 'bcd5ad8b-bfd8-41b4-a0f0-523e7022333a',
    usuario: 'test',
    clave: 'password',
    datos: 'Usuario de prueba',
    createdAt: '24/09/2024, 3:22:21pm',
    updatedAt: ''
  },
  {
    id: '585a51b3-1460-4a1e-93d0-37bfeef79b62',
    usuario: 'master',
    clave: 'password',
    datos: 'Usuario master',
    createdAt: '24/09/2024, 3:22:21pm',
    updatedAt: ''
  },
  {
    id: '50d5a563-13fe-4c9c-ba2f-05b61eb48345',
    usuario: 'eliminar',
    clave: 'eliminar',
    datos: 'Usuario para eliminar',
    fecha: 2024-09-24T21:22:21.755Z
  },
  {
    id: 'd1ad83b1-3ec5-4b39-b2e9-bdcb1651474a',
    usuario: 'super',
    clave: 'passsword',
    datos: 'Usuario super',
    fecha: 2024-09-24T21:22:21.755Z
  }
]
*/

````

#### update(id, updatedItem)

````javascript

// Actualizar usuarios especificos por ID
const upUser = usuarios.update('bcd5ad8b-bfd8-41b4-a0f0-523e7022333a', { datos: 'ACTUALIZADO'});
const upUser1 = usuarios.update('50d5a563-13fe-4c9c-ba2f-05b61eb48345', { datos: 'ACTUALIZADO 1'});
if (upUser && upUser1) {
  console.log(`Usuarios atualizados.`);
} else {
  console.log(`No se actualizo los usuarios`);
}

/*
Ejemplo de usuarios actualizados

{
    id: 'bcd5ad8b-bfd8-41b4-a0f0-523e7022333a',
    usuario: 'test',
    clave: 'password',
    datos: 'ACTUALIZADO',
    createdAt: '24/09/2024, 3:22:21pm',
    updatedAt: '24/09/2024, 3:22:21pm'
  },
  {
    id: '50d5a563-13fe-4c9c-ba2f-05b61eb48345',
    usuario: 'eliminar',
    clave: 'eliminar',
    datos: 'ACTUALIZADO 1',
    fecha: 2024-09-24T21:22:21.755Z
  },
*/

````

#### delete(id)

````javascript

// Eliminar un usuario de la BD
const deleteSuccess = usuarios.delete('d1ad83b1-3ec5-4b39-b2e9-bdcb1651474a');
if (deleteSuccess) {
  console.log(`Usuario eliminado.`);
} else {
  console.log(`Error al eliminar el usuario.`);
}

````

#### search(criteria)

````javascript

// Búsqueda avanzada
const searchResult = usuarios.search({ usuario: 'admin' });
console.log('Resultados de búsqueda (usuario: admin):', searchResult);

// Búsqueda por múltiples campos
const multiFieldSearch = usuarios.search({ usuario: 'test', clave: 'password' });
console.log('Resultados de búsqueda (usuario: test, clave: password):', multiFieldSearch);

/*
Ejemplo de búsqueda avanzada

Resultados de búsqueda (usuario: admin): [
  {
    id: '794a5efe-6bfe-415e-a12e-d64e7a8d404e',
    usuario: 'admin',
    clave: 'password',
    datos: 'Administrador del sistema',
    createdAt: '24/09/2024, 3:22:21pm',
    updatedAt: ''
  }
]
Resultados de búsqueda (usuario: test, clave: password): [
  {
    id: 'bcd5ad8b-bfd8-41b4-a0f0-523e7022333a',
    usuario: 'test',
    clave: 'password',
    datos: 'ACTUALIZADO',
    createdAt: '24/09/2024, 3:22:21pm',
    updatedAt: '24/09/2024, 3:22:21pm'
  }
]
*/

````

#### count()

````javascript

// Contar registros
const recordCount = usuarios.count();
console.log('Número de registros:', recordCount);

/*
Ejemplo del conteo de los registros.

Número de registros: 4
*/

````

#### clear()

````javascript

// Limpiar el contenido del archivo
usuarios.clear();
// Mostrar todos los usuarios después de limpiar
console.log('Usuarios después de limpiar:', usuarios.getAll());

/*
Ejemplo del limpiar la BD.

Usuarios después de limpiar: []
*/

````