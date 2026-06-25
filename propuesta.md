**CATEGORÍA: COMERCIALIZACIÓN Y ACCESO A MERCADOS**

# StockLink Vision

## 1. El Desafío Comercial

¿Cómo podemos ayudar a las micro y pequeñas empresas a incrementar sus ventas, ampliar su acceso a nuevos mercados y fortalecer la relación con sus clientes mediante soluciones digitales innovadoras que mejoren su visibilidad, posicionamiento y competitividad?

---

## 2. El Concepto e Innovación

StockLink Vision es una red inteligente de inventario compartido diseñada específicamente para Pequeñas y Medianas Empresas (PYMEs). La plataforma permite a los consumidores finales localizar y reservar productos disponibles en comercios y tiendas de proximidad en tiempo real, conectando la demanda física con la oferta local de manera inmediata.

A diferencia de los sistemas tradicionales que requieren una carga de datos constante, la gran innovación de este concepto radica en el uso de visión artificial de bajo costo. Mediante dispositivos ópticos accesibles instalados en los anaqueles o zonas de almacenamiento, el sistema actualiza de forma autónoma el stock de la tienda, eliminando por completo la fricción del registro manual de inventario para el comerciante. El objetivo central es erradicar la pérdida de ventas provocada por la falta de visibilidad del inventario en los negocios de barrio.

---

## 3. Flujo de Funcionamiento

1. **Captura de Imagen:** Cámaras fijas de bajo costo toman capturas periódicas automatizadas del estado de las estanterías o vitrinas del negocio.
2. **Procesamiento con IA:** Los algoritmos de inteligencia artificial analizan las imágenes detectando patrones, identificando el tipo de producto y calculando las cantidades aproximadas.
3. **Sincronización Viva:** El inventario centralizado en la nube se actualiza automáticamente reflejando las altas y bajas de mercancía sin intervención humana.
4. **Búsqueda del Consumidor:** El cliente final realiza consultas geolocalizadas desde la aplicación móvil para un artículo específico.
5. **Despliegue de Resultados:** El sistema retorna un listado en tiempo real de los negocios cercanos que cuentan con disponibilidad física exacta, rutas de acceso y precios.
6. **Reserva Inmediata:** El usuario puede apartar el producto directamente desde su pantalla antes de desplazarse, asegurando la transacción comercial.

---

## 4. Simulación de Interfaz de Usuario (Mockups)

A continuación se ilustra la interacción en tiempo real del ecosistema tanto desde la perspectiva del consumidor como desde el panel operativo del comercio:

### Vista del Cliente

> **Buscar producto:** "Cargador USB-C 65W"
> **Resultados cercanos:**
> * **✓ Tech Store Lince**
> Stock: 8 unidades | Dist: 350m | Precio: S/ 45
> * **✓ Multiservicios Perú**
> Stock: 5 unidades | Dist: 700m | Precio: S/ 42
> 
> 
> *Disponible para reserva inmediata*
> **[ RESERVAR ] [ VER RUTA ]**

### Panel del Negocio

> **Cámara conectada:** ONLINE
> **Última actualización:** Hace 2 min
> **Productos detectados:**
> * **Cargador USB-C 65W**
> Stock est: 8 unidades
> * **Foco LED 12W**
> Stock est: 15 unidades
> * **Power Bank 10000mAh**
> Stock est: 4 unidades
> 
> 
> *Est. Inventario: Actualizado aut.*

---

## 5. Ficha de Arquitectura Tecnológica

El sistema se apoya en tecnologías modernas, escalables y de alta disponibilidad para garantizar un procesamiento ágil de imágenes y consultas simultáneas:

