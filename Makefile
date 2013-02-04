clean:
	rm -f Nucleus*.js

amd:
	r.js -o build-directives/build-amd.js

standalone:
	r.js -o build-directives/build-standalone.js

jquery:
	r.js -o build-directives/build-jquery.js

all: amd standalone jquery

