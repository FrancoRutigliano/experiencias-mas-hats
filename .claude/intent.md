# Intent: sitio de experiencias MÁS HATS
Autor: Franco Rutigliano (con Claude). Estado: borrador — revisar con Mariana.

## Problema
Cuando Mariana le ofrece la experiencia a un hotel, un retiro o una marca, no
tiene nada que mandar. Lo que existe (Instagram, fotos sueltas por WhatsApp)
habla el idioma de la participante, no el de quien firma. Quien recibe la
oferta casi nunca decide solo: se la tiene que mostrar a su jefe, y no tiene
un link que pueda reenviar y que se sostenga solo.

Sin ficha clara, cada consulta arranca con la misma ronda de preguntas
(cuántas personas, cuánto dura, qué incluye, dónde) antes de poder cotizar.

## Resultado buscado
Un link que Mariana manda por mail o WhatsApp y que:
1. En 20 segundos deja claro qué es la experiencia y si sirve para ese grupo.
2. Se puede reenviar al que decide sin que Mariana esté presente para explicarlo.
3. Termina en un WhatsApp que ya trae los tres datos para cotizar
   (para quién, cuántas personas, fecha y lugar) sin segunda vuelta de mensajes.

Se lee como propuesta comercial, no como flyer: mundo cálido en las fotos,
estructura seria en los datos. Moderna, sin ser de temporada.

## Usuarios y sistemas afectados
- **Quien evalúa:** responsable de eventos o experiencias de hotel boutique o de campo,
  organizadora de retiros de mujeres, bodega con salón, country, spa, marca con
  clientela femenina. Lo abre en la computadora.
- **Quien firma:** su jefe o jefa, que recibe el link reenviado.
- **Mariana:** manda el link, recibe los WhatsApp, cotiza. Tiene que poder
  cambiar un texto o un dato sin tocar componentes.
- **Sistemas:** WhatsApp (`wa.me`), previsualización de links en WhatsApp y
  mail (Open Graph), hosting estático. Sin backend, sin formulario y sin analytics.

## Restricciones
- Datos del negocio sólo los del brief. Nada inventado: ni precios, ni
  testimonios, ni cantidad de eventos, ni logos.
- Sin precio en el sitio.
- Todo el contenido visible apenas carga (la previsualización y el primer
  vistazo son la primera impresión).
- Desktop primero, mobile obligatorio.
- Tema claro único, tokens de «Campo abierto», trigo como único acento.
- Nombre y foto de clientes sólo con permiso.

## Fuera de alcance (v1)
FAQ, precios, formulario, blog, newsletter, encuentros abiertos a particulares,
carruseles, dark mode, analytics.

## Cómo sabemos que funcionó
- Las consultas que entran por el link traen para quién es, cuántas personas y
  la fecha y el lugar en el primer mensaje.
- Mariana deja de explicar la ficha técnica por chat.
- Después de publicar: leer los WhatsApp que entren y anotar la objeción más
  repetida, con qué comparan la experiencia y quién firma del lado del cliente.

## Preguntas abiertas
1. ¿Las 47 fotos de `/images` son de un evento de Chateau Nordelta, de
   Conexión 2 o de otro encuentro? Define qué foto va en cada caso del bloque 04.
2. ¿Hay fotos de Conexión 2 (Mendoza)? Si no, ¿el caso va sin foto o esperamos?
3. ¿Hay permiso de los dos clientes para usar nombre y foto? Si no llega a
   tiempo, ¿el bloque 04 sale anónimo («un hotel en Nordelta», «un retiro en
   Mendoza») o sale sin ese bloque?
4. ~~¿La mujer de camisa blanca y sombrero marrón es Mariana?~~ Sí
   (confirmado 2026-09-24): DSC04001, DSC04431.
5. «Material: Todo incluido» en la ficha, al lado de «No incluye: espacio,
   catering y fotografía». ¿Lo dejamos o lo cambiamos por algo como «Material
   incluido»?
6. Número de WhatsApp Business, dominio y las tres frases de Mariana. No
   bloquean empezar, pero sí bloquean publicar.
