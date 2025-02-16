const grpc        = require('@grpc/grpc-js');
const bmiServices = require('../output/bmi_berechnung_grpc_pb');
const bmiMessages = require('../output/bmi_berechnung_pb');

function berechneBmi(call, callback) {
    const eingabe = call.request;
    const gewicht_kg = eingabe.getGewichtKg();
    const koerpergroesse_cm = eingabe.getKoerpergroesseCm();

    const heightInMeters = koerpergroesse_cm / 100;
    const bmiWert = gewicht_kg / (heightInMeters * heightInMeters);

    let bmiInterpretation;
    if (bmiWert < 18.5) {
        bmiInterpretation = "Untergewicht";
    } else if (bmiWert < 25) {
        bmiInterpretation = "Normalgewicht";
    } else if (bmiWert < 30) {
        bmiInterpretation = "Übergewicht";
    } else {
        bmiInterpretation = "Adipositas";
    }

    const ergebnis = new bmiMessages.BmiErgebnis();
    ergebnis.setBmiWert(parseFloat(bmiWert.toFixed(1)));
    ergebnis.setBmiInterpretation(bmiInterpretation);

    callback(null, ergebnis);
}

function main() {
    const server = new grpc.Server();
    server.addService(bmiServices.BmiDienstService, { berechneBmi: berechneBmi });
    server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), (err, port) => {
        if (err) {
            console.error('Failed to bind server:', err);
            return;
        }
        console.log(`Server running at http://0.0.0.0:${port}`);
        //server.start();
    });
}

main();
