####Q3. Top 5 Industries by Emissions
SELECT Industry_Sector,
       ROUND(SUM(Total_Industrial_Emission), 2) AS Total_Emission
FROM pollution_data
GROUP BY Industry_Sector
ORDER BY Total_Emission DESC
LIMIT 5;