#! /bin/bash
npm run build
rm -rf ../smeditor.github.io/index.html ../smeditor.github.io/static
mv dist/* ../smeditor.github.io/
cd ../smeditor.github.io
git add *
git commit -m 'update'
git push
cd ../smeditor

