## Crear un nuevo usuario ##
/POST -> http://localhost:3000/api/usuario 
header: {Content-type: application/json}
json: {
	"nombre": "sergio",
	"apellido": "perez",
	"email": "prueba@correo.com",
	"contrasena": "12345"
}

# result #
{
  "msg": "Usuario creado correctamente"
}

## Autenticar usuario ##
/POST -> http://localhost:3000/api/auth
header: {Content-type: application/json}
json: {
	"email": "prueba@correo.com",
	"contrasena": "12345"
}

# result #
{
  "msg": "Usuario logueado correctamente",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7ImlkIjoiNjBkMTI2MGI5NDg2MTYyZGU4NzBmODdkIn0sImlhdCI6MTYyNDM0MjIyMCwiZXhwIjoxNjI0MzQ1ODIwfQ.-X00nPqliobXb-BfDzOwjcKF8AlU3kJMWLpXGI5JKZQ"
}


## Consultar el usuario autenticado ##
/GET -> http://localhost:3000/api/auth/
header: {
  Content-type: application/json,
  x-auth-token: token -> en el token va el usuario que va a consultar, osea el mismo autenticado
}

# Result #
{
  "_id": "60d1260b9486162de870f87d",
  "nombre": "sergio",
  "apellido": "perez",
  "email": "sergio@correo.com",
  "contrasena": "123456",
  "fecha": "2021-06-21T23:51:05.883Z"
}

## Editar mi usuario ##
/PUT -> http://localhost:3000/api/usuario
header: {
  Content-type: application/json,
  x-auth-token: token -> en el token va el usuario que va a modificar, osea el mismo
}
Json: {
	"nombre": "Sergioo",
	"apellido": "Pereezz"
}

# result #
{
  "msg": "Usuario modificado"
}

## Crear Publicacion ##
/POST -> http://localhost:3000/api/publicacion/
header: {
  Content-type: application/json,
  x-auth-token: token -> verifica que el usurio este autenticado
}
Json: {
	"content": "Mi Tercera publicacion"
}

# Result #
{
  "msg": "Publicacion creada correctamente",
  "newPublicacion": {
    "content": "Mi Tercera publicacion",
    "author_ref_id": "60d1260b9486162de870f87d",
    "fecha_creacion": "2021-06-22T01:38:51.958Z",
    "_id": "60d14d361ecec434403f5df4"
  }
}

## Consultar todas las publicaciones del usuario##
/GET -> http://localhost:3000/api/publicacion/
header: {
  Content-type: application/json,
  x-auth-token: token -> verifica que el usurio este autenticado
}

# result #
[
  {
    "_id": "60d13f0ea3b444020c19b810",
    "content": "Publicacion actualizda",
    "author_ref_id": "60d1260b9486162de870f87d",
    "fecha_creacion": "2021-06-22T01:38:18.554Z"
  },
  {
    "_id": "60d14d301ecec434403f5df3",
    "content": "Mi Segunda publicacion",
    "author_ref_id": "60d1260b9486162de870f87d",
    "fecha_creacion": "2021-06-22T01:38:51.958Z"
  }
]

## Eliminar una publicacion ##
/DELETE -> http://localhost:3000/api/publicacion/:id -> id de publicacion a eliminar
header: {
  Content-type: application/json,
  x-auth-token: token -> verifica que el usurio este autenticado
}

# result #
{
  "msg": "Publicacion eliminada exitosamente"
}

## Actualizar una publicacion ##
/PUT -> http://localhost:3000/api/publicacion/:id -> id de publicacion a actualizar
header: {
  Content-type: application/json,
  x-auth-token: token -> verifica que el usuario este autenticado
}

# result #
{
  "msg": "publicacion actualizada"
}

## Consultar mis publicaciones ##
/GET -> http://localhost:3000/api/publicacion/
header: {
  Content-type: application/json,
  x-auth-token: token -> verifica que el usuario este autenticado
}

# result #
[
  {
    "_id": "60d13f0ea3b444020c19b810",
    "content": "Publicacion actualizda",
    "author_ref_id": "60d1260b9486162de870f87d",
    "fecha_creacion": "2021-06-22T01:38:18.554Z"
  },
  {
    "_id": "60d14d301ecec434403f5df3",
    "content": "Mi Segunda publicacion",
    "author_ref_id": "60d1260b9486162de870f87d",
    "fecha_creacion": "2021-06-22T01:38:51.958Z"
  }
]

## Comentar publicacion ##
/POST -> http://localhost:3000/api/comentario/:idpublicacion
header: {
  Content-type: application/json,
  x-auth-token: token -> verifica que el usuario este autenticado
}
body:{
	"content": "Mi tercer comentario"
}

