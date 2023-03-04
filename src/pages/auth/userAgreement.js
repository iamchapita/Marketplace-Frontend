import React from "react";
import '../../style/style-agreement.css'


function Agreement(){
    return(
        <div className="card-body-agree">
                <h3>ACUERDO DE USUARIO</h3>
                <p>
                IMPORTANTE: Lea los términos y las condiciones del producto de aplicación que se especifican abajo antes de descargarlo,
                instalarlo, copiarlo o usarlo. CON LA DESCARGA, INSTALACIÓN, COPIA O UTILIZACIÓN DEL SOFTWARE, USTED DECLARA SU CONSENTIMIENTO 
                CON LOS TÉRMINOS Y CONDICIONES.
                </p>
                <p>
                Acuerdo de licencia de usuario final del Software.
                ESTO ES UN ACUERDO SOBRE LOS DERECHOS DEL USUARIO FINAL; NO UN CONTRATO DE VENTA. El Proveedor sigue siendo el propietario de 
                la copia del Software y del soporte físico en el que el Software se suministra en paquete comercial, así como de todas las demás copias que el Usuario final está autorizado a realizar en virtud de este Acuerdo.
                </p>
                <p>
                Al hacer clic en la opción "Acepto" durante la instalación, descarga, copia o utilización del Software, expresa su aceptación de
                los términos y condiciones de este Acuerdo. Si no acepta todos los términos y condiciones de este Acuerdo, haga clic en la opción "Cerrar", cancele la instalación o descarga, o destruya o devuelva el software, el soporte de instalación, la documentación adjunta 
                y el recibo de compra del lugar donde haya adquirido el Software.
                </p>
                <p>
                USTED ACEPTA QUE LA UTILIZACIÓN DEL SOFTWARE INDICA QUE HA LEÍDO ESTE ACUERDO, QUE LO COMPRENDE Y QUE CONSIENTE OBLIGARSE POR  SUS TÉRMINOS Y CONDICIONES.
                </p>

                <br></br>
                <a className='text-link' href='/registro' >Volver a Registro</a>
            </div>
    );

}
export default Agreement;