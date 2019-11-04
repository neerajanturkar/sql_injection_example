create
    definer = root@localhost procedure login(IN emailid varchar(30), IN pwd varchar(100), OUT success tinyint,
                                             OUT session_id varchar(100))
BEGIN
SELECT id 
INTO @user_id
FROM user 
WHERE email = emailid and password = md5(pwd);

SELECT row_count() into @affectedRows;
IF @affectedRows = 0 THEN
	SET success = 0;
ELSE
	INSERT INTO `session`(`id`, `user_id`) 
    VALUES (UUID_TO_BIN(UUID()),@user_id);
    SELECT row_count() into @rowsAdded;
    IF @rowsAdded = 0 THEN
		SET success = 0;
        
    ELSE 
		 SELECT BIN_TO_UUID(id) 
         INTO @session_id
         FROM session
        
         WHERE user_id = @user_id
         ORDER BY  created_on DESC
         LIMIT 1;
       
        SET success = 1;
        SET session_id = @session_id;
    END IF;
END IF;

END;

