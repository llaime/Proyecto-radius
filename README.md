# Ante Proyecto

## 

## Alumno : *Jaime Corrales Pecino*

## 

## Tutor: *Francisco Ávila*

## 

## Nombre Proyecto: Servidor Radius

# 

# Introducción.

## 

## Descripción del proyecto.

Crear un servidor de autentificación Radius gestionado a través de una pagina web

## 

## Finalidad.

Una vez que llega un nuevo año, es un trasto para los profesores del IES Romero Vargas, incluir alumnos a la red y controlarlos. La finalidad del proyecto es crear un servidor de autentificación Radius, para que haga todo el trabajo manual que se realizaba anteriormente, además de darle una seguridad más alta al proceso de autentificación de usuarios. 

## 

## Objetivos.

El objetivo es crear un servidor Radius en una maquina virtual. Una vez creado y configurado de forma correcta, una pagina web se encargaría de gestionarlo. La pagina web se encargará de modificar, extraer e introducir información a la base de datos con la que el servidor Radius trabaja, de esa forma se pueden crear grupos, se pueden bloquear conexiones, se puede llevar un seguimiento de los alumnos que están conectados y durante cuanto tiempo, etc...

Una vez creada toda la gestión, el proceso empezaría con la subida de un archivo a la pagina web, ese archivo sería en formato "csv". El sistema leería dicho formato y extraería la información de los alumnos, como el nombre y al grupo al que pertenecen. Los usuarios y grupos serán creados y se les asignará de forma aleatoria una contraseña. Que el profesor podrá ver en pantalla. 

En el inicio además de añadir dichos usuarios, también se podrá añadir routers por csv si se quisiera para añadir routers de forma automatizada. También se mostrarán todos los usuarios conectados en ese isntante, su nombre, su mac y la ip del router al que se conectan.

Se podrán mostrar los usuarios y sus grupos además de borrarlos o añadirlos a otros grupos. En otro apartado se mostrará una lista de los routers, y de la misma forma se pueden añadir y borrar.

Además tendrá, otra pagina donde poder bloquear de forma temporal el acceso a la red de un grupo completo. En otro apartado se podrá hacer un horario para los grupos, quiere decir que si un grupo no tiene un horario no tiene acceso a la red wifi.

También se podrá crear administradores para que cualquier administrador pueda gestionar usuarios routers, horarios, etc...

## 

## Medios necesarios.

1- Un ordenador capaz de manejar una maquina virtual, o poder instalar apache y sus modulos y freeradius.

1- Un router en nuestro caso un mikrotik

1- Dispositivos de prueba (móviles, portátiles, etc...)

## 

## Planificación.

·     Estudio de Radius: 20h

·     Instalación y configuración de Radius: 10h

·     Planificación de Pagina web: 10h

·     Programación de pagina web: 130h

·     Pruebas: 10h


*Horas totales que se planifican para el proyecto: 180 horas.*
