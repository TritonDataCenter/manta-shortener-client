TAPE		:= ./node_modules/.bin/tape

all: jshint test

test: $(TAPE)
	@(for F in test/*.test.js; do \
		echo "# $$F" ;\
		$(NODE) $(TAPE) $$F ;\
		[[ $$? == "0" ]] || exit 1; \
	done)

check:
	jshint examples test index.js

.PHONY: test check
