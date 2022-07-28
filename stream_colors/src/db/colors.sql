--  this to auto instance the row id
-- scheme
CREATE TABLE scheme (
    id          INTEGER       PRIMARY KEY AUTOINCREMENT,
    name        VARCHAR (50)  NOT NULL,
    description VARCHAR (100) 
);

-- color
CREATE TABLE color (
    hex  VARCHAR (10) PRIMARY KEY,
    name VARCHAR (50) 
);

-- colorscheme
CREATE TABLE colorscheme (
    hex      VARCHAR (10) REFERENCES color (hex),
    shceme   INTEGER      REFERENCES scheme (id),
    position INTEGER      NOT NULL,
    UNIQUE (
        hex,
        shceme
    )
);

--2 versiopn
-- this version just use one table
CREATE TABLE colorscheme (
    id          INTEGER       PRIMARY KEY AUTOINCREMENT,
    name        VARCHAR (50)  NOT NULL,
    description VARCHAR (100),
    colors      TEXT          NOT NULL
);


