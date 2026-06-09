####Q5. AQI vs Population Correlation
SELECT City, State,
       ROUND(AVG(AQI), 2) AS Avg_AQI,
       ROUND(AVG(Population_Density), 2) AS Avg_Population
FROM pollution_data
GROUP BY City, State
ORDER BY Avg_Population DESC;