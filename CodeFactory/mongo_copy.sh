#!/bin/bash
echo "Copying $1/$2 to $3/$4"
source ./uri_$1.sh
src_uri=$uri
source ./uri_$3.sh
dst_uri=$uri
echo $dst_uri
dump_dir=`mktemp -d -t factory-dump`
echo "Dumping $1/$2 to ${dump_dir}"
mongodump --uri $src_uri/$2 --out ${dump_dir}
if [ $2 != $4 ]
then
	echo "Renaming dumped $2 to $4"
	mv ${dump_dir}/$2 ${dump_dir}/$4
fi
echo "Restoring $3/$4 from ${dump_dir}"
mongorestore --uri $dst_uri/$4 --dir ${dump_dir} --drop
