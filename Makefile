BIN = ./node_modules/.bin

test::
	@yarn test

build::
	@yarn build

clean::
	@rm -rf dist

release-patch:: clean test build
	@$(call release,patch)

release-minor:: clean test build
	@$(call release,minor)

release-major:: clean test build
	@$(call release,major)

publish::
	git push --tags origin HEAD:master
	npm publish

define release
	npm version $(1) -m 'Release v%s'
endef
