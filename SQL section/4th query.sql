####Q4. Rank States by AQI Improvement Rate
SELECT State,
       ROUND(AVG(AQI_Improvement_Rate), 4) AS Avg_Improvement,
       RANK() OVER (ORDER BY AVG(AQI_Improvement_Rate) DESC) AS Rank_No
FROM pollution_data
GROUP BY State
ORDER BY Rank_No;