#!/bin/bash
echo "Did you bump the platform version in pom.xml?"
echo "Is the platform version released?"
read -p "version to publish: " version
read -p "release name: " name
mvn versions:set -DnewVersion=$version -DgenerateBackupPoms=false
mvn clean deploy -P deploy -DskipTests=true
deploy=$?
mvn versions:set -DnewVersion=0.0.1-SNAPSHOT -DgenerateBackupPoms=false
if [ $deploy -eq 0 ]
then
	tag=v$version
	json="{ \"tag_name\": \"$tag\", \"name\": \"$name\" }"
	rm -f release.json
	echo $json >> release.json
	curl --request POST \
		 --header "Content-Type: application/json" \
		 --data @release.json \
		 --header "Authorization: token $(cat token.txt)" \
		 --url https://api.github.com/repos/prompto/prompto-factory/releases
	release=$?	 
	if [ $release -eq 0 ]
	then
		./copy_home_seed_to_atlas_seed.sh $(cat password.txt)
	fi
else
	echo $deploy
fi