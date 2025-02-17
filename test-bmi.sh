#!/bin/bash

echo

./grpcurl -plaintext \
          -d '{"gewicht_kg": 70, "koerpergroesse_cm": 175}' \
          -import-path . \
          -proto bmi_berechnung.proto \
          localhost:50051 bmi.BmiDienst/BerechneBmi

echo

# grpcurl benötigt die .proto-Datei, um die Struktur des gRPC-Dienstes und die zu sendenden Nachrichten zu verstehen.
# Die .proto-Datei definiert die Methoden des Dienstes, die Anfrage- und Antwortnachrichtentypen und andere notwendige Details.
# Dadurch kann grpcurl die Anfrage korrekt formatieren und die Antwort des gRPC-Servers interpretieren.
