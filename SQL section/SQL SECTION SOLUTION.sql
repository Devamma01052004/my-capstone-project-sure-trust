###Q1. Average AQI per State
SELECT State,
       ROUND(AVG(AQI), 2) AS Average_AQI
FROM pollution_data
GROUP BY State
ORDER BY Average_AQI DESC;

###Q2. View — Critical Zones
CREATE VIEW Critical_Zones1 AS
SELECT City, State,
       ROUND(AVG(AQI), 2) AS Avg_AQI,
       ROUND(AVG(Water_Contamination_Index), 2) AS Avg_Water
FROM pollution_data
WHERE AQI > 300
  AND Water_Contamination_Index > 3.0
GROUP BY City, State
ORDER BY Avg_AQI DESC;

SELECT * FROM Critical_Zones;

####Q3. Top 5 Industries by Emissions
SELECT Industry_Sector,
       ROUND(SUM(Total_Industrial_Emission), 2) AS Total_Emission
FROM pollution_data
GROUP BY Industry_Sector
ORDER BY Total_Emission DESC
LIMIT 5;

####Q4. Rank States by AQI Improvement Rate
SELECT State,
       ROUND(AVG(AQI_Improvement_Rate), 4) AS Avg_Improvement,
       RANK() OVER (ORDER BY AVG(AQI_Improvement_Rate) DESC) AS Rank_No
FROM pollution_data
GROUP BY State
ORDER BY Rank_No;

####Q5. AQI vs Population Correlation
SELECT City, State,
       ROUND(AVG(AQI), 2) AS Avg_AQI,
       ROUND(AVG(Population_Density), 2) AS Avg_Population
FROM pollution_data
GROUP BY City, State
ORDER BY Avg_Population DESC;

###Q6. Stored Procedure
DELIMITER $$
CREATE PROCEDURE GetPollutionByYear(
    IN start_yr INT,
    IN end_yr INT
)
BEGIN
    SELECT Year, City,
           ROUND(AVG(AQI), 2) AS Avg_AQI,
           ROUND(AVG(Water_Contamination_Index), 2) AS Avg_Water
    FROM pollution_data
    WHERE Year BETWEEN start_yr AND end_yr
    GROUP BY Year, City
    ORDER BY Year;
END $$
DELIMITER ;

-- Call it like this:
CALL GetPollutionByYear(2015, 2020);

###Q7. Water Contamination by River Across States
SELECT State, River_Name,
       ROUND(AVG(Water_Contamination_Index), 2) AS Avg_Contamination,
       ROUND(AVG(BOD), 2) AS Avg_BOD,
       ROUND(AVG(DO), 2) AS Avg_DO
FROM pollution_data
GROUP BY State, River_Name
ORDER BY Avg_Contamination DESC;

####Q8. Temp Table — Pollution vs GDP
CREATE TEMPORARY TABLE pollution_gdp AS
SELECT City, State,
       ROUND(AVG(AQI), 2) AS Avg_AQI,
       ROUND(AVG(GDP_Cr), 2) AS Avg_GDP,
       ROUND(AVG(Pollution_vs_GDP_Ratio), 2) AS Pollution_GDP_Ratio
FROM pollution_data
GROUP BY City, State
ORDER BY Avg_GDP DESC;

###Q9. Average AQI per Season
SELECT Season,
       ROUND(AVG(AQI), 2)        AS Avg_AQI,
       ROUND(AVG(`PM2.5`), 2)    AS Avg_PM25,
       ROUND(AVG(PM10), 2)       AS Avg_PM10,
       COUNT(*)                   AS Total_Records
FROM pollution_data
GROUP BY Season
ORDER BY Avg_AQI DESC;

####Q10. Export Results to CSV for Python
SELECT 
    Year, 
    City, 
    State, 
    Season,
    River_Name,
    Industry_Sector,
    ROUND(AVG(AQI), 2)                        AS Avg_AQI,
    ROUND(AVG(Water_Contamination_Index), 2)  AS Avg_Water,
    ROUND(AVG(Total_Industrial_Emission), 2)  AS Avg_Emission,
    ROUND(AVG(Vehicular_Emission), 2)         AS Avg_Vehicles,
    ROUND(AVG(GDP_Cr), 2)                     AS Avg_GDP,
    ROUND(AVG(Population_Density), 2)         AS Avg_Population
FROM pollution_data
GROUP BY 
    Year, City, State, Season,
    River_Name, Industry_Sector
ORDER BY Year;
-- In MySQL Workbench:
-- Run query → Click Export button → Save as pollution_sql_output.csv