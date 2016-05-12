#!/bin/bash

branch=`git branch | grep '\*' | sed 's/\* *//'`

git stash
npm run builddocs || exit 1
git checkout gh-pages || exit 1
mkdir doc
# cp -R out/docs/ doc || exit 1
mv out/docs/ doc/$(node -e "console.log(require('./package').version)") || exit 1
git add doc/ || exit 1
git commit -m "Generate documentation for v$(node -e "console.log(require('./package').version)")"
git push origin gh-pages
git checkout $branch
git stash pop
