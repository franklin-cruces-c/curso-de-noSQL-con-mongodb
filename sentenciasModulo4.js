/**
 * Aggregate Framework
 */

/**
 * Método aggregate
 * Lista de tareas y funciona como un pipe
 * aggregate([tareas])
 */

db.users.find(
    {
        age:{$gt:25}
    }
)

db.users.aggregate(
    [
        {
            $match: {
                age:{ $gt:25}
            }
        }
    ]
)
// Todos los usuarios que tengan mas de 25 años y posean una lista de cursos
db.users.aggregate(
    [
        {
            $match: {
                age:{ $gt:25}
            }        
        },
        {
            $match: {
                courses: {$exists: true}
            }
        }
    ]
)

// Todos los usuarios que tengan mas de 25 años y posean una lista de cursos y que tengan por apellido alvarez
db.users.aggregate(
    [
        {
            $match: {
                age:{ $gt:25} // se reduce a 3 documentos
            }        
        },
        {
            $match: {
                courses: {$exists: true} // se reduce a 2 documentos
            }
        },
        {
            $match: {
                lastName: 'Alvaréz' // se reduce a 1 documento
            }
        }

    ]
).pretty()

/**
 * Proyecciones
 * Los atributos a mostrar
 */

// mostrar el nombre y el listado de cursos de los usuarios que tengan mas de 25 años
// y posean una lista de cursos y que tengan por apellido alvarez
db.users.aggregate(
    [
        {
            $match: {
                age:{ $gt:25} // se reduce a 3 documentos
            }        
        },
        {
            $match: {
                courses: {$exists: true} // se reduce a 2 documentos
            }
        },
        {
            $project: {
                _id:false, name:true, courses:true
            }
        }

    ]
).pretty()

/**
 * Operador slice con framework aggregate
 */


// mostrar el nombre y los 2 primeros cursos de los usuarios que tengan mas de 25 años
// y posean una lista de cursos y que tengan por apellido alvarez
db.users.aggregate(
    [
        {
            $match: {
                age:{ $gt:25} // se reduce a 3 documentos
            }        
        },
        {
            $match: {
                courses: {$exists: true} // se reduce a 2 documentos
            }
        },
        {
            $project: {
                _id:false, name:true, courses:true
            }
        },
        {
           $project: {
                name: true, 
                firstCourse: {
                    $slice:['$courses',2]
                }
           }
        }
    ]
).pretty()

// mostrar el nombre y el primer curso de los usuarios que tengan mas de 25 años
// y posean una lista de cursos y que tengan por apellido alvarez
db.users.aggregate(
    [
        {
            $match: {
                age:{ $gt:25} // se reduce a 3 documentos
            }        
        },
        {
            $match: {
                courses: {$exists: true} // se reduce a 2 documentos
            }
        },
        {
            $project: {
                _id:false, name:true, courses:true
            }
        },
        {
           $project: {
                name: true, 
                firstCourses: {
                    $slice:['$courses',2]
                }
           }
        },
        {
           $project: {
                name: true, 
                course: {
                    $arrayElemAt:['$firstCourses',0]
                }
           }
        }

    ]
).pretty()


/**
 * Framework Agregate - Agregar campos a la query
 */

// Agregamos 3 nuevos campos en la lista de campos a mostrar
db.users.aggregate(
    [
        {
            $match: {
                age:{ $gt:25} // se reduce a 3 documentos
            }        
        },
        {
            $match: {
                courses: {$exists: true} // se reduce a 2 documentos
            }
        },
        {
            $project: {
                _id:false, name:true, courses:true
            }
        },
        {
           $project: {
                name: true, 
                firstCourses: {
                    $slice:['$courses',2]
                }
           }
        },
        {
           $project: {
                name: true, 
                course: {
                    $arrayElemAt:['$firstCourses',0]
                }
           }
        },
        {
            $addFields:{
                currentDate: new Date(),
                suma: 10 +20,
                newName: '$name'
            }
        }

    ]
).pretty()


/**
 * Operador $set
 * 
 */

//obtener el promedio de calificaciones

db.users.aggregate(
    {
        $match:{
            scores: {$exists: true}
        }
    },
    {        
        $project:{
            _id:false, name:true, scores:true
        }
    },
    {
        $set:{
            suma:{$sum:'$scores'}
        }
    },
    {
        $set:{
            promedio: { $avg: '$scores'}
        }
    }
)

//obtener el promedio de calificaciones de los usuarios cuyo promedio sea superior a 8

db.users.aggregate(
    {
        $match:{
            scores: {$exists: true}
        }
    },
    {        
        $project:{
            _id:false, name:true, scores:true
        }
    },
    {
        $set:{
            suma:{$sum:'$scores'}
        }
    },
    {
        $set:{
            promedio: { $avg: '$scores'}
        }
    },
    {
        $match:{
            promedio: {$gt: 8}
        }
    }
)

/**
 * Concatenar atributos
 */

db.users.aggregate(
    [
        {
            $match:{
                $and:[
                    {
                        name:{$exists: true}
                    },
                    {
                        lastName: {$exists: true}
                    }
                ]
            }
        },
        {
            $project:{
                _id:false, name:true, lastName:true
            }
        },
        {
            $project:{
                fullName:{
                    $concat: ['$name',' ','$lastName']
                }
            }
        }
    ]
)

/**
 * Group by
 */

// creamos una nueva colección llamada items
db.items.insertMany(
    [
        {type: 'Camera', color: 'Red', price: 120},
        {type: 'Laptop', color: 'White', price: 400},
        {type: 'Laptop', color: 'Black', price: 600},
        {type: 'Camera', color: 'Silver', price: 200},
        {type: 'Microphone', color: 'Black', price: 200},
        {type: 'Mouse', color: 'White', price: 50},
        {type: 'Monitor', color: 'White', price: 50}
    ]
)

// Agrupar y contar la cantidad de items con respecto a su tipo

db.items.aggregate(
    [
        {
            $group:{
                _id: '$type',
                total: { $sum: 1}
            }
        }
    ]
)

// Todos los tipos que se encuentren mas de una vez en la coleccion (similar a having en SQL)
db.items.aggregate(
    [
        {
            $group:{
                _id: '$type',
                total: { $sum: 1}
            }
        },
        {
            $match:{
                total: {$gt: 1}
            }

        }
    ]
)

/**
 * Ordenamiento
 * $limit y $sort
 */

// Obtener al usuario más joven
db.users.aggregate(
    [
        {
            $sort: {
                age: 1
            }
        },
        {
            $limit:1
        },
        {
            $project: {
                _id:false, name:true, age:true
            }
        }
    ]
)

