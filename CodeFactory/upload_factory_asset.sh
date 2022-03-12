#!/bin/bash
source ./uri_home.sh
src_uri=$uri
src_auth=$auth
dump_dir=`mktemp -d -t factory-dump`
echo "Dumping home/FACTORY-SEED to ${dump_dir}"
authOption=$([ "$src_auth" == "noAuth" ] && echo "" || echo "authSource=admin")
mongodump --uri $src_uri/FACTORY-SEED?$authOption --out ${dump_dir}
dumped=$?
if [ $dumped -eq 0 ]
then
	echo "Compressing dumped FACTORY-SEED"
	pushd ${dump_dir}
	rm FACTORY-SEED/configurations.bson
	rm FACTORY-SEED/configurations.metadata.json
	rm FACTORY-SEED/auditConfigs.bson
	rm FACTORY-SEED/auditConfigs.metadata.json
	rm FACTORY-SEED/auditMetadatas.bson
	rm FACTORY-SEED/auditMetadatas.metadata.json
	rm FACTORY-SEED/auditRecords.bson
	rm FACTORY-SEED/auditRecords.metadata.json
	tar czf ${dump_dir}/FACTORY-SEED.tar.gz FACTORY-SEED
	tared=$?
	popd
#	stat ${dump_dir}/FACTORY-SEED.tar.gz
	if [ $tared -eq 0 ]
	then
		upload_line=$(cat $1 | grep upload_url)
		upload_url=$(echo $upload_line | cut -d'"' -f 4 | cut -d{ -f 1)"?name=factory.tar.gz&label=Prompto%20source%20code%20%28tar.gz%29"
		echo uploading factory dump to $upload_url 
		curl --request POST \
			 --header "Accept: application/vnd.github.v3+json" \
			 --header "Content-Type: application/x-compressed-tar" \
			 --header "Authorization: token $(cat token.txt)" \
			 --data-binary @${dump_dir}/FACTORY-SEED.tar.gz \
			 --url $upload_url \
			 >> upload-result.json
	fi
fi
exit $dumped