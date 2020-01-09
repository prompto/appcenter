#!/bin/bash
DUMP_DIR=`mktemp -d -t factory-seed-dump`
echo "Dumping into ${DUMP_DIR}"
mongodump --host 119.237.156.192 --port 27017 --username prompto --password prompto --db FACTORY-SEED --authenticationDatabase admin --out $DUMP_DIR
mongorestore --uri "mongodb+srv://admin:$1@seed-cp8j5.mongodb.net" --db FACTORY --dir $DUMP_DIR/FACTORY-SEED --drop