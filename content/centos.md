# CentOS

## User and Permission

```bash
groups      // show current groups
groupadd <group>    // add group
groupdel <group>    // delete group
groups <username>   // show user groups
usermod -aG <group> <username>    // append user to group
usermod -G <group> <username>       // add user to group  
```

## FirewallD

```bash
sudo yum install firewalld
sudo systemctl enable firewalld
sudo reboot
sudo firewall-cmd --state           //-> running
sudo firewall-cmd --get-default-zone     //-> public
sudo firewall-cmd --zone=public --add-port=5000/tcp
sudo firewall-cmd --zone=public --list-ports
sudo firewall-cmd --zone=public --permanent --add-port=5000/tcp
sudo firewall-cmd --zone=public --permanent --add-port=4990-4999/udp
sudo firewall-cmd --zone=public --permanent --list-ports

sudo firewall-cmd --get-services

sudo firewall-cmd --permanent --add-forward-port=port=80:proto=tcp:toport=8080  // forward 80 to 8080    
sudo firewall-cmd --permanent --remove-forward-port=port=80:proto=tcp:toport=8080   // remove forwarding

sudo firewall-cmd --reload
```

---
## Automated Tasks - Cron

1. CONNECT VIA SSH AND UPDATE THE SYSTEM SOFTWARE

    First of all, connect to your Linux VPS via SSH and update all your system software to the latest version available. You can use the following command to do that:

    ```bash
    sudo yum update
    ```


1. VERIFY IF CRONIE PACKAGE IS INSTALLED

    To automate the system tasks, or better known as jobs under Linux, you can use an utility called Cron. Using Cron you can run scripts automatically within a specified period of time, create backup of your databases or other important files, monitor the services running on your server and many other things. To use the Cron utility, you need to install the cronie package on your system. It should be already installed on your server. To confirm, issue the following command:
    ```
    sudo rpm -q cronie
    ```

1. INSTALL CRONIE PACKAGE

    If it is not installed, you can use yum to install it. Yum is a package manager which you can use to install and manage software on CentOS 7. Run the command below:
    ```
    sudo yum install cronie
    ```


1. CHECK IF  CROND SERVICE IS RUNNING

    The cron jobs are picked by the crond service. To check whether the crond service is running on your CentOS VPS, you can use the following command:
    ```
    sudo systemctl status crond.service
    ```


1. CONFIGURE CRON JOBS

    To configure cron jobs you need to modify the /etc/crontab file. Please note that it can only be modified by the root user. To check the current configuration, you can use the following command:

    ```
    sudo cat /etc/crontab
    ```
    The output should be similar to the one below:
    ```bash
    SHELL=/bin/bash
    PATH=/sbin:/bin:/usr/sbin:/usr/bin
    MAILTO=root

    # For details see man 4 crontabs

    # Example of job definition:
    # .---------------- minute (0 - 59)
    # |  .------------- hour (0 - 23)
    # |  |  .---------- day of month (1 - 31)
    # |  |  |  .------- month (1 - 12) OR jan,feb,mar,apr ...
    # |  |  |  |  .---- day of week (0 - 6) (Sunday=0 or 7) OR sun,mon,tue,wed,thu,fri,sat
    # |  |  |  |  |
    # *  *  *  *  * user-name  command to be executed
    37 * * * * root run-parts /etc/cron.hourly
    23 5 * * * root run-parts /etc/cron.daily
    19 3 * * 0 root run-parts /etc/cron.weekly
    23 0 6 * * root run-parts /etc/cron.monthly
    ```

    Specific users can create cron jobs too. The cron jobs for specific users are located in /var/spool/cron/username. When you create cron jobs for specific users you do not need to specify the username in the cron job. Therefore the syntax will be like the one below:
    ```
    minute hour day month day_of_week command
    ```

1. RESTART THE CROND SERVICE

    After you make the changes restart the crond service using the command below:
    ```
    sudo systemctl restart crond.service
    ```
    For more information you can check the man pages:
    ```
    man cron
    ```
    and
    ```
    man crontab
    ```
