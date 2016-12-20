

all: prepare run-tests
	@echo "Done"

prepare:
	@-rm -fr ../static/albums/*
	@echo "Preparing MySQL db for running"
	@/usr/local/mysql/bin/mysql -u root < ../schema.sql
	@echo "Launching app server"
	@-killall node
	@sh -c "pushd ../app && sh -c \"node server.js 2>&1 > ../test/output.txt &\" && popd && sleep 2"

run-tests:
	@echo "Starting to run tests..."
	@node_modules/.bin/nodeunit 01_api_albums.js 02_api_photos.js
	@echo "Tested! Shutting down app server"
	@killall node
