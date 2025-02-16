// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var bmi_berechnung_pb = require('./bmi_berechnung_pb.js');

function serialize_bmi_BmiEingabe(arg) {
  if (!(arg instanceof bmi_berechnung_pb.BmiEingabe)) {
    throw new Error('Expected argument of type bmi.BmiEingabe');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_bmi_BmiEingabe(buffer_arg) {
  return bmi_berechnung_pb.BmiEingabe.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_bmi_BmiErgebnis(arg) {
  if (!(arg instanceof bmi_berechnung_pb.BmiErgebnis)) {
    throw new Error('Expected argument of type bmi.BmiErgebnis');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_bmi_BmiErgebnis(buffer_arg) {
  return bmi_berechnung_pb.BmiErgebnis.deserializeBinary(new Uint8Array(buffer_arg));
}


// Dienstdefinition für die BMI-Berechnung
var BmiDienstService = exports.BmiDienstService = {
  berechneBmi: {
    path: '/bmi.BmiDienst/BerechneBmi',
    requestStream: false,
    responseStream: false,
    requestType: bmi_berechnung_pb.BmiEingabe,
    responseType: bmi_berechnung_pb.BmiErgebnis,
    requestSerialize: serialize_bmi_BmiEingabe,
    requestDeserialize: deserialize_bmi_BmiEingabe,
    responseSerialize: serialize_bmi_BmiErgebnis,
    responseDeserialize: deserialize_bmi_BmiErgebnis,
  },
};

exports.BmiDienstClient = grpc.makeGenericClientConstructor(BmiDienstService, 'BmiDienst');