| COMPONENTE | TECNOLOGÍA SELECCIONADA | ROL EN LA SOLUCIÓN |
| --- | --- | --- |
| **Backend** | .NET 8 | Procesamiento lógico robusto, APIs de alta velocidad y seguridad de datos corporativos. |
| **Frontend Móvil** | React Native | Despliegue de aplicación híbrida fluida para sistemas Android e iOS orientada al cliente. |
| **Frontend Web** | React | Panel administrativo interactivo para la visualización analítica del comerciante. |
| **Visión IA** | YOLO / OpenCV | Modelos avanzados de detección de objetos optimizados para procesamiento de imágenes en estanterías. |
| **Hardware Edge** | Raspberry Pi + Cámara | Módulo físico económico encargado de la captura periférica local en el establecimiento. |
| **Base de Datos** | PostgreSQL | Almacenamiento relacional estructurado con capacidades de indexación espacial para geolocalización. |

---

## 6. Propuesta de Valor Multilateral

### Para el Consumidor Final

* **Optimización de tiempo:** Elimina la necesidad de peregrinar físicamente por múltiples locales buscando un artículo.
* **Certeza de compra:** Garantiza que el producto se encuentra físicamente disponible previo al traslado.
* **Separación rápida:** Permite bloquear stock de alta rotación mediante la reserva digital.

### Para las PYMES Comerciales

* **Visibilidad de mercado:** Expone el inventario local ante miles de clientes digitales geolocalizados en el área.
* **Fricción Cero (0):** Digitaliza y automatiza el stock sin forzar al personal a registrar entradas o salidas manualmente.
* **Recuperación de ventas:** Captura transacciones que de otra forma migrarían a grandes cadenas retail.

---

## 7. Casos Prácticos de Aplicación en el Mercado Real

* **Caso A: Sector Ferretero y Construcción Menor**
Un operario o maestro de obra requiere con urgencia una pieza específica (ej. un codo de PVC de una pulgada o una llave térmica de amperaje exacto) durante un fin de semana. En lugar de recorrer múltiples ferreterías de barrio consultando disponibilidad, utiliza la aplicación para validar qué negocio local cuenta con stock exacto capturado por la cámara en sus anaqueles. Va directo, compra y resuelve la emergencia sin pérdidas de tiempo.
* **Caso B: Farmacias y Boticas Independientes**
Los clientes habituales de medicamentos genéricos o productos pediátricos específicos suelen enfrentarse al desabastecimiento de las boticas independientes de vecindario. Al integrar StockLink Vision en las secciones de alta rotación, las boticas independientes visibilizan su stock en tiempo real hacia la comunidad, permitiendo competir directamente con las grandes cadenas farmacéuticas mediante conveniencia, cercanía y disponibilidad verificada.
* **Caso C: Repuestos de Automoción y Accesorios Tecnológicos**
Establecimientos dedicados a la venta de cables, conectores, cargadores o refacciones mecánicas manejan cientos de SKUs difíciles de inventariar diariamente. La visión artificial mapea el estante expositor de forma autónoma. Cuando un conductor o usuario tecnológico busca un componente de "cola larga" a pocos kilómetros, el sistema lo enlaza al local de manera inmediata, convirtiendo stock estático en ventas dinámicas.

---

## 8. Ventajas Competitivas ante un Jurado (Efecto WOW)

* **Demostración en vivo de alto impacto:** Permite realizar un pitch interactivo memorable. Al retirar o reponer un producto físicamente en el estante de prueba frente al jurado, la aplicación móvil refleja el cambio de stock en tiempo real, validando la tecnología de inmediato.
* **Resolución del problema de adopción:** Resuelve el principal quiebre de los ERPs en PYMES: la resistencia del comerciante a mantener actualizados los sistemas manuales debido a la falta de tiempo o capacitación.
* **Escalabilidad de hardware:** Viabilidad financiera demostrada. Si bien se plantea inicialmente con Raspberry Pi, el modelo de negocio permite evolucionar hacia la reutilización de cámaras de seguridad CCTV/IP preexistentes en los locales comerciales, reduciendo el costo de instalación a cero.

### El Diferenciador Único

StockLink Vision no pretende ser un marketplace tradicional, ni un complejo sistema ERP, ni una plataforma de CRM de fidelización masiva. Se define estrictamente como una **red colaborativa de inventario vivo y geolocalizado para PYMEs impulsada por visión artificial**, actuando como un puente logístico invisible entre las tiendas de barrio y el consumidor moderno.