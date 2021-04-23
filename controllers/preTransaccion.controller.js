const oracledb = require('oracledb');
const config = require('../config/conect');
const constants = require('../constants/constants');
const queries = require('../sql/queries');


const nemo = constants.nemo;
var response=constants.response;
const data= constants.data;



 const inicializar= async (req,res) =>{
    if(req.headers!=null){
        data.usuarioI = new Date();
        
        if (req.headers['application']=="UEhBTlRPTVhfV0VC" && req.headers['idorganizacion']=="365509c8-9596-4506-a5b3-487782d5876e"){
            if(Object.keys(req.body).length===0){
                response = constants.setResponse(400,false,"No hay cuerpo",[]);
                res.status(400).send(response);
            }else if(req.params.codigoEmpresa<0 || constants.tipo.indexOf(req.params.tipoPreTransaccion)==-1 ){
                response = constants.setResponse(400,false,"Los parametros enviados por url, no son validos",[]);
                res.status(400).send(response);
            }
            else {
                data.secuencia=req.body.secuenciaUsuario;
                data.tipo = req.params.tipoPreTransaccion;
                data.codigoE = req.params.codigoEmpresa;
                
                if (req.body.nemonicoCanalFacturacion=='CAJA')   
                    data.nemo=nemo.CAJA;
                else if (req.body.nemonicoCanalFacturacion=='KIOSKO')   
                    data.nemo=nemo.KIOSKO;
                else{  
                    response = constants.setResponse(400,"El campo nemonico no es valido","No Data Found")
                    res.status(400).send(response)
                }

                try{
                    var connection = await oracledb.getConnection(config);
                    let resp = await connection.execute(queries.getUsuario(data.secuencia))
                    if(resp.rows.length>0){
                        
                        data.codigoE=resp.rows[0][1]; 
                        data.codigoU=resp.rows[0][4];
                        data.activo=resp.rows[0][27];
                        resp=await connection.execute(queries.getEmpresas(data.codigoE))
                        data.codigoE=resp.rows[0][0];
                        resp= await connection.execute(queries.getSecuenciaTransaccion());
                        if(resp.rows.length>0){
                            
                            data.codigoPre=resp.rows[0][0];
                            if(Object.keys(req.body.caja).length!==0){
                                console.log('tiene datos')
                                console.log(req.body.caja)
                                resp= await connection.execute(queries.insertTransaccionConCaja(),
                                [data.codigoPre, data.codigoE,req.body.caja.codigoSucursal,req.body.caja.codigoCaja,req.body.caja.numeroPuntoEmision ,data.secuencia, data.codigoU, data.tipo, data.nemo, data.activo, data.secuencia, data.codigoU, data.usuarioI],{ autoCommit: true } ); 
                                response = constants.setResponse(0,true,"Se ingreso La pre_transaccion",{"idPreTransaccion":data.codigoPre});
                                res.status(200).send(response);
                                connection.close()
                            }else{
                                console.log('no tiene datos')
                                resp= await connection.execute(queries.insertTransaccionSinCaja(),
                                [data.codigoPre, data.codigoE, data.secuencia, data.codigoU, data.tipo, data.nemo, data.activo, data.secuencia, data.codigoU, data.usuarioI],{ autoCommit: true } ); 
                                response = constants.setResponse(0,true,"Se ingreso La pre_transaccion",{"idPreTransaccion":data.codigoPre});
                                res.status(200).send(response);
                                connection.close()
                            }
                        }else{
                            connection.commit(); 
                            connection.close(); 
                            response = constants.setResponse(500,false,"Ha ocurrido un error inesperado.",resp); 
                            res.status(500).send(response);
                        }
                    }else{
                        connection.commit()
                        connection.close()
                        response = constants.setResponse(500,false,"Ha ocurrido un error inesperado.","No Data found");
                        res.status(500).send(response);
                    }
                }catch(error){
                    response.Data=[error.message];
                    res.send(response);
                }
                
            }
        }else{
            response = constants.setResponse(401,false,"Las cedenciales de autenticación no son válidas.",[]);
            res.status(401).send(response);
        }
    }

}

exports.inicializar=inicializar;