#!/bin/bash
echo "Copying $1/$2 to $3/$4"
source ./uri_$1.sh
src_uri=$uri
src_auth=$auth
auth=""
source ./uri_$3.sh
dst_uri=$uri
dst_auth=$auth
dump_dir=`mktemp -d -t factory-dump`
echo "Dumping $1/$2 to ${dump_dir}"
authOption=$([ "$src_auth" == "noAuth" ] && echo "" || echo "authSource=admin")
mongodump --uri $src_uri/$2?$authOption --out ${dump_dir}
dumped=$?
if [ $dumped -eq 0 ]
then
	if [ $2 != $4 ]
	then
		echo "Renaming dumped $2 to $4"
		mv ${dump_dir}/$2 ${dump_dir}/$4
	fi
	echo "Restoring $3/$4 from ${dump_dir}"
	authOption=$([ "$dst_auth" == "noAuth" ] && echo "" || echo "authSource=admin")
	mongorestore --uri $dst_uri/?$authOption --dir ${dump_dir}/$4/ -d $4 --drop 
fi