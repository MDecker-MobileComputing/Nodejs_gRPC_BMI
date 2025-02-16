# BMI-Berechnung mit gRPC #

<br>

Diese Repo enthält Client und Server (Nodejs) für die Durchführung einer Berechnung des
[Body Mass Index (BMI)](https://www.apotheken-umschau.de/gesund-bleiben/abnehmen/body-mass-index-den-bmi-berechnen-706435.html)
über [gRPC](https://www.ionos.de/digitalguide/server/knowhow/grpc-vorgestellt/).

<br>

----

## Aufruf protoc für Nodejs ##

<br>

Der gRCP-Compiler `protoc` muss aufgerufen werden, um anhand der
Datei [bmi_berechnung.proto](bmi_berechnung.proto) (Schnittstellenbeschreibung) 
die Stubs für Client und Server zu erzeugen. 

<br>

Globale Installation benötigter Pakete:
```
npm install -g grpc-tools protobufjs
```

<br>

Aufruf `protoc` unter Linux im Wurzelverzeichnis dieses Repos 
(siehe auch [proto2nodejs.sh](proto2nodejs.sh)):
```
grpc_tools_node_protoc \
  --js_out=import_style=commonjs,binary:./output \
  --grpc_out=output \
  --plugin=protoc-gen-grpc=`which grpc_tools_node_protoc_plugin` \
  -I . \
  bmi_berechnung.proto
```

<br>

Für Windows siehe [proto2nodejs.bat](proto2nodejs.bat) (Wert von Variable `PLUGIN_PFAD` anpassen).

<br>

Ein erfolgreicher Aufruf des grpc-Compilers erzeugt zwei Dateien im Unterordner [output](output/):

* `bmi_berechnung_grpc_pb.js` : Code für (De-)Serialisierung
* `bmi_berechnung_pb.js`      : Client- und Server-Stubs

Das `pb` steht hierbei für "Protocol Buffers`.
Die beiden Dateien dürfen nicht von Hand verändert werden!

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