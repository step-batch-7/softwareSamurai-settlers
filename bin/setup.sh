#!/usr/bin/env sh
cp .github/pre-commit-hook.sh .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit

cp .github/pre-push-hook.sh .git/hooks/pre-push
chmod +x .git/hooks/pre-push

git config --local commit.template '.github/commit-template'
npm install