# Node.js

## Install Node.js

For Debian and Ubuntu based Linux distributions:

```
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs
```

On RHEL, CentOS or Fedora:

`curl --silent --location https://rpm.nodesource.com/setup_8.x | sudo bash -`

---
## Install NVM

`curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.6/install.sh | bash`

or Wget:

`wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.6/install.sh | bash`

The script clones the nvm repository to \~/.nvm and adds the source line to your profile (\~/.bash_profile, \~/.zshrc, \~/.profile, or \~/.bashrc).
```
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # This loads nvm
```

### Commands
- nvm install [version]
- nvm use [version]
- nvm alias default [version]         // Set default node version on a shell
- nvm ls, nvm ls-remote

---
## Publish & Update a Package

`npm adduser`  if you don't have one

`npm login`    enter your name and password

`npm publish`  publish public package

`npm version [patch|minor|major]`   update version

`npm publish --access=public`   publish to npm, for old version without `--access=public`
