.PHONY: build
build:
	@echo "Building ts code..."
	rm -rf dist
	yarn tsc --module commonjs

.PHONY: test
test:
	yarn nyc -a \
		--reporter=html \
		--reporter=text mocha './tests' \
		--require esm \
		--require jsdom-global/register \
		--require ts-node/register 'tests/**/*.test.ts' \
		--require tsconfig-paths/register \
		--timeout 300000 \
		--exit
