#!/bin/bash

set -o errexit -o nounset

if [ "$TRAVIS_BRANCH" != "master" ]
then
  echo "This commit was made against the $TRAVIS_BRANCH and not the master! No deploy!"
  exit 0
fi

rev=$(git rev-parse --short HEAD)

echo "Deploying github pages for $rev"

git stash
npm run builddocs || exit 1

# git remote update
# git fetch
git checkout -t -b gh-pages origin/gh-pages
# git checkout gh-pages || exit 1

mkdir doc
# cp -R out/docs/ doc || exit 1
mv ../out/docs/ doc/$(node -e "console.log(require('./package').version)") || exit 1
git add doc/ || exit 1
git commit -m "Generate documentation for v$(node -e "console.log(require('./package').version)")"
git push origin gh-pages
git checkout $branch
git stash pop
