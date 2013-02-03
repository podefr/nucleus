clean:
	rm -f Nucleus*.js

amd:
	r.js -o build-directives/build-amd.js

standalone:
	r.js -o build-directives/build-standalone.js

all: amd standalone

