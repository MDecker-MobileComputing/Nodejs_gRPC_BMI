@echo off

@REM Aufruf gRCP-Compiler "protoc" für Node.js

@REM Diesen Pfad anpassen.
@REM Basisverzeichnis für globale NPM-Module herausfinden: npm root -g
set PLUGIN_PFAD=C:\Repository_NPM\grpc_tools_node_protoc_plugin.cmd

grpc_tools_node_protoc ^
  --js_out=import_style=commonjs,binary:./output ^
  --grpc_out=output ^
  --plugin=protoc-gen-grpc=%PLUGIN_PFAD% ^
  -I . ^
  bmi_berechnung.proto
