const nemonicoCanalFacturacion = {
	CAJA: 1 ,
	KIOSKO: 2,
}
var mensaje={
    code: 401,
    success: false,
    message: "",
    data: []
}

const model={
    secuenciaUsuario:"",
    codigoEmpresa:"",
    codigoUsuario:"",
    activo:'',
    usuarioIngreso: '',
    codigoPreTrans:'',
    nemonicoCanalFacturacion:'',
    tipo:'',
}

const tipo=["COTIZACION","FACTURA"]

setResponse = (code,succes,message,data)=>{

    var mensaje = {
        code:code,
        succes:succes,
        message:message,
        data:data
    }

    return mensaje;
}

exports.nemonicoCanalFacturacion = nemonicoCanalFacturacion;
exports.mensaje = mensaje;
exports.model = model;
exports.setResponse = setResponse;
exports.tipo = tipo;