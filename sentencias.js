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

