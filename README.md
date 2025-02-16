# BMI-Berechnung mit gRPC #

<br>

Dieses Repo enthält eine [`.proto`-Datei](bmi_berechnung.proto) für einen gRPC-Dienst zur Berechnung des 
[Body Mass Index (BMI)](https://www.apotheken-umschau.de/gesund-bleiben/abnehmen/body-mass-index-den-bmi-berechnen-706435.html).

<br>

----

## Aufruf grpc-Compiler ##

<br>

Globale Installation benötigter Pakete:
```
npm install -g grpc-tools protobufjs
```

<br>

Aufruf grpc-Compiler unter Linux im Wurzelverzeichnis dieses Repos, damit 
```
grpc_tools_node_protoc \
  --js_out=import_style=commonjs,binary:./output \
  --grpc_out=output \
  --plugin=protoc-gen-grpc=`which grpc_tools_node_protoc_plugin` \
  -I . \
  bmi_berechnung.proto
```

<br>

Erzeuge Stub-Dateien für Client und Server: siehe Verzeichnis [output](output/).

<br>

----

## Test Server mit `grpcurl` ##

<br>

Mit dem Kommandozeilenprogramm `grpcurl` kann der Server getestet werden, siehe 
die beiden Skripte [test-bmi.bat](test-bmi.bat) und [test-bmi.sh](test-bmi.sh).
<br>

**Links:** 

* Homepage: https://github.com/fullstorydev/grpcurl
* Binaries für Windows und Linux: https://repology.org/project/grpcurl/information (Abschnitt "Downloads")

<br>

Bei der Ausführung von `grpcurl` muss auch die `.proto`-Datei im Ausführungsverzeichnis vorliegen.

<br>

----

## License ##

<br>

See the [LICENSE file](LICENSE.md) for license rights and limitations (BSD 3-Clause License)
for the files in this repository.

<br>