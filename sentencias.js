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

/**
 * Obtener y actualizar documentos
 */
var rafael = db.users.findOne(
    {name:'Rafael'}
)
rafael.support = false
// argumento un documento, si el documento posee id, el documento se actualiza, si no se crea un nuevo documento
db.users.save(rafael)
rafael.age = 27
db.users.save(rafael)

/**
 * UpdateOne y UpdateMany
 * update e insert -> deprecated
 */

// establecer el atributo support a los documentos que no lo poseen y se establecerá el valor por defecto a false

db.users.updateMany(
    {
        support:{$exists: false}
    },
    {
        $set: {
            support: false
        }
    }
)

// actualizar support = true a Fernando
db.users.updateOne(
    {name: 'Fernando'},
    {
        $set:{support: true}
    }
)

/**
 * Operador Unset
 * Permite eliminar atributos a los documentos
 */

// Eliminar atributo createAt

db.users.updateOne(
    {
        createdAt: {$exists: true}
    },
    {
        $unset: {createdAt: true}
    }
)
/**
 * Operador $inc para incrementar enteros
 */

//Incrementar la edad de Rafael de 26 a 27
db.users.updateOne(
    {name: "Rafael"},
    {$inc:{age: 1}}
)
//Decrementar la edad de Rafael de 27 a 26
db.users.updateOne(
    {name: "Rafael"},
    {$inc:{age: -1}}
)
//Incrementar la edad de Rafael agregandole 100
db.users.updateOne(
    {name: "Rafael"},
    {$inc:{age: 100}}
)
//Decrementar la edad de Rafael quitandole 100
db.users.updateOne(
    {name: "Rafael"},
    {$inc:{age: -100}}
)

/**
 *  atributo upsert actualizar un documento que no se sabe si existe o no
 */
//Como no existe el usuario Luis en la collecion entonces no se modifica nada
db.users.updateOne(
    {name: 'Luis'},
    {
        $set:{ edad: 27}
    }
)
//{ "acknowledged" : true, "matchedCount" : 0, "modifiedCount" : 0 }
// al agregar el atribudo upsert si el documento no existe lo crea
db.users.updateOne(
    {name: 'Luis'},
    {
        $set:{ edad: 27}
    },
    {
        upsert: true
    }
)
/*
{
	"acknowledged" : true,
	"matchedCount" : 0,
	"modifiedCount" : 0,
	"upsertedId" : ObjectId("6723d4076825a1f25808b0cd")
}
*/
// Al ya existir no se crea un documento nuevo si no que se actualiza la edad a 28
db.users.updateOne(
    {name: 'Luis'},
    {
        $set:{ edad: 28}
    },
    {
        upsert: true
    }
)
//{ "acknowledged" : true, "matchedCount" : 1, "modifiedCount" : 1 }


/**
 * Eliminar documentos de una colección 
*  remove({})
 */
// Eliminar el usuario Luis
db.users.remove(
    {name: 'Luis'}
)
// WriteResult({ "nRemoved" : 1 })

//Eliminar todos los documentos de una coleccion
db.books.remove({})
//WriteResult({ "nRemoved" : 8 })

// drop() -> eliminar una colección
db.books.drop()
//true

// dropDatabase() -> eliminar una base de datos
db.dropDatabase()
//{ "dropped" : "test7", "ok" : 1 }


/**
 * Cursor
 */

for(i = 0; i< 100; i++){
    db.demo.insert(
        {name: 'user'+ i}
    )
}

// find() retorna un cursor con una paginacion maxima de 20 elementos

//metodo count() del cursor find() devuelve la cantidad de elementos
db.demo.find().count()

// Obtener cuantos usuarios tienen correo electronico codigofacilito
db.users.find(
    {email:/@codigofacilito.com$/}
).count()

//limit()
// obtener los primeros dos usuarios de la coleccion users
db.users.find().limit(2)

//skip() saltar documentos

//obtener el tercer usuario de la colección users
db.users.find().skip(2).limit(1)

//sort() ordenar documentos valor  1 ascendente  valor -1 descendente
// Obtener el nombre de todos los usuarios ordenados alfabeticamente
db.users.find(
    {},
    {_id:false, name: true}
).sort(
    { name: 1}
)
// find() retorna un cursor y findOne() retorna un documento


/**
 * FindAndModify
 * Busca y actualiza un objeto y retorna el objeto antes de su actualización
 */

// Buscar al usuario Rafael e incrementar su edad en 1
db.users.findAndModify(
    {
        query: {
         name: 'Rafael'
        },
        update: {
         $inc: {
             age: 1
         }
        }
    }
)
// Buscar al usuario Rafael e incrementar su edad en 1, y devolver el objeto actualizado
db.users.findAndModify(
    {
        query: {
         name: 'Rafael'
        },
        update: {
         $inc: {
             age: 1
         }         
        },
        new: true
    }
)
/**
 * Renombrar atributos
 * operador $rename
 */
// Renombrar atributo last_name a lastName
db.users.updateMany(
    {},
    {
        $rename: {
            last_name: 'lastName'
        }
    }

)
/**
 * Object _id
 * Es único en cada maquina e incluso en cada instancia dentro de cada maquina, 
 * tambien en su composicion lleva la fecha de creacion
 */

