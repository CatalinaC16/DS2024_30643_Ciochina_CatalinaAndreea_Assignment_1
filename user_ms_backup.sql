--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


create table if not exists users
(
    id          uuid         not null
        primary key,
    email       varchar(255) not null
        unique,
    first_name  varchar(255) not null,
    password    varchar(255) not null,
    role        varchar(255) not null
        constraint users_role_check
            check ((role)::text = ANY ((ARRAY ['USER'::character varying, 'ADMIN'::character varying])::text[])),
    second_name varchar(255) not null
);

alter table users
    owner to postgres;


--
-- PostgreSQL database dump complete
--

