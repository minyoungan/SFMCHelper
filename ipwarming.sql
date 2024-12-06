SELECT *
FROM (SELECT
    SUBSTRING(Email, CHARINDEX('@', Email) + 1, LEN(Email) - CHARINDEX('@', Email)) AS Domain,
    _ContactKey AS ContactKey,
    Email,
    FirstName,
    LastName,
    CASE 
      WHEN SUBSTRING(Email, CHARINDEX('@', Email) + 1, LEN(Email)) IN ('gmail.com', 'googlemail.com') THEN 'Google'
      WHEN SUBSTRING(Email, CHARINDEX('@', Email) + 1, LEN(Email)) IN ('yahoo.com', 'ymail.com') THEN 'Yahoo'
      WHEN SUBSTRING(Email, CHARINDEX('@', Email) + 1, LEN(Email)) IN ('aol.com', 'aim.com') THEN 'AOL'
      WHEN SUBSTRING(Email, CHARINDEX('@', Email) + 1, LEN(Email)) IN ('hotmail.com', 'outlook.com', 'live.com') THEN 'Microsoft'
      ELSE 'Other'
    END AS SERVER_COMPANY,
    ROW_NUMBER() OVER (PARTITION BY Email ORDER BY _ContactKey) AS RowNum
  FROM Contact_Salesforce
  WHERE Email IS NOT NULL
    AND LEN(Email) > 0
    AND Email NOT IN (SELECT Email FROM [IP_Warming_Entry_DE])
    AND (
      Secondary_Email_Unsubscribed__c = 0
      OR Primary_Email_Unsubscribed__c = 0
      OR Mail_Opt_Out__c = 0
      OR HasOptedOutOfEmail = 0
    )
) AS cte
WHERE cte.RowNum = 1
