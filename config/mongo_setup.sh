#!/bin/sh
mongo\
  localhost/$MONGO_INITDB_DATABASE\
  --eval "\
  db.test.insert({test: \"value\"});\
  db.createUser({\
    \"user\":'$MONGO_USER',\
    \"pwd\":'$MONGO_PASS',\
    \"roles\": [\
      {role: \"dbAdmin\", db:\"$MONGO_INITDB_DATABASE\"},\
      {role: \"readWrite\", db:\"$MONGO_INITDB_DATABASE\"},\
      {role: \"read\", db: \"admin\"}]\
  });"
