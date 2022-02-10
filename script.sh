#!/bin/bash
INSTALL_PATH="bin"
ALIAS="\\nalias atomize=\"node ~/.bin/atomic-majer.js\" \\n"
FILENAME="atomic-maker.js"

cd $HOME

if [ ! "$(ls -A "${INSTALL_PATH}")" ]; then
    echo "Path doesnt exists"
    mkdir "${INSTALL_PATH}"
    cd "${INSTALL_PATH}"

    if [ "$(ls -A "${FILENAME}")" ]; then
        echo "File exists. Fetching again."
    fi

fi

curl https://raw.githubusercontent.com/Irungaray/atomic-maker/main/index.js -s -o ${FILENAME}

command printf "${ALIAS}" >> "${HOME}/.zshrc"
