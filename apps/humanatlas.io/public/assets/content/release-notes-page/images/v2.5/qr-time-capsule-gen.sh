#!/bin/bash

URL=https://doi.org/10.5281/zenodo.15323983
FILE=qr-time-capsule

qrencode -o ${FILE}.png -l M -d 300 $URL
qrencode -o ${FILE}.svg -l M -t svg --svg-path --rle $URL
