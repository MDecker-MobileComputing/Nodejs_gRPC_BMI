const grpc        = require( "@grpc/grpc-js"                    );
const bmiServices = require( "../output/bmi_berechnung_grpc_pb" );
const bmiMessages = require( "../output/bmi_berechnung_pb"      );

function main() {

    const client = 
            new bmiServices.BmiDienstClient(
                          "localhost:50051",
                          grpc.credentials.createInsecure()
            );

    const request = new bmiMessages.BmiEingabe();
    request.setGewichtKg( 99 );
    request.setKoerpergroesseCm( 175 );

    client.berechneBmi( request, ( error, response ) => {

        if ( error ) {

            console.error( "Fehler:", error );
            
        } else {
        
          const bmiWertGerundet   = response.getBmiWert().toFixed( 1 );
          const bmiInterpretation = response.getBmiInterpretation();

          console.log( `\nBMI Wert: ${bmiWertGerundet} (${bmiInterpretation})\n` );
        }
    });
}

main();
