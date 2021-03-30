@echo off
echo --- INIT ---
call npm init --yes
call npm install express
call npm install -D ts-node typescript @types/express @types/node
call npx tsc --init
call fsutil file createNew index.ts 0
echo --- DONE ---