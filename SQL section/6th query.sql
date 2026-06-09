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