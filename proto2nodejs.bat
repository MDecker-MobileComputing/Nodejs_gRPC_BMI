@echo off

@REM Dieses Pfad anpassen.
@REM Basisverzeichnis für globale NPM-Module herausfinden: npm root -g
set PLUGIN_PATH=C:\Repository_NPM\grpc_tools_node_protoc_plugin.cmd

grpc_tools_node_protoc ^
  --js_out=import_style=commonjs,binary:./output ^
  --grpc_out=output ^
  --plugin=protoc-gen-grpc=%PLUGIN_PATH% ^
  -I . ^
  bmi_berechnung.proto