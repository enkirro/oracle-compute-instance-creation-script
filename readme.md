# Crear instancias de Oracle a través de Javascript utilizando la consola de desarrollador

Adaptación al español de las instrucciones realizadas por gardinbe, para simplificar el proceso en caso de no controlar el idioma (https://github.com/gardinbe/oracle-compute-instance-creation-script)

## Requisitos previos

- Haberse dado de alta en Oracle con una cuenta (gratuita, trial, Pay As You Go) -- Tutorial -> https://XXXXX

## Pasos a realizar

**Importante, a la hora de crear nuestra instancia será necesario desmarcar la opción de "Redwood Preview" ya que este script está adaptador a la interfaz antigua/clásica**

![alt text](src/img/desactivar_redwood.png)

1. Crearemos nuestra instancia en https://cloud.oracle.com/compute/instances/create según la configuración y capacidad que queramos tener en nuestra instancia


2. Cuando estén rellenados todos los pasos y únicamente quede darle al botón de "Create" o "Crear", abriremos la consola de desarrollador del navegador (pulsando F12 o navegando desde las opciones del navegador

3. Iremos al apartado de "console", copiaremos el contenido entero del fichero "script.js" y lo pegaremos en la consola y lo insertaremos dándole a Enter

4. Podemos cerrar la consola de desarrollador, dejar el equipo encendido y debería estar operativo durante 8-9 horas, hasta que la web de Oracle nos eche por caducidad en el login

5. 
Open dev tools (press F12), and select the 'console' tab
Paste in the contents of script.js into the console and press enter
Close dev tools, make sure your computer doesn't go to sleep, and pray for the next few hours

## Notes
**DO NOT CLOSE THE POPUP WINDOW!**

Filter logs with '***' to only show outputs from this script.

It's advised to close dev tools while the script is running, as over long periods of time it may crash (Oracle's fault).

You can change the interval duration between clicks on the fly by changing the value of the variable `INTERVAL_DURATION` - default is 30 (seconds).
