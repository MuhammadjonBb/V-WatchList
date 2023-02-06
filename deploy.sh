set -e
cd dist

git init
git remote add origin https://github.com/MukhammadzonBb/V-WatchList.git
git checkout -b build
git add .
git commit -m "deploy"
git push -f origin build