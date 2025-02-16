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
  const gewichtKg = call.request.gewicht_kg;
  const koerpergroesseCm = call.request.koerpergroesse_cm;
  const koerpergroesseM = koerpergroesseCm / 100;
  const bmi = gewichtKg / (koerpergroesseM * koerpergroesseM);
  callback(null, { bmi: bmi });
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