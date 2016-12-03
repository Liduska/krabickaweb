#!/bin/bash
rm -rf out || exit 0;
mkdir out;
( cd out
 git init
 git config user.name "Travis-CI"
 git config user.email "travis@krabickanamiru.cz"
 cp ../CNAME ./CNAME
 cp ../index.html ./index.html
 cp -r ../build ./build
 cp -r ../img ./img
 cp -r ../css ./css
 git add .
 git commit -m "Deployed to Github Pages"
 git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" master:gh-pages > /dev/null 2>&1
)
