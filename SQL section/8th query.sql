####Q8. Temp Table — Pollution vs GDP
CREATE TEMPORARY TABLE pollution_gdp AS
SELECT City, State,
       ROUND(AVG(AQI), 2) AS Avg_AQI,
       ROUND(AVG(GDP_Cr), 2) AS Avg_GDP,
       ROUND(AVG(Pollution_vs_GDP_Ratio), 2) AS Pollution_GDP_Ratio
FROM pollution_data
GROUP BY City, State
ORDER BY Avg_GDP DESC;

SELECT * FROM pollution_gdp;