#!/bin/bash
source ./uri_home.sh
src_uri=$uri
dump_dir=`mktemp -d -t factory-dump`
echo "Dumping home/FACTORY-SEED to ${dump_dir}"
mongodump --uri $src_uri/FACTORY-SEED?authSource=admin --out ${dump_dir}
dumped=$?
if [ $dumped -eq 0 ]
then
	echo "Compressing dumped FACTORY-SEED"
	pushd ${dump_dir}
	tar czf ${dump_dir}/FACTORY-SEED.tar.gz FACTORY-SEED
	tared=$?
	popd
	stat ${dump_dir}/FACTORY-SEED.tar.gz
	if [ $tared -eq 0 ]
	then
		upload_line=$(curl https://api.github.com/repos/prompto/prompto-factory/releases/latest | grep upload_url)
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