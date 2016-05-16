#!/bin/bash

set -o errexit -o nounset

if [ "$TRAVIS_BRANCH" != "master" ]
then
  echo "This commit was made against the $TRAVIS_BRANCH and not the master! No deploy!"
  exit 0
fi

rev=$(git rev-parse --short HEAD)

npm run builddocs || exit 1

cd out/

git init
git config user.name "Den Williams"
git config user.email "work@denwilliams.net"

git remote add upstream "https://$GH_TOKEN@github.com/denwilliams/node-red-contrib-scenes.git"
git fetch upstream
git reset upstream/gh-pages

touch .

git add -A .
git commit -m "rebuild pages at ${rev}"
git push -q upstream HEAD:gh-pages
