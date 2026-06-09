###Q2. View — Critical Zones
CREATE VIEW Critical_Zones AS
SELECT City, State,
       ROUND(AVG(AQI), 2) AS Avg_AQI,
       ROUND(AVG(Water_Contamination_Index), 2) AS Avg_Water
FROM pollution_data
WHERE AQI > 300
  AND Water_Contamination_Index > 3.0
GROUP BY City, State
ORDER BY Avg_AQI DESC;

SELECT * FROM Critical_Zones;