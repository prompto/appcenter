#!/bin/bash
DUMP_DIR=`mktemp -d -t factory-seed-dump`
echo "Dumping into ${DUMP_DIR}"
mongodump --uri "mongodb+srv://admin:$(cat password.txt)@seed-cp8j5.mongodb.net/FACTORY" --out $DUMP_DIR/FACTORY 
mongorestore --uri "mongodb://localhost:27017/FACTORY" --dir $DUMP_DIR/FACTORY --drop
