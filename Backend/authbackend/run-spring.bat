@echo off
REM Set JAVA_HOME to your JDK 21 installation path
IF "%JAVA_HOME%"=="" SET JAVA_HOME=E:\JDK\jdk-21.0.4
SET PATH=%JAVA_HOME%\bin;%PATH%

echo Using JDK from: %JAVA_HOME%
call mvnw.cmd spring-boot:run
