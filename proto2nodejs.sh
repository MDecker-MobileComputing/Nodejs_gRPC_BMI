#!/bin/bash

grpc_tools_node_protoc \
  --js_out=import_style=commonjs,binary:./output \
  --grpc_out=output \
  --plugin=protoc-gen-grpc=`which grpc_tools_node_protoc_plugin` \
  -I . \
  bmi_berechnung.proto
