
# Virtual Hosts using express

To get this sample running, you first need to do a bit of setup.

## 1. Set up the host names

### Mac / Unix

Launch /Applications/Utilities/Terminal.app/
type:
sudo emacs (or vi) /etc/hosts

Add the following entries:

127.0.0.1       app1
127.0.0.1       app2
127.0.0.1       app3

Save and exit

### Windows

notepad c:\windows\system32\drivers\etc\hosts.txt

Add the following entries:

127.0.0.1       app1
127.0.0.1       app2
127.0.0.1       app3

Save and exit.


## 2. Run the sample

    node server.js

## 3. Test it out

1. You can either use `curl` to download the page content:

    curl http://app1:8080/
    curl http://app2:8080/
    curl http://app3:8080/

1. Or you can just view the page in the browser, as _http://app1:8080_, _http://app1:8080_, _http://app1:8080_ .

