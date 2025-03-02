const grpc        = require( "@grpc/grpc-js"                    );
const bmiServices = require( "../output/bmi_berechnung_grpc_pb" );
const bmiMessages = require( "../output/bmi_berechnung_pb"      );


function berechneBmi( call, callback ) {

    const eingabe          = call.request;
    const gewichtKg        = eingabe.getGewichtKg();
    const koerpergroesseCm = eingabe.getKoerpergroesseCm();

    const koerpergroesseMeter = koerpergroesseCm / 100;
    const bmiWert             = gewichtKg / ( koerpergroesseMeter * koerpergroesseMeter );

    let bmiInterpretation;
    if      ( bmiWert < 18.5 ) { bmiInterpretation = "Untergewicht";        }
    else if ( bmiWert < 25.0 ) { bmiInterpretation = "Normalgewicht";       }
    else if ( bmiWert < 30.0 ) { bmiInterpretation = "Prä-Adipositas";      }
    else if ( bmiWert < 35.0 ) { bmiInterpretation = "Moderate Adipositas"; }
    else if ( bmiWert < 40.0 ) { bmiInterpretation = "Starke Adipositas";   }
    else                       { bmiInterpretation = "Extreme Adipositas";  }

    const ergebnis = new bmiMessages.BmiErgebnis();
    ergebnis.setBmiWert( bmiWert );
    ergebnis.setBmiInterpretation( bmiInterpretation );

    console.log( `Anfrage erhalten: Gewicht=${gewichtKg}kg, Körpergröße=${koerpergroesseCm}cm => BMI=${bmiWert.toFixed( 1 )} (${bmiInterpretation})` );

    callback( null, ergebnis );
}

function main() {

    const server = new grpc.Server();

    server.addService( bmiServices.BmiDienstService, 
                       { berechneBmi: berechneBmi } 
                     );

    server.bindAsync( "0.0.0.0:50051", 
                      grpc.ServerCredentials.createInsecure(), 
                      ( error, port ) => {

        if ( error ) {

            console.error( "Fehler beim Start des Servers:", error );
            return;
        }

        console.log( `\nServer gestartet auf Port ${port}.\n` );
    });
}

main();
