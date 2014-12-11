BIN = ./node_modules/.bin

test: lint
	@$(BIN)/mocha -R spec -b spec.js

lint:
	@$(BIN)/jshint index.js lib/*.js

install:
	npm install

release-patch: test
	@$(call release,patch)

release-minor: test
	@$(call release,minor)

release-major: test
	@$(call release,major)

publish:
	git push --tags origin HEAD:master
	npm publish

define release
	npm version $(1) -m 'release v%s'
endef
