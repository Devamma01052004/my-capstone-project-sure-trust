###Q9. Average AQI per Season
SELECT Season,
       ROUND(AVG(AQI), 2)        AS Avg_AQI,
       ROUND(AVG(`PM2.5`), 2)    AS Avg_PM25,
       ROUND(AVG(PM10), 2)       AS Avg_PM10,
       COUNT(*)                   AS Total_Records
FROM pollution_data
GROUP BY Season
ORDER BY Avg_AQI DESC;