# result #
{
  "msg": "Comentario creado correctamente"
}

## Eliminar comentario de publicacion ##
/DELETE -> http://localhost:3000/api/comentario/:idcomentario
header: {
  Content-type: application/json,
  x-auth-token: token -> verifica que el usuario este autenticado
}

# result #
{
  "msg": "Comentario eliminado exitosamente"
}

## Actualizar comentario ##
/PUT -> http://localhost:3000/api/comentario/:idcomentario
header: {
  Content-type: application/json,
  x-auth-token: token -> verifica que el usuario este autenticado
}
json: {
	"content": "Comentario actualizado"
}

# result #
{
  "msg": "Comentario actualizado correctamente"
}

## Comentarios de una publicacion en particular ##
/GET -> http://localhost:3000/api/comentario/publicacion/:idpublicacion
header: {
  Content-type: application/json,
  x-auth-token: token -> verifica que el usuario este autenticado
}

# result #
[
  {
    "_id": "60d163852b26c209c88c8a9b",
    "content": "Mi primer comentario",
    "ref_id": "60d14d301ecec434403f5df3",
    "user_id": "60d1260b9486162de870f87d",
    "fecha_creacion": "2021-06-22T04:13:06.578Z"
  },
  {
    "_id": "60d163a32b26c209c88c8a9c",
    "content": "Mi segundo comentario de la publicacion",
    "ref_id": "60d14d301ecec434403f5df3",
    "user_id": "60d1260b9486162de870f87d",
    "fecha_creacion": "2021-06-22T04:13:06.578Z"
  },
  {
    "_id": "60d165bb7f02f2328c237951",
    "content": "Mi tercer comentario",
    "ref_id": "60d14d301ecec434403f5df3",
    "user_id": "60d1260b9486162de870f87d",
    "fecha_creacion": "2021-06-22T04:21:07.592Z"
  }
]

## Enviar solicitud amigo ##
/POST -> http://localhost:3000/api/amigo/solicitud/:idamigo
header: {
  Content-type: application/json,
  x-auth-token: token -> verifica que el usuario este autenticado
}

# result #
{
  "msg": "Solicitud enviada correctamente",
  "newAmigo": {
    "ref_id_user": "60d1260b9486162de870f87d",
    "ref_id_amigo": "60d0e704b55e370af0aa9dcc",
    "estado": "PENDIENTE",
    "fecha_creacion": "2021-06-22T05:35:33.880Z",
    "_id": "60d176f4fe581b1f0886e19b"
  }
}

## Aceptar Solicitud ##
/PATCH -> http://localhost:3000/api/amigo/solicitud/aceptar/:idamigo
header: {
  Content-type: application/json,
  x-auth-token: token -> verifica que el usuario este autenticado
}

# result #
{
  "msg": "Solicitud de amistad aceptada"
}

## Rechazar Solicitud ##
/PATCH -> http://localhost:3000/api/amigo/solicitud/rechazar/:idamigo
header: {
  Content-type: application/json,
  x-auth-token: token -> verifica que el usuario este autenticado
}

# result #
{
  "msg": "Solicitud de amistad Rechazada"
}

## Listar mis amigos ##
/GET -> http://localhost:3000/api/amigo/
header: {
  Content-type: application/json,
  x-auth-token: token -> verifica que el usuario este autenticado
}

# result # 
[
  {
    "_id": "60d176f4fe581b1f0886e19b",
    "ref_id_user": "60d1260b9486162de870f87d",
    "ref_id_amigo": "60d0e704b55e370af0aa9dcc",
    "estado": "ACEPTADA",
    "fecha_creacion": "2021-06-22T05:35:33.880Z"
  }
]

## Eliminar amigo ##
/DELETE -> http://localhost:3000/api/amigo/:idamigo
header: {
  Content-type: application/json,
  x-auth-token: token -> verifica que el usuario este autenticado
}

# result #
{
  "msg": "Amigo eliminado exitosamente"
}

## Enviar mensaje ##
/POST -> http://localhost:3000/api/mensaje/:idamigo
header: {
  Content-type: application/json,
  x-auth-token: token -> verifica que el usuario este autenticado
}
json: {
	"content": "primer mensaje"
}

# result #
{
  "msg": "Mensaje enviado correctamente",
  "newMensaje": {
    "content": "primer mensaje",
    "user_id": "60d1260b9486162de870f87d",
    "receptor_id": "60d0e704b55e370af0aa9dcc",
    "fecha_creacion": "2021-06-22T06:04:59.852Z",
    "_id": "60d17eea76f9f32420b30f50"
  }
}