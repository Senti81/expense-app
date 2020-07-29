# Expense App

## Installing server dependencies
```sh
cd expense-app/server && npm install
```

## Installing client dependencies
```sh
cd ../client && npm install
```

## Building client project
```sh
npm run build
```

## Removing client folder
```sh
cd .. && rm -rf client
```

## Copying server folder to deployment directory
```sh
cp -rf server/* /home/pi/apps/expense-app/
```

## Cleanup folders
```sh
cd ~ && rm -rf expense-app/
```

## Starting application
```sh
pm2 start /home/pi/apps/expense-app/bin/www
```