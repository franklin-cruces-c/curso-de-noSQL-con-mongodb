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