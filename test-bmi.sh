#!/bin/bash


./grpcurl -plaintext \
          -d '{"gewicht_kg": 70, "koerpergroesse_cm": 175}' \
          -import-path . \
          -proto bmi_berechnung.proto \
          localhost:50051 bmi.BmiDienst/BerechneBmi

# grpcurl needs the .proto file to understand the structure of the gRPC service and the messages it needs to send. 
# The .proto file defines the service methods, request and response message types, and other necessary details. 
# This allows grpcurl to correctly format the request and interpret the response from the gRPC server.
