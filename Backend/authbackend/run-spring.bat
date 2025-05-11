@echo off
SET JAVA_HOME=E:\JDK\jdk-21.0.4
SET PATH=%JAVA_HOME%\bin;%PATH%
call mvnw.cmd spring-boot:run
