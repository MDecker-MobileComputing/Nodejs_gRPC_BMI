
grpcurl -plaintext -d "{\"gewicht_kg\": 70, \"koerpergroesse_cm\": 175}" -import-path . -proto bmi_berechnung.proto localhost:50051 bmi.BmiDienst/BerechneBmi