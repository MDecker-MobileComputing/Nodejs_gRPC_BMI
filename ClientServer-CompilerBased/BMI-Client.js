const grpc = require( "@grpc/grpc-js" );
const bmiProto = require( "../output/bmi_berechnung_grpc_pb" );
const messages = require( "../output/bmi_berechnung_pb" );

function main( ) {
  const client = new bmiProto.BmiDienstClient( "localhost:50051", grpc.credentials.createInsecure( ) );

  const request = new messages.BmiAnfrage( );
  request.setGewichtKg( 68 );
  request.setKoerpergroesseCm( 195 );

  client.berechneBmi( request, ( error, response ) => {
    if ( error ) {
      console.error( "Fehler:", error );
    } else {
      const bmiWert = response.getBmiWert( );
      const bmiInterpretation = response.getBmiInterpretation( );

      const bmiWertGerundet = Math.round( bmiWert * 10 ) / 10;

      console.log( `\nBMI-Wert: ${bmiWertGerundet} (${bmiInterpretation})\n` );
    }
  } );
}

main( );