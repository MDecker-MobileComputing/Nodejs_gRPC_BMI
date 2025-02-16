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

function main() {
  const client = new bmiProto.BmiDienst('localhost:50051', grpc.credentials.createInsecure());

  const request = {
    gewicht_kg: 70,
    koerpergroesse_cm: 175
  };

  client.BerechneBmi(request, (error, response) => {
    if (error) {
      console.error('Error:', error);
    } else {
      console.log('Response:', response);
    }
  });
}

main();