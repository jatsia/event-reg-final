.DEFAULT_GOAL := dev

EVENT_PORT ?= 8000

.PHONY: dev check

dev:
	@echo "Event Registry: http://localhost:$(EVENT_PORT)"
	@python3 -m http.server $(EVENT_PORT) --directory frontend

check:
	@set -e; for source_file in $$(find frontend/src -name '*.js'); do \
		node --check "$$source_file"; \
	done
	@node -e "Promise.all([import('./frontend/src/events/index.js'), import('./frontend/src/registrations/index.js'), import('./frontend/src/shared/shell.js')])"
	@node --test frontend/tests/*.test.js
