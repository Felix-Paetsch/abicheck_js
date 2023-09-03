CREATE TABLE themengebiete (
    tg_id SERIAL PRIMARY KEY,
    tg_name VARCHAR(255),
    tg_introduction TEXT,
    link_blue TEXT,
    rechner TEXT
);

CREATE TABLE subgebiete (
    sub_id SERIAL PRIMARY KEY,
    sub_name VARCHAR(255),
    tg_name VARCHAR(255)
);

CREATE TABLE contents (
    content_id SERIAL PRIMARY KEY,
    article_name VARCHAR(255),
    sub_name VARCHAR(255),
    content_name VARCHAR(255),
    content_text TEXT,
    reihenfolge INTEGER
);

CREATE TABLE articles (
    article_id SERIAL PRIMARY KEY,
    article_name VARCHAR(255),
    sub_name VARCHAR(255),
    article_style TEXT,
    übungen_style TEXT,
    reihenfolge INTEGER,
    article_meta TEXT
);

CREATE TABLE exercises (
    ex_id SERIAL PRIMARY KEY,
    article_name VARCHAR(255),
    sub_name VARCHAR(255),
    ex_aufgabe TEXT,
    ex_sol TEXT,
    ex_reihenfolge INTEGER
);

/* CREATE TABLE files (
    id SERIAL PRIMARY KEY,
    article_name VARCHAR(255),
    sub_name VARCHAR(255),
    file_name VARCHAR(255),
    file_link TEXT,
    is_test BOOLEAN
);

CREATE TABLE querys (
    id SERIAL PRIMARY KEY,
    query TEXT,
    rows_affected INTEGER,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE rechner (
    rechner_id SERIAL PRIMARY KEY,
    rechner_name VARCHAR(255),
    article_name VARCHAR(255),
    import_filesJsCss_AndMeta TEXT,
    rechner_input TEXT,
    rechner_output TEXT,
    ref_link VARCHAR(255),
    JSscript TEXT,
    import_filesPHP TEXT
); */

CREATE TABLE feedback (
    fb_id SERIAL PRIMARY KEY,
    fb_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fb_article VARCHAR(255),
    fb_text TEXT,
    fb_checked BOOLEAN,
    fb_check_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE error_log (
    error_id SERIAL PRIMARY KEY,
    error_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    error_url VARCHAR(255),
    error_type VARCHAR(255)
);
