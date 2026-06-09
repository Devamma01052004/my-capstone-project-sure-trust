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