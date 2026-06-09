###Q7. Water Contamination by River Across States
SELECT State, River_Name,
       ROUND(AVG(Water_Contamination_Index), 2) AS Avg_Contamination,
       ROUND(AVG(BOD), 2) AS Avg_BOD,
       ROUND(AVG(DO), 2) AS Avg_DO
FROM pollution_data
GROUP BY State, River_Name
ORDER BY Avg_Contamination DESC;