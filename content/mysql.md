# MySQL

## Installation

1. `wget` rpm from http://dev.mysql.com/downloads/repo/yum/.  
1. Install release package (Example):
    ```bash
    sudo rpm -Uvh mysql80-community-release-el6-n.noarch.rpm
    ```
    
1. Select Version  
  
    ```bash
    yum repolist all | grep mysql  
    sudo yum-config-manager --disable mysql80-community  
    sudo yum-config-manager --enable mysql57-community  
    yum repolist enabled | grep mysql  
    ```
    
1. Install & Config MySQL
    ```bash
    sudo yum install mysql-community-server  
    sudo systemctl start mysqld.service  
    sudo systemctl enable mysqld.service   // as service at start  
    sudo grep 'temporary password' /var/log/mysqld.log  
    mysql -uroot -p  
    MYSQL > ALTER USER 'root'@'localhost' IDENTIFIED BY 'NewPassword!';  
    ```
    
## Remote Access

**SQL**
```bash
UPDATE user SET Host='%' WHERE User='root';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'password' WITH GRANT OPTION;
FLUSH PRIVILEGES;
```

**Firewall**

```bash
firewall-cmd --add-port=3306/tcp
firewall-cmd --permanent --add-port=3306/tcp
```

## Securing the MySQL Installation

```bash
shell> mysql_secure_installation
```

**REF**

https://dev.mysql.com/doc/mysql-yum-repo-quick-guide/en/
