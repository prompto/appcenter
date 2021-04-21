#!/bin/bash
rm -f platform_version.txt
platform_version=$(cat CodeFactory/pom.xml | grep prompto.version\> | cut -d'>' -f 2 | cut -d'<' -f 1)
echo platform_version: $platform_version
pushd ../../prompto-docker
	docker build --no-cache -t prompto/factory:$1 -f factory.dockerfile --build-arg PLATFORM_VERSION=${platform_version} .
	build=$?
popd
if [ $build -eq 0 ] 
then
	docker login -u prompto -p $(cat password.txt)
	docker push prompto/factory:$1
	push=$?
	docker logout
else
	echo docker build failed: $build
fi
	 