Records complex knowledge about MySQL

# [MySQL](https://gist.github.com/bndynet/5ea2a03f45ec368aa0415698ff95a2bc)

---
## Installation

### Using the MySQL Yum Repository

```bash
shell> sudo yum localinstall mysql57-community-release-el7-{version-number}.noarch.rpm
shell> yum repolist enabled | grep "mysql.*-community.*"
shell> yum repolist all | grep mysql
shell> sudo yum-config-manager --disable mysql57-community
shell> sudo yum-config-manager --enable mysql56-community
shell> yum repolist enabled | grep mysql
shell> sudo yum install mysql-community-server
shell> sudo service mysqld start
shell> sudo service mysqld status
```

**Securing the MySQL Installation**

```bash
shell> mysql_secure_installation
```