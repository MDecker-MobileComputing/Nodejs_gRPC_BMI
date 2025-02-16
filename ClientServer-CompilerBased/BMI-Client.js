const grpc = require('@grpc/grpc-js');
const bmiServices = require('../output/bmi_berechnung_grpc_pb');
const bmiMessages = require('../output/bmi_berechnung_pb');

function main() {
    const client = new bmiServices.BmiDienstClient(
        'localhost:50051',
        grpc.credentials.createInsecure()
    );

    const request = new bmiMessages.BmiEingabe();
    request.setGewichtKg(70);
    request.setKoerpergroesseCm(175);

    client.berechneBmi(request, (error, response) => {
        if (error) {
            console.error('Error:', error);
            return;
        }
        console.log('BMI Wert:', response.getBmiWert());
        console.log('BMI Interpretation:', response.getBmiInterpretation());
    });
}

main();
