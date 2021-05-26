#!/bin/bash
echo "Did you bump the platform version in pom.xml?"
echo "Is the platform version released?"
echo "Is the docker daemon running?"
read -p "version to publish: " version
read -p "release name: " name
./build_and_publish_artifacts.sh $version
deploy=$?
if [ $deploy -eq 0 ]
then
	rm -f release.json
	tag=v$version
	json="{ \"tag_name\": \"$tag\", \"name\": \"$name\" }"
	echo $json >> release.json
	./create_github_release.sh https://api.github.com/repos/prompto/prompto-factory/releases
	release=$?	 
	if [ $release -eq 0 ]
	then
		./upload_factory_asset.sh
		upload=$?
		if [ $upload -eq 0 ]
		then
			./build_and_push_docker_image.sh $version
		else
			echo "upload failed: $upload"
		fi
	else
		echo "release failed: $release"
	fi
else
	echo "deploy failed: $deploy"
fi