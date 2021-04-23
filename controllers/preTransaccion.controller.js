const oracledb = require('oracledb');
const config = require('../config/conect');
const constants = require('../constants/constants');
const queries = require('../sql/queries');

const idOrganizacion = constants.idorganizacion;
const App = constants.application;

const nemonicoCanalFacturacion = constants.nemonicoCanalFacturacion;
var mensaje =constants.mensaje ;
const model= constants.model;



 const crear = async (req,res) =>{
    if(req.headers!=null){
        model.usuarioIngreso = new Date();
        
        if (req.headers['application']==App && req.headers['idorganizacion']==idOrganizacion){
            if(Object.keys(req.body).length===0){
                mensaje  = constants.setResponse(400,false,"No hay cuerpo",[]);
                res.status(400).send(mensaje );
            }else if(req.params.codigoEmpresa<0 || constants.tipo.indexOf(req.params.tipoPreTransaccion)==-1 ){
                mensaje  = constants.setResponse(400,false,"Los parametros enviados por url, no son validos",[]);
                res.status(400).send(mensaje );
            }
            else {
                model.secuenciaUsaurio=req.body.secuenciaUsuario;
                model.tipo = req.params.tipoPreTransaccion;
                model.codigoEmpresa = req.params.codigoEmpresa;
                
                if (req.body.nemonicoCanalFacturacion=='CAJA')   
                    model.nemonicoCanalFacturacion=nemonicoCanalFacturacion.CAJA;
                else if (req.body.nemonicoCanalFacturacion=='KIOSKO')   
                    model.nemonicoCanalFacturacion=nemonicoCanalFacturacion.KIOSKO;
                else{  
                    mensaje  = constants.setResponse(400,false,"El campo nemonico no es valido","No Data Found")
                    res.status(400).send(mensaje )
                }

                try{
                    var BD = await oracledb.getConnection(config);
                    let result = await BD.execute(queries.getUsuario(model.secuenciaUsaurio))
                    if(result.rows.length>0){
                        
                        model.codigoEmpresa=result.rows[0][1]; 
                        model.codigoUsuario=result.rows[0][4];
                        model.activo=result.rows[0][27];
                        result=await BD.execute(queries.getEmpresas(model.codigoEmpresa))
                        model.codigoEmpresa=result.rows[0][0];
                        result= await BD.execute(queries.getSecuenciaTransaccion());
                        if(result.rows.length>0){
                            
                            model.codigoPreTrans=result.rows[0][0];
                            if(Object.keys(req.body.caja).length!==0){
                                console.log(req.body.caja)
                                result= await BD.execute(queries.insertTransaccionConCaja(),
                                [model.codigoPreTrans, model.codigoEmpresa,req.body.caja.codigoSucursal,req.body.caja.codigoCaja,req.body.caja.numeroPuntoEmision ,model.secuenciaUsaurio, model.codigoUsuario, model.tipo, model.nemonicoCanalFacturacion, model.activo, model.secuenciaUsaurio, model.codigoUsuario, model.usuarioIngreso],{ autoCommit: true } ); 
                                mensaje  = constants.setResponse(200,true,"Se ingreso La pre_transaccion",{"idPreTransaccion":model.codigoPreTrans});
                                res.status(200).send(mensaje );
                                BD.close()
                            }else{
                                result= await BD.execute(queries.insertTransaccionSinCaja(),
                                [model.codigoPreTrans, model.codigoEmpresa, model.secuenciaUsaurio, model.codigoUsuario, model.tipo, model.nemonicoCanalFacturacion, model.activo, model.secuenciaUsaurio, model.codigoUsuario, model.usuarioIngreso],{ autoCommit: true } ); 
                                mensaje  = constants.setResponse(200,true,"Se ingreso La pre_transaccion",{"idPreTransaccion":model.codigoPreTrans});
                                res.status(200).send(mensaje );
                                BD.close()
                            }
                        }else{ 
                            BD.close(); 
                            mensaje  = constants.setResponse(500,false,"Ha ocurrido un error inesperado.",result); 
                            res.status(500).send(mensaje );
                        }
                    }else{
                        BD.close()
                        mensaje  = constants.setResponse(500,false,"Ha ocurrido un error inesperado.","No Data found");
                        res.status(500).send(mensaje );
                    }
                }catch(error){
                    mensaje.data=[error.message];
                    res.send(mensaje );
                }
                
            }
        }else{
            mensaje  = constants.setResponse(401,false,"Las cedenciales de autenticación no son válidas.",[]);
            res.status(401).send(mensaje );
        }
    }

}

exports.crear=crear;