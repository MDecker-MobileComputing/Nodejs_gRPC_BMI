
@REM Programm "grpcurl.exe" muss im aktuellen Verzeichnis oder im PATH gefunden werden.
@REM Für Download siehe https://repology.org/project/grpcurl/information , Abschnitt "Download"

@echo.

@grpcurl -plaintext ^
         -d "{\"gewicht_kg\": 70, \"koerpergroesse_cm\": 175}" ^
         -import-path . ^
         -proto bmi_berechnung.proto ^
         localhost:50051 bmi.BmiDienst/BerechneBmi

@echo.
