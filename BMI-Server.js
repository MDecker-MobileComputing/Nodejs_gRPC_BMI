const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const PROTO_PATH = path.join(__dirname, 'bmi_berechnung.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});
const bmiProto = grpc.loadPackageDefinition(packageDefinition).bmi;

function berechneBmi(call, callback) {

  // Parameter auspacken
  const gewichtKg        = call.request.gewicht_kg;
  const koerpergroesseCm = call.request.koerpergroesse_cm;

  // BMI berechnen
  const koerpergroesseM = koerpergroesseCm / 100;
  let bmi = gewichtKg / (koerpergroesseM * koerpergroesseM);
  bmi = Math.round(bmi * 10) / 10;

  // Interpretation des BMI-Wertes
  let interpretation = "";
  if      ( bmi < 18.5 ) { interpretation = "Untergewicht";        }
  else if ( bmi < 25.0 ) { interpretation = "Normalgewicht";       }
  else if ( bmi < 30.0 ) { interpretation = "Prä-Adipositas";      }
  else if ( bmi < 35.0 ) { interpretation = "Moderate Adipositas"; }
  else if ( bmi < 40.0 ) { interpretation = "Starke Adipositas";   }
  else                   { interpretation = "Extreme Adipositas";  }

  const ergebnisObjekt = { 
                           bmi_wert          : bmi, 
                           bmi_interpretation: interpretation 
                        };

  callback(null, ergebnisObjekt);
}

function main() {
  const server = new grpc.Server();
  server.addService(bmiProto.BmiDienst.service, { BerechneBmi: berechneBmi });
  server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    server.start();
    console.log('Server running at http://0.0.0.0:50051');
  });
}

main();