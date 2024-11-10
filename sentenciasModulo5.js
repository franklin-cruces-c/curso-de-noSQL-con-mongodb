/**
 * Relacion uno a uno
 * Relacion uno a muchos
 * Relacion muchos a muchos
 * 
 * Aunque por naturaleza por no ser DB no relacional estos conceptos no deberian estar, 
 * si hay forma de representarlos cuando sea hace necesario
 */

/**
 * Relacion uno a uno
 * Con documentos embebidos (uno dentro de otro)
 */

var usuario = {
    nombre: 'Raquel',
    apellido: 'Dominguez',
    edad: 27,
    correo: 'raquel@example.com',
    direccionPostal: {
        calle: 'Calle',
        ciudad: 'Santiago',
        Region: 'Metropolitana',
        codigoPostal: 77,
        numeroExterior: 7
    }
}


db.users.insertOne(usuario)

db.users.find(
    {
        nombre: 'Raquel'
    }
).pretty()

/**
 * Relacion uno a muchos
 */
// Opcion 1. A través de una lista
var author = {
    nombre: 'Stephen King',
    nacionalidad: 'Estadounidense',
    libros: [
        {
            titulo: 'it',
            fehcaLanzamiento: 1986
        },
        {
            titulo: 'El resplandor',
            fehcaLanzamiento: 1977
        },
        {
            titulo: 'Misery',
            fehcaLanzamiento: 1987
        }                
    ]    
}

// Opcion 2. Con "llaves foraneas (concepto no aplica a NoSQL)" -> ObjectsId 
var autor = {
    nombre: 'Stephen King',
    nacionalidad: 'Estadounidense'
}
db.autores.insertOne(autor)

//> db.autores.insertOne(autor)
//{
//        "acknowledged" : true,
//        "insertedId" : ObjectId("6730ce0cda63f81be148289b")
//}


var libro1 =  {
    titulo: 'El resplandor',
    fehcaLanzamiento: 1977,
    autor_id: ObjectId("6730ce0cda63f81be148289b") // llave foranea
}
var libro2 =  {
    titulo: 'it',
    fehcaLanzamiento: 1986,
    autor_id: ObjectId("6730ce0cda63f81be148289b") // llave foranea
}
var libro3 =  {
    titulo: 'Misery',
    fehcaLanzamiento: 1987,
    autor_id: ObjectId("6730ce0cda63f81be148289b") // llave foranea
}

db.libros.find().pretty()

db.autores.find(
    {_id:ObjectId("6730ce0cda63f81be148289b")}
)
// Si los documentos poseen pocos atributos 
// y no van a estarse modificaondo constantemente es mejor la opcion 1 -> una lista de documentos dentro
// el documento de lo contrario es mejor la opcion 2.

