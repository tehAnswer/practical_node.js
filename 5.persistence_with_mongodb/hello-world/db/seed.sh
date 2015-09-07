BASEDIR=$(dirname $0)
mongoimport --db blog --collection users --file $BASEDIR/seeds/users.json --jsonArray
mongoimport --db blog --collection articles --file $BASEDIR/seeds/articles.json --jsonArray
