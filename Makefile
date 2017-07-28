GULP=./node_modules/gulp/bin/gulp.js
BOWER=./node_modules/bower/bin/bower

default:
	./node_modules/.bin/gulp

setup:
	npm install
	$(BOWER) install --allow-root 

release:
	$(GULP) release

sync:
	git pull origin master
	git push origin master

# deploy.hom: sync
# 	ssh root@104.131.217.84 \
# 		'cd /var/www/default && \
# 		git pull origin master && \
# 		make setup && \
# 		make release'

# deploy.prod: sync
# 	ssh root@104.131.218.244 \
# 		'cd /var/www/default && \
# 		git pull origin master && \
# 		make setup && \
# 		make release'