#!/bin/bash
DUMP_DIR=`mktemp -d -t factory-seed-dump`
echo "Dumping into ${DUMP_DIR}"
mongodump --uri "mongodb://localhost:27017/FACTORY-DEV" --out $DUMP_DIR
mongorestore --uri "mongodb+srv://admin:$(cat password.txt)@seed-cp8j5.mongodb.net" --db FACTORY-DEV --dir $DUMP_DIR/FACTORY-DEV --drop