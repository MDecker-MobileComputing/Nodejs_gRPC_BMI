const grpc     = require( "@grpc/grpc-js"                    );
const bmiProto = require( "../output/bmi_berechnung_grpc_pb" );
const messages = require( "../output/bmi_berechnung_pb"      );


function berechneBmi( call, callback ) {

  // Parameter auspacken
  const gewichtKg        = call.request.getGewichtKg( );
  const koerpergroesseCm = call.request.getKoerpergroesseCm( );

  // BMI berechnen
  const koerpergroesseM = koerpergroesseCm / 100;
  const bmi = gewichtKg / ( koerpergroesseM * koerpergroesseM );

  // Interpretation des BMI-Wertes
  let interpretation = "";
  if ( bmi < 18.5 ) {

    interpretation = "Untergewicht";

  } else if ( bmi < 25.0 ) {

    interpretation = "Normalgewicht";

  } else if ( bmi < 30.0 ) {

    interpretation = "Prä-Adipositas";

  } else if ( bmi < 35.0 ) {

    interpretation = "Moderate Adipositas";

  } else if ( bmi < 40.0 ) {

    interpretation = "Starke Adipositas";

  } else {

    interpretation = "Extreme Adipositas";
  }

  const ergebnisObjekt = new messages.BmiAntwort( );
  ergebnisObjekt.setBmiWert( bmi );
  ergebnisObjekt.setBmiInterpretation( interpretation );

  console.log( `BMI-Wert für ${gewichtKg}kg bei ${koerpergroesseCm}cm berechnet: ${bmi} (${interpretation})` );

  callback( null, ergebnisObjekt );
}

function main( ) {
  const server = new grpc.Server( );
  server.addService( bmiProto.BmiDienstService, { berechneBmi: berechneBmi } );
  server.bindAsync( "0.0.0.0:50051", grpc.ServerCredentials.createInsecure( ), ( ) => {
    console.log( "Server lauscht auf Port 50051" );
  } );
}

main( );
