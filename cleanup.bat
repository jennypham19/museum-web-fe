@echo off
echo 🧹 Cleaning Vite cache and node_modules...

:: Xoá thư mục node_modules
rmdir /s /q node_modules

:: Xoá file lock
del /f /q package-lock.json

:: Xoá cache optimize của Vite
rmdir /s /q node_modules\.vite

echo 📦 Reinstalling dependencies with npm...
npm install

echo 🚀 Starting dev server...
npm run dev

pause
