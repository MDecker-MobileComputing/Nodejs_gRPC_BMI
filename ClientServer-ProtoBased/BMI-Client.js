const grpc        = require( "@grpc/grpc-js"      );
const protoLoader = require( "@grpc/proto-loader" );
const path        = require( "path"               );

const PROTO_PATH = path.join( __dirname, "../bmi_berechnung.proto" );
const packageDefinition = 
        protoLoader.loadSync( PROTO_PATH, 
                              { 
                                keepCase: true,
                                longs   : String,
                                enums   : String,
                                defaults: true,
                                oneofs  : true
                              }
                            );
const bmiProto = grpc.loadPackageDefinition( packageDefinition ).bmi;

function main() {

  const client = new bmiProto.BmiDienst( "localhost:50051", 
                                         grpc.credentials.createInsecure()
                                       );
  const request = {
                    gewicht_kg       :  68,
                    koerpergroesse_cm: 195
                  };

  client.BerechneBmi( request, ( error, response ) => {

    if ( error ) {

      console.error( "Fehler:", error );

    } else {

      const bmiWert           = response.bmi_wert;
      const bmiInterpretation = response.bmi_interpretation;

      const bmiWertGerundet = Math.round( bmiWert * 10 ) / 10;

      console.log( `\nBMI-Wert: ${bmiWertGerundet} (${bmiInterpretation})\n` );
    }
  });
}

main();