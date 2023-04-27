# extjs frontend for text manipulation application
requireds :<br>
Node.js® 8.11+<br>
npm 6+<br>
Java version 15 or lower<br>
I am using jdk1.8.0_131 and it works without issue<br>
<br>
after downloading the project , execute "npm install" inside the folder of the project<br>
it will take sometime to download all packages<br>
after that you can start the project by executing "npm start"<br>
if you faced an error called "Error: error:0308010C:digital envelope routines::unsupported"<br>
execute the following command <br>
"set NODE_OPTIONS=--openssl-legacy-provider"<br>
<br>
to make the project fully working , you have to start first "text-manipulation-backend"<br>
https://github.com/hussamabd379/text-manipulation-backend<br>
and then "algorithms-server"<br>
https://github.com/hussamabd379/algorithms-server<br>
both must be working on different ports<br>
