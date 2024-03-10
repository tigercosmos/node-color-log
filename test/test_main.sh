#!/usr/bin/bash

node test/test.js

LOGGER=info node test/test2.js

node test/test3.js

LOGGER=info node test/test4.js

node test/test_stream.js
