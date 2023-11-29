#!/bin/bash

PASSWORD="tomcatDSV@11"
USERNAME="root"
HOST=""


if [ -z $1 ]
then
    echo "passe um argumento (prod ou hom)"
    echo "ex.: ./deploy prod "
    exit
fi

if [ $1 != 'prod' -a  $1 != 'hom' ]; then
    echo "passe um argumento (prod ou hom)"
    exit
fi

if [ $1 == 'prod' ]; then
    echo "Deploy Produção"
    HOST="10.1.32.30"
fi 

if [ $1 == 'hom' ]; then
    echo "Deploy Homologação"
    HOST="10.1.32.86"
fi


echo $HOST


# build
mvn package -DskipTests

PORT=$(grep 'server.port' ./src/main/resources/application.properties | cut -f2 -d"=")
FILE=$(echo target/*.jar | cut -f2 -d"/")
echo $FILE

sshpass -p $PASSWORD ssh -o StrictHostKeyChecking=no $USERNAME@$HOST iptables -I INPUT 4 -p tcp -m state --state NEW -m tcp --dport $PORT -j ACCEPT

sshpass -p $PASSWORD ssh -o StrictHostKeyChecking=no $USERNAME@$HOST rm -rf /home/admin/sis/$FILE

sshpass -p $PASSWORD ssh -o StrictHostKeyChecking=no $USERNAME@$HOST "lsof -i:$PORT -t | xargs kill -9"

sshpass -p $PASSWORD scp -o StrictHostKeyChecking=no ./target/*.jar $USERNAME@$HOST:/home/admin/sis/

sshpass -p $PASSWORD ssh -o StrictHostKeyChecking=no $USERNAME@$HOST "nohup java -jar /home/admin/sis/$FILE & exit"


exit

