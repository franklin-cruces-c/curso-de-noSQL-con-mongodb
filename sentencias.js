/**
 *Version de MongoDB actual 8.0.3
 *Conectarse al cliente  shell de mongo 
 * mongosh --authenticationDatabase "admin" -u "******" -p "*****" * 
 * Version de MongoDB del curso 4.2.3 
 * Conectarse al cliente  shell de mongo 
 * mongo --authenticationDatabase "admin" -u "******" -p "*****" * 
 */

// inserOne -> inserta un documento
// inserMany-> inserta mas de un documento 

var user2 = {
    name: 'Fernando',
    last_name: 'Garcia',
    age: 24,
    email: 'fernando@codigofacilito.com'
}

var user3 = {
    name: 'Uriel',
    last_name: 'Camacho',
    age: 27,
    email: 'uriel@codigofacilito.com'
}

var user4 = {
    name: 'Marines',
    last_name: 'Mendez',
    age: 25,
    email: 'marines@codigofacilito.com'
}

db.users.insertOne(user2)
db.users.insertMany([user3,user4])

db.users.find(
    {age:25},//Criterios de busqueda -> Where 
)

db.users.find(
    {age:25},//Criterios de busqueda -> Where
    {name:true, email:true, _id:false} // lista de atributos a mostrar -> Select
)

db.users.find(
    {age:25},//Criterios de busqueda -> Where
    {name:true, email:true} // lista los atributos a mostrar
).pretty()

db.users.find(
    {age:25},//Criterios de busqueda -> Where
    {name:true, email:true, _id:false} // igual a la anterior pero ocultamos el id que se muestra por defecto
).pretty()

db.users.find(
    {age:25},//Criterios de busqueda -> Where
    {age:false} // lista todos los atributos menos la edad
).pretty()

//operador no equals
//$ne -> diferente a

// Obtengamos todos los usarios cuya edad sea diferente a 25
db.users.find(
    {age:{$ne: 25}}
).pretty()

//$eq -> igual a
//Obtengamos todos los usuarios cuya edad sea igual a 25
db.users.find(
    {age:{$eq: 25}}
).pretty()


// find -> Obtener mas de un documento
//findOne -> Obtener solo un documento (No posee el metodo pretty)
db.users.findOne(
    {age:{$ne: 25}}
)

/**
 * Operadores relacionales
 */
//Obtener todos los usuarios cuya edad sea mayor a 26
db.users.find(
    {
        age:{
            $gt:26 // > greater than
        }
    }
)
//Obtener todos los usuarios cuya edad sea mayor o igual a 26
db.users.find(
    {
        age:{
            $gte:26 // > greater than equals
        }
    }
)
//Obtener todos los usuarios cuya edad sea menor que 26
db.users.find(
    {
        age:{
            $lt:26 // > menor o igual que
        }
    }
)
//Obtener todos los usuarios cuya edad sea menor o igual a 26
db.users.find(
    {
        age:{
            $lte:26 // > menor o igual que
        }
    }
)
/**
 * Operadores relacionales
 * 
 * $gt  >
 * $gte >=
 * $lt  <
 * $lte >=
 * $eq  ==
 * $ne  !=
 */

/**
 * Operadores lógicos
 * $and y $or
 */


// Obtener todos los usuarios cuya edad sea mayor a 20 y menor a 26
db.users.find(
    {
      $and:[
        {age:{$gt: 20}},
        {age:{$lt: 26}}
        ]
    }
).pretty()

// Obtener todos los usuarios cuyo nombre sea Eduardo o Uriel
db.users.find(
    {
        $or:[
            {name:"Eduardo"},
            {name:"Uriel"}
        ]
    }
).pretty()

// Obtener todos los usuarios cuyo nombre sea Eduardo Ismael o Uriel o la edad sea mayor a 20 y menor a 25
db.users.find(
    {
        $or:[
            {name:"Eduardo Ismael"},
            {name:"Uriel"},
            {
              $and:[
                {age:{$gt:20}},
                {age:{$lt:25}}
              ]
            }
        ]
    }
).pretty()

/**
 * Expresiones regulares
 */

db.books.insertMany(
    [
        {title: 'Don Quijote de la Mancha', sales: 500},
        {title: 'Historia de dos ciudades', sales: 200},
        {title: 'El señor de los anillos', sales: 150},
        {title: 'El principito', sales: 140},
        {title: 'El hobbit', sales: 100},
        {title: 'Alicia en el país de las maravillas', sales: 100},
        {title: 'El código Da Vinci', sales: 80},
        {title: 'El alquimista', sales: 65}
    ]
)

// like -> expresión regular
// Obtener todos los libros cuyo titulo comience con EL
// WHERE title like 'El%'
db.books.find(
    {
        title: /^El/
    }
)
// Obtener todos los libros cuyo titulo  finalice con s
// WHERE title like '%s'
db.books.find(
    {
        title: /s$/
    }
)
// Obtener todos los libros cuyo titulo posea la palabra la
// WHERE title like '%la%'
db.books.find(
    {
        title: /la/
    }
)

//Operador in
// Obtener todos los usuarios cuyo nombe sea Eduardo o Uriel o Marines
db.users.find(
    {
        name: {$in:['Eduardo','Uriel','Marines']}
    }
)
//Operador  not in -> $nin
// Obtener todos los usuarios cuyo nombe no sea Eduardo o Uriel o Marines
db.users.find(
    {
        name: {$nin:['Eduardo','Uriel','Marines']}
    }
)

// Realizar consultas sobre los atributos no sobre los valores
//insert nuevo usuario
var user5 = {
    name: 'Rafael',
    email: 'rafa@codigofacilito.com',
    support: true,
    createdAt: new Date()
}

// Obtener todos los usuarios que posean apellido
db.users.find(
    {
        last_name:{
            $exists:true
        }
    }
)
// Obtener todos los usuarios que no posean apellido
db.users.find(
    {
        last_name:{
            $exists:false
        }
    }
)
// Obtener todos los usuarios cuyo atributo createdAt sea de tipo date
db.users.find(
    {
        createdAt: {$type: 'date'}
    }
)
// Obtener todos los usuarios cuyo atributo createdAt exista y sea de tipo date
db.users.find(
    {
        $and:[
            {createdAt: {$exists:true}},
            {createdAt: {$type: 'date'}}
        ]
        
    }
)
/**
 * 
Listado de los tipos más comunes en MongoDB
Tipo	Número	Alías
Double	1	'double'
String	2	'string'
Object	3	'Object'
Array	4	'array'
ObjectId	7	'objectId'
Boolean	8	'boolean'
Date	9	'date'
Null	10	'null'
Regular Expression	11	'regex'
Timestamp	17	'timestamp'
 */

