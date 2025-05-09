create memory table T_USER_REGISTRATION ( REG_ID varchar(36) not null, REG_USERNAME varchar(50) not null, REG_PASSWORD varchar(50) not null, REG_EMAIL varchar(100) not null, REG_DATE datetime not null, REG_STATUS varchar(20) not null, REG_ADMIN_COMMENT varchar(500), primary key (REG_ID) );

insert into T_USER_REGISTRATION(REG_ID, REG_USERNAME, REG_PASSWORD, REG_EMAIL, REG_DATE, REG_STATUS, REG_ADMIN_COMMENT) values('aaa', 'aaa', 'cccccccc', 'bbb@mail.com', NOW(), 'pending', 'ahahaha');
insert into T_USER_REGISTRATION(REG_ID, REG_USERNAME, REG_PASSWORD, REG_EMAIL, REG_DATE, REG_STATUS, REG_ADMIN_COMMENT) values('simon', 'Simon', 'cccccccc', '12112411@mail.sustech.edu.cn', NOW(), 'pending', 'mushroom');
insert into T_USER_REGISTRATION(REG_ID, REG_USERNAME, REG_PASSWORD, REG_EMAIL, REG_DATE, REG_STATUS, REG_ADMIN_COMMENT) values('sicheng', 'Claudia', 'cccccccc', '12110644@mail.sustech.edu.cn', NOW(), 'pending', 'potato');

-- Update the database version
update T_CONFIG set CFG_VALUE_C = '32' where CFG_ID_C = 'DB_VERSION';