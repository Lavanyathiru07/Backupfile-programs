package com.itqa.Utils.sql;

import com.itqa.Utils.URLS;
import org.apache.log4j.Logger;

import java.sql.*;

public class SQL_Executor {
    private Connection connection;
    private Logger logger = null;

    public SQL_Executor (String env, Logger log) {
        this.logger = log;
        String urlPreFix = "jdbc:db2://db2.";
        String urlPostFix = ".allegiantair.com:50001/CMSDB";
        String url;
        String user;
        String pass;

        try {
            Class.forName("com.ibm.db2.jcc.DB2Driver");
        }
        catch (ClassNotFoundException e) {
            logger.error("DB2 class not found. Stop running ");
            throw new Error(e.getMessage());
        }


        url = urlPreFix + env.toLowerCase() + urlPostFix;

        if (env.contains("intl")) {
            url = urlPreFix + URLS.INTLPREFIX + urlPostFix;
        }

        //Supply this account
        if (env.equalsIgnoreCase("STG")) {
            user = "webuser";
            pass = "resubew1";
        }
        else if (env.equalsIgnoreCase("TRN")) {
            user = "webuser";
            pass = "webpass";
        }
        else if (env.equalsIgnoreCase("IN2") || env.equalsIgnoreCase("SB1")) {
            user = "javauser";
            pass = "javapass";
        }
        else if (env.equalsIgnoreCase("QA2") || env.equalsIgnoreCase("QA1")) {
            user = "g4flight";
            pass = "a88ZBj4y";
        }
        else {
            user = "g4dev";
            pass = "L0ck1tUp";
        }

        try {
            connection = DriverManager.getConnection(url, user, pass);
        }
        catch (SQLException e) {
            logger.error("Fail to establish a connection with CMSDB");
            throw new Error(e.getMessage());
        }

        logger.info("CMSDB Connection is established");
    }

    public ResultSet getRow(String sqlString, int pos) throws SQLException {
        Statement statement = null;
        ResultSet resultSet = null;

        try {
            statement = connection.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);
            resultSet = statement.executeQuery(sqlString);
            resultSet.absolute(pos);
        }
        catch (SQLException e) {
            resultSet.close();
            statement.close();
            logger.error("Fail to execute the query");
            throw new Error(e.getMessage());
        }

        return resultSet;
    }

    public void closeConnection() {
        try {
            connection.close();
        }
        catch (SQLException e) {
            logger.error("Fail to close CMSDB connection");
            throw new Error(e.getMessage());
        }
    }
}
